import React from 'react';

function RecommendationCard({ product }) {
  return (
    <article className="bg-surface-100 rounded-xl shadow-md p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      {product.description && (
        <p className="text-sm text-gray-700">{product.description}</p>
      )}
      {product.link && (
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Saiba mais
        </a>
      )}
    </article>
  );
}

function RecommendationList({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div id="recommendation-list" className="mt-6 text-center text-gray-500">
        Clique em obter recomendação para ver os produtos sugeridos aqui.
      </div>
    );
  }

  return (
    <section
      id="recommendation-list"
      className="mt-6 grid grid-cols-1 gap-4"
    >
      {recommendations.map((r) => (
        <RecommendationCard key={r.id || r.name} product={r} />
      ))}
    </section>
  );
}
export default RecommendationList;
