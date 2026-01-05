import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Recomendador de Produtos RD Station
        </h1>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <p className="text-gray-600 mb-6 text-justify">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio. De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos. <br /> Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
          </p>

          <Form setRecommendations={setRecommendations} />

          <div id="recommendation-list" className="mt-8">
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
