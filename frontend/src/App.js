import React, { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      <header className="w-full bg-gradient-to-r from-primary-500 to-primary-600 py-8 shadow-md flex flex-col items-center gap-4">
        <img
          src="https://www.rdstation.com/favicon.ico"
          alt="Logo RD Station"
          className="h-20 md:h-22"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center tracking-wide font-sans">
          Recomendador de Produtos RD Station
        </h1>
      </header>

      <main className="w-full max-w-6xl px-4 py-12">
        <div className="bg-white p-10 rounded-2xl shadow-md">
          <p className="text-gray-700 mb-6 leading-relaxed text-lg md:text-xl text-center font-sans">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode encontrar uma variedade de produtos da RD Station, cada um projetado para atender às necessidades específicas do seu negócio.
            De CRM a Marketing, de Conversas a Inteligência Artificial, temos uma solução para ajudar você a alcançar seus objetivos.
          </p>

          <div className="my-8 border-t border-surface-200" />

          <p className="text-gray-600 mb-8 leading-relaxed text-base md:text-lg text-center font-sans">
            Use o formulário abaixo para selecionar suas preferências e funcionalidades desejadas e receba recomendações personalizadas de produtos que melhor atendam às suas necessidades.
          </p>

          <Form setRecommendations={setRecommendations} />

          <div id="recommendation-list" className="mt-10">
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
