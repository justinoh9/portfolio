// Airline reservation demo: the project's real schema in SQLite (WebAssembly).
// All state lives in memory, so a reload or "Reset data" starts over.
(() => {
  const CUSTOMER = { email: "ava.chen@example.com", name: "Ava Chen" };
  const STAFF = { username: "dreyes", name: "Dana Reyes", airline: "Northline Air" };
  const AIRLINE_NAMES = { "Northline Air": "NL", "Harbor Air": "HB" };

  let SQL, db, schemaText;
  let logSeq = 0;
  const state = { role: "customer", tab: "search", search: { from: "JFK", to: "LAX", date: "" }, openFlight: null };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[c]);

  /* ---------- Database access: every statement goes through here and is logged ---------- */

  function tidy(sql) {
    const lines = sql.replace(/^\n+|\s+$/g, "").split("\n");
    const pad = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
    return lines.map((l) => l.slice(pad)).join("\n");
  }

  function highlight(sql) {
    return esc(sql).replace(
      /\b(SELECT|FROM|WHERE|JOIN|LEFT|ON|AND|OR|GROUP BY|ORDER BY|INSERT INTO|VALUES|UPDATE|SET|DELETE|AS|COALESCE|MAX|COUNT|AVG|DISTINCT|BEGIN|COMMIT|ROLLBACK|DESC|ASC|LIMIT|NULL)\b/g,
      '<span class="kw">$1</span>'
    );
  }

  function addLog(label, sql, params, info) {
    const li = document.createElement("li");
    li.className = "fresh";
    li.innerHTML = `
      <div class="log-head"><span>${esc(label)}</span><span class="log-stat">${esc(info.stat || "")}</span></div>
      <pre class="sql">${highlight(tidy(sql))}</pre>
      ${params && params.length ? `<div class="log-params">params: ${esc(JSON.stringify(params))}</div>` : ""}
      ${info.error ? `<div class="log-err">${esc(info.error)}</div>` : ""}`;
    const log = $("log");
    log.prepend(li);
    while (log.children.length > 60) log.lastChild.remove();
    logSeq += 1;
  }

  // label + SQL + bound parameters. Returns rows as plain objects.
  function query(label, sql, params = []) {
    const t0 = performance.now();
    const stmt = db.prepare(sql);
    try {
      stmt.bind(params);
      const rows = [];
      while (stmt.step()) rows.push(stmt.getAsObject());
      const ms = (performance.now() - t0).toFixed(1);
      const stat = /^\s*select/i.test(sql) ? `${rows.length} row${rows.length === 1 ? "" : "s"} · ${ms} ms` : `${db.getRowsModified()} changed · ${ms} ms`;
      addLog(label, sql, params, { stat });
      return rows;
    } catch (e) {
      addLog(label, sql, params, { stat: "failed", error: e.message });
      throw e;
    } finally {
      stmt.free();
    }
  }

  /* ---------- Fictional seed data, dated relative to today ---------- */

  const pad = (n) => String(n).padStart(2, "0");
  function dayStr(offset) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }
  const at = (offset, time) => `${dayStr(offset)} ${time}:00`;
  const NOW = "datetime('now','localtime')";

  function seed() {
    db.exec(schemaText);
    db.exec("PRAGMA foreign_keys = ON;");
    const run = (sql, rows) => {
      const s = db.prepare(sql);
      rows.forEach((r) => s.run(r));
      s.free();
    };
    run("INSERT INTO Airline VALUES (?)", [["Northline Air"], ["Harbor Air"]]);
    run("INSERT INTO Airport VALUES (?,?,?,?)", [
      ["JFK", "New York City", "USA", "both"],
      ["LAX", "Los Angeles", "USA", "both"],
      ["SFO", "San Francisco", "USA", "both"],
      ["PVG", "Shanghai", "China", "international"]
    ]);
    const person = (email, name, n) => [email, name, "demo-not-used", "1", "Example St", "Brooklyn", "NY", "555-0100", `X000000${n}`, "2031-01-01", "USA", "2000-01-01"];
    run("INSERT INTO Customer VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", [
      person(CUSTOMER.email, CUSTOMER.name, 1),
      person("marcus.lee@example.com", "Marcus Lee", 2),
      person("priya.nair@example.com", "Priya Nair", 3),
      person("leo.garcia@example.com", "Leo Garcia", 4),
      person("sam.okafor@example.com", "Sam Okafor", 5)
    ]);
    run("INSERT INTO Airline_Staff VALUES (?,?,?,?,?,?,?)", [
      [STAFF.username, "demo-not-used", "Dana", "Reyes", "1990-01-01", "dana@example.com", STAFF.airline]
    ]);
    run("INSERT INTO Staff_Phone VALUES (?,?)", [[STAFF.username, "555-0101"], [STAFF.username, "555-0102"]]);
    run("INSERT INTO Airplane VALUES (?,?,?,?,?)", [
      ["Northline Air", 101, 180, "Airbus", "2018-06-01"],
      ["Northline Air", 102, 220, "Boeing", "2019-09-15"],
      ["Northline Air", 103, 4, "Cirrus", "2021-03-10"],
      ["Harbor Air", 201, 150, "Airbus", "2020-12-20"]
    ]);
    const NL = "Northline Air", HB = "Harbor Air";
    const flights = [
      [NL, "NL101", at(3, "08:00"), at(3, "11:25"), 289, "on-time", "JFK", "LAX", 101],
      [NL, "NL102", at(3, "17:30"), at(3, "20:55"), 319, "delayed", "JFK", "LAX", 102],
      [HB, "HB210", at(3, "12:15"), at(3, "15:40"), 264, "on-time", "JFK", "LAX", 201],
      [NL, "NL101", at(6, "08:00"), at(6, "11:25"), 245, "on-time", "JFK", "LAX", 101],
      [NL, "NL103", at(7, "09:10"), at(7, "17:35"), 305, "on-time", "LAX", "JFK", 102],
      [NL, "NL220", at(5, "12:40"), at(6, "16:30"), 850, "on-time", "JFK", "PVG", 101],
      [NL, "NL301", at(4, "07:15"), at(4, "10:50"), 210, "on-time", "JFK", "SFO", 103],
      [NL, "NL302", at(4, "19:00"), at(4, "22:30"), 245, "on-time", "JFK", "SFO", 102],
      [NL, "NL090", at(-20, "07:00"), at(-19, "11:00"), 780, "delayed", "JFK", "PVG", 101],
      [NL, "NL095", at(-9, "15:20"), at(-9, "23:40"), 275, "on-time", "LAX", "JFK", 102]
    ];
    run("INSERT INTO Flight VALUES (?,?,?,?,?,?,?,?,?)", flights);
    let id = 0;
    const ticket = (email, name, airline, num, dep) => {
      id += 1;
      return [id, "credit", "4111111111111111", name, "2030-01-31", dayStr(-30), "10:15:00", email, airline, num, dep];
    };
    const sf = at(4, "07:15");
    run("INSERT INTO Ticket VALUES (?,?,?,?,?,?,?,?,?,?,?)", [
      ticket(CUSTOMER.email, CUSTOMER.name, NL, "NL220", at(5, "12:40")),
      ticket(CUSTOMER.email, CUSTOMER.name, NL, "NL090", at(-20, "07:00")),
      ticket(CUSTOMER.email, CUSTOMER.name, NL, "NL095", at(-9, "15:20")),
      ticket("marcus.lee@example.com", "Marcus Lee", NL, "NL095", at(-9, "15:20")),
      ticket("priya.nair@example.com", "Priya Nair", NL, "NL090", at(-20, "07:00")),
      ticket("marcus.lee@example.com", "Marcus Lee", NL, "NL101", at(3, "08:00")),
      ticket("sam.okafor@example.com", "Sam Okafor", NL, "NL301", sf),
      ticket("marcus.lee@example.com", "Marcus Lee", NL, "NL301", sf),
      ticket("priya.nair@example.com", "Priya Nair", NL, "NL301", sf),
      ticket("leo.garcia@example.com", "Leo Garcia", NL, "NL301", sf)
    ]);
    run("INSERT INTO Rates VALUES (?,?,?,?,?,?)", [
      [CUSTOMER.email, NL, "NL090", at(-20, "07:00"), 4, "Good flight, but it left late."],
      ["priya.nair@example.com", NL, "NL090", at(-20, "07:00"), 5, "Friendly crew."],
      ["marcus.lee@example.com", NL, "NL095", at(-9, "15:20"), 3, "Fine. Not much legroom."]
    ]);
  }

  /* ---------- Formatting and small UI helpers ---------- */

  function fmtWhen(s) {
    const d = new Date(s.replace(" ", "T"));
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" }) + ", " +
      d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }
  const fmtTime = (s) => new Date(s.replace(" ", "T")).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  function duration(a, b) {
    const mins = Math.round((new Date(b.replace(" ", "T")) - new Date(a.replace(" ", "T"))) / 60000);
    return `${Math.floor(mins / 60)}h ${pad(mins % 60)}m`;
  }
  const money = (n) => `$${Number(n).toFixed(0)}`;

  let toastTimer;
  function toast(msg, isErr) {
    document.querySelector(".toast")?.remove();
    const el = document.createElement("div");
    el.className = `toast${isErr ? " err" : ""}`;
    el.setAttribute("role", "status");
    el.textContent = msg;
    document.body.append(el);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.remove(), 4200);
  }

  const flightKey = (f) => [f.airline_name, f.flight_number, f.departure_datetime].join("|");
  const keyParams = (key) => key.split("|");

  function airports() {
    return query("Load airports", "SELECT code, city FROM Airport ORDER BY city");
  }

  /* ---------- Customer: search + booking ---------- */

  function renderSearch() {
    const list = airports();
    const opts = (sel) => list.map((a) => `<option value="${a.code}"${a.code === sel ? " selected" : ""}>${esc(a.city)} (${a.code})</option>`).join("");
    const { from, to, date } = state.search;
    const flights = query("Search future flights, with seats left", `
      SELECT f.*, a.num_seats, COUNT(t.ticket_id) AS sold
      FROM Flight f
      JOIN Airplane a ON f.airline_name = a.airline_name AND f.airplane_id = a.airplane_id
      LEFT JOIN Ticket t ON f.airline_name = t.airline_name
        AND f.flight_number = t.flight_number
        AND f.departure_datetime = t.departure_datetime
      WHERE f.departure_airport = ? AND f.arrival_airport = ?
        AND (? = '' OR date(f.departure_datetime) = ?)
        AND f.departure_datetime > ${NOW}
      GROUP BY f.airline_name, f.flight_number, f.departure_datetime
      ORDER BY f.departure_datetime`, [from, to, date, date]);

    const cards = flights.map((f) => {
      const left = f.num_seats - f.sold;
      const seats = left <= 0 ? '<span class="seats low">Sold out</span>'
        : left <= 10 ? `<span class="seats low">${left} seat${left === 1 ? "" : "s"} left</span>`
        : `<span class="seats">${left} seats left</span>`;
      return `
        <article class="panel flight">
          <div>
            <div class="route"><span class="code">${esc(f.departure_airport)}</span><span class="route-line"></span><span class="code">${esc(f.arrival_airport)}</span></div>
            <p class="flight-meta">${esc(fmtWhen(f.departure_datetime))} → ${esc(fmtTime(f.arrival_datetime))} · ${duration(f.departure_datetime, f.arrival_datetime)}</p>
            <p class="flight-meta">${esc(f.airline_name)} ${esc(f.flight_number)} <span class="pill ${esc(f.status)}">${esc(f.status)}</span></p>
          </div>
          <div class="flight-buy">
            <span class="price">${money(f.base_price)}</span>
            ${seats}
            <button type="button" class="btn small primary" data-book="${esc(flightKey(f))}" ${left <= 0 ? "disabled" : ""}>${left <= 0 ? "Full" : "Book"}</button>
          </div>
        </article>`;
    }).join("");

    return `
      <h1 class="section-title">Find a flight</h1>
      <p class="section-sub">Try New York to San Francisco to see a sold-out flight.</p>
      <form class="panel search-form" id="searchForm">
        <label class="field"><span>From</span><select name="from">${opts(from)}</select></label>
        <label class="field"><span>To</span><select name="to">${opts(to)}</select></label>
        <label class="field date"><span>Date (optional)</span><input type="date" name="date" value="${esc(date)}" min="${dayStr(0)}"></label>
        <button class="btn primary" type="submit">Search</button>
      </form>
      <div class="flights">${cards || '<p class="panel empty">No upcoming flights on this route. Try another date or route.</p>'}</div>`;
  }

  function openBooking(key) {
    const [airline, num, dep] = keyParams(key);
    const f = query("Load flight for checkout", `
      SELECT * FROM Flight
      WHERE airline_name = ? AND flight_number = ? AND departure_datetime = ?`, [airline, num, dep])[0];
    const dlg = document.createElement("dialog");
    dlg.innerHTML = `
      <div class="panel-bar"><span>Checkout</span><button type="button" class="link-btn" data-close>Cancel</button></div>
      <form class="dialog-body" method="dialog" id="bookForm">
        <div>
          <div class="route"><span class="code">${esc(f.departure_airport)}</span><span class="route-line"></span><span class="code">${esc(f.arrival_airport)}</span></div>
          <p class="flight-meta">${esc(f.airline_name)} ${esc(f.flight_number)} · ${esc(fmtWhen(f.departure_datetime))}</p>
        </div>
        <label class="field"><span>Payment type</span>
          <select name="card_type"><option value="credit">Credit</option><option value="debit">Debit</option></select>
        </label>
        <p class="test-card">Demo checkout: no card details are collected. Booking stores a test card number for ${esc(CUSTOMER.name)}.</p>
        <div class="dialog-actions">
          <span class="price" style="margin-right:auto;align-self:center">${money(f.base_price)}</span>
          <button class="btn primary" type="submit">Confirm booking</button>
        </div>
      </form>`;
    document.body.append(dlg);
    dlg.addEventListener("close", () => dlg.remove());
    dlg.querySelector("[data-close]").addEventListener("click", () => dlg.close());
    dlg.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = purchase(key, new FormData(e.target).get("card_type"));
      dlg.close();
      if (ok) {
        state.tab = "trips";
        render();
      } else {
        render();
      }
    });
    dlg.showModal();
  }

  // Same steps as customer_purchase.php, wrapped in a transaction.
  function purchase(key, cardType) {
    const [airline, num, dep] = keyParams(key);
    try {
      query("Begin transaction", "BEGIN");
      const seat = query("Check seats before selling", `
        SELECT a.num_seats, COUNT(t.ticket_id) AS sold
        FROM Flight f
        JOIN Airplane a ON f.airline_name = a.airline_name AND f.airplane_id = a.airplane_id
        LEFT JOIN Ticket t ON f.airline_name = t.airline_name
          AND f.flight_number = t.flight_number
          AND f.departure_datetime = t.departure_datetime
        WHERE f.airline_name = ? AND f.flight_number = ? AND f.departure_datetime = ?
        GROUP BY a.num_seats`, [airline, num, dep])[0];
      if (!seat || seat.sold >= seat.num_seats) {
        query("Roll back: flight is full", "ROLLBACK");
        toast("No seats available for this flight.", true);
        return false;
      }
      const next = query("Next ticket id", "SELECT COALESCE(MAX(ticket_id), 0) + 1 AS next_id FROM Ticket")[0].next_id;
      query("Insert the ticket", `
        INSERT INTO Ticket VALUES (?, ?, ?, ?, ?, date('now','localtime'), time('now','localtime'), ?, ?, ?, ?)`,
        [next, cardType, "4111111111111111", CUSTOMER.name, "2030-01-31", CUSTOMER.email, airline, num, dep]);
      query("Commit", "COMMIT");
      toast(`You’re booked on ${num}. Ticket #${next}.`);
      return true;
    } catch (e) {
      try { db.exec("ROLLBACK"); } catch (_) { /* already rolled back */ }
      toast(`Purchase failed: ${e.message}`, true);
      return false;
    }
  }

  /* ---------- Customer: trips + ratings ---------- */

  function passCard(f, extra = "") {
    return `
      <article class="pass">
        <div class="pass-main">
          <div class="route"><span class="code">${esc(f.departure_airport)}</span><span class="route-line"></span><span class="code">${esc(f.arrival_airport)}</span></div>
          <dl class="pass-grid">
            <div><dt>Passenger</dt><dd>${esc(CUSTOMER.name)}</dd></div>
            <div><dt>Flight</dt><dd>${esc(f.flight_number)}</dd></div>
            <div><dt>Departs</dt><dd>${esc(fmtWhen(f.departure_datetime))}</dd></div>
            <div><dt>Status</dt><dd><span class="pill ${esc(f.status)}">${esc(f.status)}</span></dd></div>
          </dl>
          ${extra}
        </div>
        <div class="pass-stub">
          <div><span class="mono muted">Ticket</span><div style="font-weight:600">#${esc(f.ticket_id)}</div></div>
          <div class="barcode" aria-hidden="true"></div>
        </div>
      </article>`;
  }

  function renderTrips() {
    const sel = `
      SELECT f.*, t.ticket_id, r.rating, r.comment
      FROM Ticket t
      JOIN Flight f ON t.airline_name = f.airline_name
        AND t.flight_number = f.flight_number
        AND t.departure_datetime = f.departure_datetime
      LEFT JOIN Rates r ON r.customer_email = t.customer_email
        AND r.airline_name = f.airline_name
        AND r.flight_number = f.flight_number
        AND r.departure_datetime = f.departure_datetime
      WHERE t.customer_email = ?`;
    const future = query("My upcoming flights", `${sel}
        AND f.departure_datetime > ${NOW}
      ORDER BY f.departure_datetime`, [CUSTOMER.email]);
    const past = query("My past flights", `${sel}
        AND f.departure_datetime < ${NOW}
      ORDER BY f.departure_datetime DESC`, [CUSTOMER.email]);

    const pastCards = past.map((f) => {
      const key = esc(flightKey(f));
      const extra = f.rating != null
        ? `<p style="margin-top:.5rem"><span class="star-static" aria-label="${f.rating} out of 5">${"★".repeat(f.rating)}${"☆".repeat(5 - f.rating)}</span> ${esc(f.comment)}</p>`
        : `<form class="rate-box" data-rate="${key}">
             <div class="stars" role="group" aria-label="Rating">${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-star="${n}" aria-label="${n} star${n > 1 ? "s" : ""}">★</button>`).join("")}</div>
             <textarea name="comment" rows="2" maxlength="255" placeholder="How was the flight?" aria-label="Comment"></textarea>
             <div><button class="btn small" type="submit">Submit rating</button></div>
           </form>`;
      return passCard(f, extra);
    }).join("");

    return `
      <h1 class="section-title">My trips</h1>
      <p class="section-sub">Your booked flights. You can rate a past flight once.</p>
      <div class="stack">${future.map((f) => passCard(f)).join("") || '<p class="panel empty">No upcoming trips yet.</p>'}</div>
      <h2 class="sub-head">Past flights</h2>
      <div class="stack">${pastCards || '<p class="panel empty">No past flights.</p>'}</div>`;
  }

  function submitRating(form) {
    const rating = Number(form.dataset.stars || 0);
    if (!rating) return toast("Pick a star rating first.", true);
    const [airline, num, dep] = keyParams(form.dataset.rate);
    try {
      query("Save the rating", "INSERT INTO Rates VALUES (?, ?, ?, ?, ?, ?)",
        [CUSTOMER.email, airline, num, dep, rating, form.elements.comment.value.trim() || null]);
      toast("Thanks. Rating saved.");
    } catch (e) {
      toast(`Couldn’t save: ${e.message}`, true);
    }
    render();
  }

  /* ---------- Staff ---------- */

  function renderStaffFlights() {
    const flights = query(`Flights for ${STAFF.airline}, with sales and ratings`, `
      SELECT f.*, a.num_seats,
        (SELECT COUNT(*) FROM Ticket t
          WHERE t.airline_name = f.airline_name AND t.flight_number = f.flight_number
            AND t.departure_datetime = f.departure_datetime) AS sold,
        (SELECT AVG(r.rating) FROM Rates r
          WHERE r.airline_name = f.airline_name AND r.flight_number = f.flight_number
            AND r.departure_datetime = f.departure_datetime) AS avg_rating
      FROM Flight f
      JOIN Airplane a ON f.airline_name = a.airline_name AND f.airplane_id = a.airplane_id
      WHERE f.airline_name = ?
      ORDER BY f.departure_datetime DESC`, [STAFF.airline]);

    let passengers = [];
    if (state.openFlight) {
      passengers = query("Passengers on this flight", `
        SELECT c.name, c.email FROM Ticket t
        JOIN Customer c ON t.customer_email = c.email
        WHERE t.airline_name = ? AND t.flight_number = ? AND t.departure_datetime = ?
        ORDER BY c.name`, keyParams(state.openFlight));
    }

    const rows = flights.map((f) => {
      const key = flightKey(f);
      const open = state.openFlight === key;
      return `
        <tr>
          <td><strong>${esc(f.flight_number)}</strong><br><span class="muted">${esc(f.departure_airport)} → ${esc(f.arrival_airport)}</span></td>
          <td>${esc(fmtWhen(f.departure_datetime))}</td>
          <td><span class="pill ${esc(f.status)}">${esc(f.status)}</span></td>
          <td>${f.sold} / ${f.num_seats}</td>
          <td>${f.avg_rating == null ? '<span class="muted">none</span>' : `${Number(f.avg_rating).toFixed(1)} ★`}</td>
          <td><div class="row-actions">
            <button type="button" class="btn small" data-status="${esc(key)}" data-next="${f.status === "on-time" ? "delayed" : "on-time"}">Mark ${f.status === "on-time" ? "delayed" : "on-time"}</button>
            <button type="button" class="btn small" data-pax="${esc(key)}">${open ? "Hide" : "Passengers"}</button>
          </div></td>
        </tr>
        ${open ? `<tr class="detail"><td colspan="6">${passengers.length ? passengers.map((p) => `${esc(p.name)} <span class="muted">${esc(p.email)}</span>`).join("<br>") : '<span class="muted">No tickets sold yet.</span>'}</td></tr>` : ""}`;
    }).join("");

    return `
      <h1 class="section-title">${esc(STAFF.airline)} flights</h1>
      <p class="section-sub">Staff only see their own airline. Changes show up immediately on the customer side.</p>
      <div class="panel table-wrap"><table>
        <thead><tr><th>Flight</th><th>Departs</th><th>Status</th><th>Sold</th><th>Rating</th><th>Actions</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>`;
  }

  function renderCreateFlight() {
    const list = airports();
    const planes = query("Load this airline’s airplanes", "SELECT airplane_id, num_seats, manufacturing_company FROM Airplane WHERE airline_name = ? ORDER BY airplane_id", [STAFF.airline]);
    const ap = (sel) => list.map((a) => `<option value="${a.code}"${a.code === sel ? " selected" : ""}>${esc(a.city)} (${a.code})</option>`).join("");
    const local = (o, t) => `${dayStr(o)}T${t}`;
    return `
      <h1 class="section-title">Create a flight</h1>
      <p class="section-sub">Try creating the same flight twice. The primary key won’t allow it.</p>
      <form class="panel form-grid" id="flightForm">
        <label class="field"><span>Flight number</span><input name="flight_number" required maxlength="10" value="NL500"></label>
        <label class="field"><span>Airplane</span><select name="airplane_id">${planes.map((p) => `<option value="${p.airplane_id}">#${p.airplane_id}, ${esc(p.manufacturing_company)}, ${p.num_seats} seats</option>`).join("")}</select></label>
        <label class="field"><span>From</span><select name="departure_airport">${ap("JFK")}</select></label>
        <label class="field"><span>To</span><select name="arrival_airport">${ap("LAX")}</select></label>
        <label class="field"><span>Departs</span><input type="datetime-local" name="dep" required value="${local(10, "09:00")}"></label>
        <label class="field"><span>Arrives</span><input type="datetime-local" name="arr" required value="${local(10, "12:30")}"></label>
        <label class="field"><span>Base price (USD)</span><input type="number" name="base_price" required min="1" step="1" value="279"></label>
        <label class="field"><span>Status</span><select name="status"><option>on-time</option><option>delayed</option></select></label>
        <div class="full"><button class="btn primary" type="submit">Create flight</button></div>
      </form>
      <h2 class="sub-head">Add an airplane</h2>
      <form class="panel form-grid" id="planeForm">
        <label class="field"><span>Airplane ID</span><input type="number" name="airplane_id" required min="1" value="104"></label>
        <label class="field"><span>Seats</span><input type="number" name="num_seats" required min="1" value="160"></label>
        <label class="field"><span>Manufacturer</span><input name="maker" required maxlength="50" value="Airbus"></label>
        <label class="field"><span>Built</span><input type="date" name="built" required value="2022-05-01"></label>
        <div class="full"><button class="btn" type="submit">Add airplane</button></div>
      </form>`;
  }

  function createFlight(form) {
    const d = Object.fromEntries(new FormData(form));
    const toDb = (v) => `${v.replace("T", " ")}:00`;
    if (d.departure_airport === d.arrival_airport) return toast("Departure and arrival airports must differ.", true);
    if (d.arr <= d.dep) return toast("Arrival must be after departure.", true);
    try {
      query("Create the flight", "INSERT INTO Flight VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        STAFF.airline, d.flight_number.trim().toUpperCase(), toDb(d.dep), toDb(d.arr), Number(d.base_price),
        d.status, d.departure_airport, d.arrival_airport, Number(d.airplane_id)
      ]);
      toast(`Created ${d.flight_number.trim().toUpperCase()}. It’s now searchable by customers.`);
    } catch (e) {
      toast(/UNIQUE/.test(e.message) ? "That flight already exists: same airline, number and departure." : e.message, true);
    }
  }

  function addPlane(form) {
    const d = Object.fromEntries(new FormData(form));
    try {
      query("Add the airplane", "INSERT INTO Airplane VALUES (?, ?, ?, ?, ?)",
        [STAFF.airline, Number(d.airplane_id), Number(d.num_seats), d.maker.trim(), d.built]);
      toast(`Added airplane #${d.airplane_id}.`);
      render();
    } catch (e) {
      toast(/UNIQUE/.test(e.message) ? `Airplane #${d.airplane_id} already exists for this airline.` : e.message, true);
    }
  }

  /* ---------- Render loop ---------- */

  const TABS = {
    customer: [["search", "Search flights", renderSearch], ["trips", "My trips", renderTrips]],
    staff: [["flights", "Flights", renderStaffFlights], ["create", "Add flights + airplanes", renderCreateFlight]]
  };

  function render() {
    document.querySelectorAll(".role").forEach((b) => {
      const on = b.dataset.role === state.role;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", on);
    });
    const tabs = TABS[state.role];
    if (!tabs.some((t) => t[0] === state.tab)) state.tab = tabs[0][0];
    $("tabs").innerHTML = tabs.map(([id, label]) => `<button type="button" data-view="${id}" class="${id === state.tab ? "on" : ""}">${esc(label)}</button>`).join("");
    $("view").innerHTML = tabs.find((t) => t[0] === state.tab)[2]();
  }

  function bindEvents() {
    document.querySelector(".role-switch").addEventListener("click", (e) => {
      const b = e.target.closest(".role");
      if (b) { state.role = b.dataset.role; render(); }
    });
    $("tabs").addEventListener("click", (e) => {
      const b = e.target.closest("[data-view]");
      if (b) { state.tab = b.dataset.view; render(); }
    });
    $("view").addEventListener("click", (e) => {
      const t = e.target;
      const book = t.closest("[data-book]");
      if (book) return openBooking(book.dataset.book);
      const star = t.closest("[data-star]");
      if (star) {
        const form = star.closest("form");
        form.dataset.stars = star.dataset.star;
        form.querySelectorAll("[data-star]").forEach((s) => s.classList.toggle("lit", Number(s.dataset.star) <= Number(star.dataset.star)));
        return;
      }
      const status = t.closest("[data-status]");
      if (status) {
        const [a, n, d] = keyParams(status.dataset.status);
        query("Update flight status", `
          UPDATE Flight SET status = ?
          WHERE airline_name = ? AND flight_number = ? AND departure_datetime = ?`, [status.dataset.next, a, n, d]);
        toast(`${n} is now ${status.dataset.next}.`);
        return render();
      }
      const pax = t.closest("[data-pax]");
      if (pax) {
        state.openFlight = state.openFlight === pax.dataset.pax ? null : pax.dataset.pax;
        render();
      }
    });
    $("view").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = e.target;
      if (f.id === "searchForm") {
        const d = Object.fromEntries(new FormData(f));
        state.search = { from: d.from, to: d.to, date: d.date };
        render();
      } else if (f.dataset.rate) {
        submitRating(f);
      } else if (f.id === "flightForm") {
        createFlight(f);
      } else if (f.id === "planeForm") {
        addPlane(f);
      }
    });

    $("consoleTabs").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      $("consoleTabs").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      ["log", "sql", "er"].forEach((id) => { $(`pane-${id}`).hidden = id !== b.dataset.tab; });
    });
    $("resetBtn").addEventListener("click", () => {
      resetDb();
      toast("Data reset.");
    });

    // Presets adapted from the project's queries.sql.
    const presets = [
      ["Future flights", `SELECT flight_number, departure_airport, arrival_airport, departure_datetime\nFROM Flight\nWHERE departure_datetime > ${NOW};`],
      ["Delayed flights", "SELECT flight_number, departure_datetime, status\nFROM Flight\nWHERE status = 'delayed';"],
      ["Who bought tickets", "SELECT DISTINCT c.name\nFROM Customer c\nJOIN Ticket t ON c.email = t.customer_email;"],
      ["Revenue by flight", "SELECT f.flight_number, COUNT(t.ticket_id) AS tickets,\n       COUNT(t.ticket_id) * f.base_price AS revenue\nFROM Flight f\nJOIN Ticket t ON f.airline_name = t.airline_name\n  AND f.flight_number = t.flight_number\n  AND f.departure_datetime = t.departure_datetime\nGROUP BY f.airline_name, f.flight_number, f.departure_datetime\nORDER BY revenue DESC;"]
    ];
    $("presets").innerHTML = presets.map((p, i) => `<button type="button" class="btn small" data-preset="${i}">${esc(p[0])}</button>`).join("");
    $("sqlInput").value = presets[2][1];
    $("presets").addEventListener("click", (e) => {
      const b = e.target.closest("[data-preset]");
      if (!b) return;
      $("sqlInput").value = presets[Number(b.dataset.preset)][1];
      runUserSql();
    });
    $("sqlRun").addEventListener("click", runUserSql);
  }

  function runUserSql() {
    const out = $("sqlOut");
    try {
      const results = db.exec($("sqlInput").value);
      if (!results.length) {
        out.innerHTML = `<p class="muted">Done. ${db.getRowsModified()} row(s) changed.</p>`;
      } else {
        const r = results[results.length - 1];
        out.innerHTML = `<div class="table-wrap"><table>
          <thead><tr>${r.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead>
          <tbody>${r.values.map((row) => `<tr>${row.map((v) => `<td>${esc(v)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table></div><p class="muted" style="margin-top:.35rem">${r.values.length} row(s)</p>`;
      }
      render();
    } catch (e) {
      out.innerHTML = `<p class="log-err">${esc(e.message)}</p>`;
    }
  }

  function resetDb() {
    if (db) db.close();
    db = new SQL.Database();
    seed();
    $("log").innerHTML = "";
    $("sqlOut").innerHTML = "";
    state.openFlight = null;
    state.search = { from: "JFK", to: "LAX", date: "" };
    render();
  }

  async function boot() {
    try {
      const [sqlLib, schema] = await Promise.all([
        initSqlJs({ locateFile: (f) => `vendor/${f}` }),
        fetch("schema.sql").then((r) => {
          if (!r.ok) throw new Error(`schema.sql: ${r.status}`);
          return r.text();
        })
      ]);
      SQL = sqlLib;
      schemaText = schema;
      bindEvents();
      resetDb();
    } catch (e) {
      $("view").innerHTML = `<p class="panel empty">The database couldn’t start in this browser (${esc(e.message)}). The <a href="https://github.com/justinoh9/Airplane-Ticket-Reservation-System">source code</a> is still available.</p>`;
    }
  }
  boot();
})();
