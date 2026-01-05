function toLowerTrim(value) {
  return typeof value === 'string' ? value.toLowerCase().trim() : '';
}

function addToSet(set, value) {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) {
    for (const v of value) {
      const t = toLowerTrim(String(v));
      if (t) set.add(t);
    }
  } else {
    const t = toLowerTrim(String(value));
    if (t) set.add(t);
  }
}

function collectProductTextSet(product) {
  const set = new Set();
  if (!product || typeof product !== 'object') return set;
  addToSet(set, product.preferences);
  addToSet(set, product.features);
  addToSet(set, product.name);
  addToSet(set, product.category);
  return set;
}

function scoreProduct(product, formData = {}) {
  const prefs = Array.isArray(formData.selectedPreferences) ? formData.selectedPreferences : [];
  const feats = Array.isArray(formData.selectedFeatures) ? formData.selectedFeatures : [];
  const tokens = collectProductTextSet(product);
  let prefMatches = 0;
  let featMatches = 0;
  for (const p of prefs) {
    const token = toLowerTrim(p);
    if (!token) continue;
    if (tokens.has(token)) {
      prefMatches += 1;
      continue;
    }
    for (const t of tokens) {
      if (t.includes(token) || token.includes(t)) {
        prefMatches += 1;
        break;
      }
    }
  }
  for (const f of feats) {
    const token = toLowerTrim(f);
    if (!token) continue;
    if (tokens.has(token)) {
      featMatches += 1;
      continue;
    }
    for (const t of tokens) {
      if (t.includes(token) || token.includes(t)) {
        featMatches += 1;
        break;
      }
    }
  }
  const hadPrefs = prefs.length > 0;
  const hadFeats = feats.length > 0;
  if (hadPrefs && hadFeats) {
    if (prefMatches === 0 || featMatches === 0) return null;
  } else if (hadPrefs) {
    if (prefMatches === 0) return null;
  } else if (hadFeats) {
    if (featMatches === 0) return null;
  } else {
    return null;
  }
  return prefMatches + featMatches;
}

function normalizeArgs(a1, a2) {
  if (Array.isArray(a1)) return { products: a1, formData: a2 || {} };
  if (Array.isArray(a2)) return { products: a2, formData: a1 || {} };
  return { products: [], formData: {} };
}

function getRecommendations(arg1 = [], arg2 = {}) {
  const { products, formData } = normalizeArgs(arg1, arg2);
  const prodArray = Array.isArray(products) ? products : [];
  const mode = formData.selectedRecommendationType === 'SingleProduct' ? 'SingleProduct' : 'MultipleProducts';
  const limit = Number.isInteger(formData.limit) ? formData.limit : prodArray.length;
  const buckets = new Map();
  let maxScore = -Infinity;
  for (let i = 0; i < prodArray.length; i += 1) {
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
    for (const c of candidates) {
      if (c.index > chosen.index) chosen = c;
    }
    return chosen ? [chosen.product] : [];
  }
  const result = [];
  for (let score = maxScore; score >= 0 && result.length < limit; score -= 1) {
    const bucket = buckets.get(score);
    if (!bucket) continue;
    for (let j = bucket.length - 1; j >= 0 && result.length < limit; j -= 1) {
      result.push(bucket[j].product);
    }
  }
  return result;
}

module.exports = {
  getRecommendations,
  scoreProduct,
  _internals: {
    collectProductTextSet,
    normalizeArgs,
  },
};
