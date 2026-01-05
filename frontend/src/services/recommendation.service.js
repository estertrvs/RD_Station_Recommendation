const { toLowerTrim, collectTokens } = require('../utils/recommendationHelper');

function scoreProduct(product, formData = {}) {
  const prefs = Array.isArray(formData.selectedPreferences) ? formData.selectedPreferences : [];
  const feats = Array.isArray(formData.selectedFeatures) ? formData.selectedFeatures : [];
  const tokens = collectTokens(product);
  let prefMatches = 0, featMatches = 0;

  for (const p of prefs) {
    const t = toLowerTrim(p); if (!t) continue;
    if (tokens.has(t)) { prefMatches++; continue; }
    for (const tok of tokens) { if (tok.includes(t) || t.includes(tok)) { prefMatches++; break; } }
  }

  for (const f of feats) {
    const t = toLowerTrim(f); if (!t) continue;
    if (tokens.has(t)) { featMatches++; continue; }
    for (const tok of tokens) { if (tok.includes(t) || t.includes(tok)) { featMatches++; break; } }
  }

  const hadPrefs = prefs.length > 0, hadFeats = feats.length > 0;
  if (hadPrefs && hadFeats) { if (prefMatches === 0 || featMatches === 0) return null; }
  else if (hadPrefs) { if (prefMatches === 0) return null; }
  else if (hadFeats) { if (featMatches === 0) return null; }
  else return null;

  return prefMatches + featMatches;
}

function getRecommendations(formData = {}, products = []) {
  const prodArray = Array.isArray(products) ? products : [];
  const mode = formData.selectedRecommendationType === 'SingleProduct' ? 'SingleProduct' : 'MultipleProducts';
  const limit = Number.isInteger(formData.limit) ? formData.limit : prodArray.length;

  const buckets = new Map();
  let maxScore = -Infinity;

  for (let i = 0; i < prodArray.length; i++) {
    const p = prodArray[i];
    const s = scoreProduct(p, formData);
    if (s === null || s === undefined) continue;
    if (!buckets.has(s)) buckets.set(s, []);
    buckets.get(s).push({ product: p, index: i });
    if (s > maxScore) maxScore = s;
  }

  if (maxScore === -Infinity) return [];

  if (mode === 'SingleProduct') {
    const candidates = buckets.get(maxScore) || [];
    let chosen = candidates[0];
    for (const c of candidates) if (c.index > chosen.index) chosen = c;
    return chosen ? [chosen.product] : [];
  }

  const result = [];
  for (let score = maxScore; score >= 0 && result.length < limit; score--) {
    const bucket = buckets.get(score);
    if (!bucket) continue;
    for (let j = 0; j < bucket.length && result.length < limit; j++) {
      result.push(bucket[j].product);
    }
  }

  return result;
}

module.exports = { getRecommendations, scoreProduct };
