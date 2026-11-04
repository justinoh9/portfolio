// Renders every page from content.js. No framework, no build step.
(() => {
  const c = siteContent;
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
  const external = (url) => (/^https?:/.test(url) ? ' target="_blank" rel="noreferrer"' : "");

  function observeReveals() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -6% 0px" });
    items.forEach((el) => io.observe(el));
  }

  /* ---------- Home ---------- */

  function renderHero() {
    const photo = (p) => `
      <div class="win w-${p.key}" data-win>
        <div class="win-bar">${esc(p.file)}</div>
        <div class="win-media">${p.href
          ? `<a href="${esc(p.href)}"><img src="${esc(p.image)}" alt="${esc(p.alt)}" draggable="false"></a>`
          : `<img src="${esc(p.image)}" alt="${esc(p.alt)}" draggable="false">`}</div>
      </div>`;
    const about = `
      <div class="win w-about" data-win>
        <div class="win-bar">about.txt</div>
        <div class="win-text">
          <h2>${esc(c.hero.about.title)}</h2>
          ${c.hero.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        </div>
      </div>`;
    const term = `
      <div class="win win-term w-term" data-win>
        <div class="win-bar">~/justin</div>
        <div class="term-body">
          ${c.hero.terminal.map((t) => `<div class="cmd">${esc(t.cmd)}</div><div class="out">${esc(t.out)}</div>`).join("")}
          <div class="cmd"><span class="cursor"></span></div>
        </div>
      </div>`;
    $("heroBg").innerHTML = c.hero.background.map((src) => `<img src="${esc(src)}" alt="">`).join("");
    $("stage").insertAdjacentHTML("beforeend", c.hero.photos.map(photo).join("") + about + term);
    enableDragging();
  }

  // Dragging uses the `translate` property so it never fights the entrance animation.
  function enableDragging() {
    const canDrag = window.matchMedia("(min-width: 761px)");
    let top = 10;
    document.querySelectorAll("[data-win]").forEach((win) => {
      const bar = win.querySelector(".win-bar");
      let dx = 0, dy = 0, startX = 0, startY = 0, limits = null;
      win.addEventListener("pointerdown", () => {
        if (canDrag.matches) win.style.zIndex = ++top;
      });
      bar.addEventListener("pointerdown", (e) => {
        if (!canDrag.matches) return;
        bar.setPointerCapture(e.pointerId);
        win.classList.add("dragging");
        startX = e.clientX - dx;
        startY = e.clientY - dy;
        // Keep the title bar reachable: it can't leave the hero.
        const hero = win.closest(".hero").getBoundingClientRect();
        const r = win.getBoundingClientRect();
        limits = {
          minX: dx - (r.left - hero.left) - r.width + 80,
          maxX: dx + (hero.right - r.left) - 80,
          minY: dy - (r.top - hero.top),
          maxY: dy + (hero.bottom - r.top) - 40
        };
      });
      bar.addEventListener("pointermove", (e) => {
        if (!limits) return;
        dx = Math.min(limits.maxX, Math.max(limits.minX, e.clientX - startX));
        dy = Math.min(limits.maxY, Math.max(limits.minY, e.clientY - startY));
        win.style.translate = `${dx}px ${dy}px`;
      });
      const end = () => {
        limits = null;
        win.classList.remove("dragging");
      };
      bar.addEventListener("pointerup", end);
      bar.addEventListener("pointercancel", end);
    });
  }

  function renderIntro() {
    $("status").textContent = c.intro.status;
    $("experience").innerHTML = c.experience.items.map((x) => `
      <details class="row">
        <summary>
          <span class="row-year">${esc(x.year)}</span>
          <span class="row-company">${esc(x.company)}</span>
          <span class="row-role">${esc(x.role)}</span>
        </summary>
        <div class="row-body">
          <p class="mono">${esc(x.dates)}</p>
          <ul>${x.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
        </div>
      </details>`).join("");
  }

  function tileArt(p) {
    const pos = p.position ? `--pos: ${esc(p.position)};` : "";
    const ratio = p.ratio ? `--ratio: ${esc(p.ratio)};` : "";
    return `<div class="tile-art" style="${ratio}${pos}"><img src="${esc(p.image)}" alt="${esc(p.alt)}" loading="lazy"></div>`;
  }

  function renderWork() {
    const tile = (t, href) => `
      <a class="tile reveal" href="${esc(href)}" style="--order: ${t.order}">
        ${tileArt(t)}
        <div class="tile-meta">
          <span class="tile-title">${esc(t.title)}${t.demo ? `<span class="tile-demo mono">${esc(t.demo.badge)}</span>` : ""}</span>
          <span class="tile-label mono">${esc(t.label)}</span>
        </div>
      </a>`;
    const entries = c.projects.map((p) => ({ item: p, href: `#${p.slug}` }));
    [1, 2].forEach((col) => {
      $(`col${col}`).innerHTML = entries
        .filter((e) => e.item.column === col)
        .sort((a, b) => a.item.order - b.item.order)
        .map((e) => tile(e.item, e.href))
        .join("");
    });
  }

  function renderProjectDialog() {
    const dialog = $("projectDialog");
    const open = () => {
      const p = c.projects.find((x) => `#${x.slug}` === location.hash);
      if (!p) {
        if (dialog.open) dialog.close();
        return;
      }
      $("dialogFile").textContent = p.label;
      $("dialogBody").innerHTML = `
        <h2>${esc(p.title)}</h2>
        <p>${esc(p.description)}</p>
        <ul class="dialog-tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${p.demo ? `<a class="btn-demo" href="${esc(p.demo.url)}">${esc(p.demo.label)} &rarr;</a>` : ""}
        ${p.links.length ? `<div class="dialog-links">${p.links.map((l) => `<a href="${esc(l.url)}"${external(l.url)}>${esc(l.label)} &#8599;</a>`).join("")}</div>` : ""}
        ${p.note ? `<p class="dialog-note">${esc(p.note)}</p>` : ""}`;
      if (!dialog.open) dialog.showModal();
      dialog.scrollTop = 0;
    };
    dialog.addEventListener("close", () => {
      if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close(); // click on the backdrop
    });
    $("dialogClose").addEventListener("click", () => dialog.close());
    window.addEventListener("hashchange", open);
    open();
  }

  function renderOffClock() {
    const p = c.personal;
    $("offLabel").textContent = p.label;
    $("offCopy").textContent = p.copy;
    $("offLinks").innerHTML = p.links.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join("");
    $("offPhotos").innerHTML = p.photos.map((x) => `<img src="${esc(x.image)}" alt="${esc(x.alt)}" loading="lazy">`).join("");
  }

  function renderBottom() {
    renderOffClock();
    $("skillsLabel").textContent = c.skills.label;
    $("skills").innerHTML = c.skills.groups.map((g) => `
      <div class="skill-row"><dt class="mono">${esc(g.label)}</dt><dd>${esc(g.items)}</dd></div>`).join("");
    renderContact();
  }

  function renderContact() {
    const k = c.contact;
    $("contactTitle").textContent = k.title;
    $("contactCopy").textContent = k.copy;
    $("contactLinks").innerHTML = k.items.map((i) => `
      <a class="contact-link" href="${esc(i.url)}"${external(i.url)}>
        <span class="mono">${esc(i.label)}</span>
        <span class="contact-value">${esc(i.value)}</span>
      </a>`).join("");
    // The resume button stays hidden until contact.resumeUrl is set.
    if (k.resumeUrl) {
      $("contactLinks").insertAdjacentHTML("afterend",
        `<a class="resume-btn mono" href="${esc(k.resumeUrl)}" target="_blank" rel="noreferrer">Download résumé</a>`);
    }
    $("footYear").textContent = new Date().getFullYear();
  }

  /* ---------- Cooking + Cars ---------- */

  function renderGallery(key) {
    const page = c[key];
    $("pageTitle").textContent = page.pageTitle;
    $("pageIntro").textContent = page.sectionNote;
    $("gallery").innerHTML = page.items.map((it, i) => `
      <button class="gallery-item reveal" type="button" data-i="${i}">
        <span class="frame" style="display:block"><img src="${esc(it.image)}" alt="${esc(it.caption)}" loading="lazy"></span>
        <span class="cap">${esc(it.caption)}</span>
      </button>`).join("");

    const box = $("lightbox");
    let at = 0;
    const show = (i) => {
      at = (i + page.items.length) % page.items.length;
      const it = page.items[at];
      $("lbImg").src = it.image;
      $("lbImg").alt = it.caption;
      $("lbCap").textContent = it.caption;
      $("lbCount").textContent = `${at + 1} / ${page.items.length}`;
      if (!box.open) box.showModal();
    };
    $("gallery").addEventListener("click", (e) => {
      const btn = e.target.closest(".gallery-item");
      if (btn) show(Number(btn.dataset.i));
    });
    $("lbPrev").addEventListener("click", () => show(at - 1));
    $("lbNext").addEventListener("click", () => show(at + 1));
    $("lbClose").addEventListener("click", () => box.close());
    box.addEventListener("click", (e) => {
      if (e.target === box) box.close();
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(at - 1);
      if (e.key === "ArrowRight") show(at + 1);
    });
  }

  /* ---------- Boot ---------- */

  document.documentElement.classList.add("js");
  const page = document.body.dataset.page;
  if (page === "home") {
    renderHero();
    renderIntro();
    renderWork();
    renderBottom();
    renderProjectDialog();
  } else {
    renderGallery(page);
  }
  observeReveals();
})();
