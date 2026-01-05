import React from 'react';

function RecommendationCard({ product }) {
  return (
    <article className="bg-white rounded-xl shadow p-4 flex flex-col gap-3">
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

export default function RecommendationList({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div id="recommendation-list" className="mt-6 text-center text-gray-500">
        Lista de recomendação onde vai aparecer os produtos
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
