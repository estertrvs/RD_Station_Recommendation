export function toLowerTrim(s) {
  return typeof s === 'string' ? s.toLowerCase().trim() : '';
}

export function collectTokens(product, fields = ['preferences','features','name','category']) {
  const set = new Set();
  if (!product) return set;
  const add = v => {
    if (!v) return;
    if (Array.isArray(v)) v.forEach(x => { const t = toLowerTrim(x); if (t) set.add(t); });
    else { const t = toLowerTrim(v); if (t) set.add(t); }
  };
  for (const f of fields) add(product[f]);
  return set;
}
