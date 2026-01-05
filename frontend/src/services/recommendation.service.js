const { toLowerTrim, collectTokens } = require('../utils/recommendationHelper');

function scoreProduct(product, { selectedPreferences = [], selectedFeatures = [] }) {
  const tokens = collectTokens(product);

  // Conta matches de uma lista de itens contra os tokens do produto
  const countMatches = (items) => {
    return items.reduce((count, item) => {
      const t = toLowerTrim(item);
      if (!t) return count;
      if (tokens.has(t)) return count + 1;
      for (const tok of tokens) {
        if (tok.includes(t) || t.includes(tok)) return count + 1;
      }
      return count;
    }, 0);
  };

  const prefMatches = countMatches(selectedPreferences);
  const featMatches = countMatches(selectedFeatures);

  // Valida se o produto atende às seleções
  const hasPrefs = selectedPreferences.length > 0;
  const hasFeats = selectedFeatures.length > 0;
  if (hasPrefs && hasFeats && (prefMatches === 0 || featMatches === 0)) return null;
  if (hasPrefs && prefMatches === 0) return null;
  if (hasFeats && featMatches === 0) return null;
  if (!hasPrefs && !hasFeats) return null;

  return prefMatches + featMatches;
}

function getRecommendations(formData = {}, products = []) {
  const mode = formData.selectedRecommendationType === 'SingleProduct' ? 'SingleProduct' : 'MultipleProducts';
  const limit = Number.isInteger(formData.limit) ? formData.limit : products.length;

  let maxScore = -Infinity;
  const scoredProducts = [];

  // Avalia todos os produtos e calcula score
  products.forEach((product, index) => {
    const score = scoreProduct(product, formData);
    if (score !== null && score !== undefined) {
      scoredProducts.push({ product, score, index });
      if (score > maxScore) maxScore = score;
    }
  });

  if (scoredProducts.length === 0) return [];

  if (mode === 'SingleProduct') {
    // Seleciona o último produto com score máximo
    const candidates = scoredProducts.filter(p => p.score === maxScore);
    return [candidates.reduce((last, curr) => curr.index > last.index ? curr : last).product];
  }

  // Ordena por score desc e índice asc (ordem estável)
  const sorted = scoredProducts
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(p => p.product);

  return sorted.slice(0, limit);
}

module.exports = { getRecommendations, scoreProduct };
