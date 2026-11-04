// Browser port of the project's scikit-learn pipeline: clean_text -> TF-IDF
// (uni+bi-grams, English stop words, sublinear tf, L2 norm) -> logistic regression.
// model.json holds the fitted vocabulary, idf weights and coefficients.
(function (root) {
  const cleanText = (t) => String(t).toLowerCase()
    .replace(/https?:\/\/\S+|www\.\S+/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[^a-z0-9'\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  function create(m) {
    const stop = new Set(m.stop_words);
    const index = new Map(m.vocab.map((term, i) => [term, i]));

    function terms(text) {
      const toks = (cleanText(text).match(/\b\w\w+\b/g) || []).filter((w) => !stop.has(w));
      const out = toks.slice();
      for (let i = 0; i + 1 < toks.length; i++) out.push(`${toks[i]} ${toks[i + 1]}`);
      return out;
    }

    function score(text) {
      const counts = new Map();
      for (const t of terms(text)) if (index.has(t)) counts.set(t, (counts.get(t) || 0) + 1);
      const weights = [];
      let norm = 0;
      for (const [t, c] of counts) {
        const w = (1 + Math.log(c)) * m.idf[index.get(t)];
        weights.push([t, w]);
        norm += w * w;
      }
      norm = Math.sqrt(norm) || 1;
      let z = m.intercept;
      const contributions = weights.map(([term, w]) => {
        const c = (w / norm) * m.coef[index.get(term)];
        z += c;
        return { term, contribution: c };
      }).sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
      return { positive: 1 / (1 + Math.exp(-z)), contributions, known: counts.size };
    }
    return { score, terms };
  }

  const api = { create, cleanText };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.ReviewModel = api;
})(this);
