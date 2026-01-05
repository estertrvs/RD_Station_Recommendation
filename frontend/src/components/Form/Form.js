// src/components/Form/Form.js
import React, { useRef } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import recommendationService from '../../services/recommendation.service';

function Form({ setRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const anchorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = recommendationService.getRecommendations(formData, products);
    const normalized = Array.isArray(result) ? result : result ? [result] : [];

    if (typeof setRecommendations === 'function') {
      setRecommendations(normalized);
    } else {
      console.warn('setRecommendations não foi passado para Form', normalized);
    }

    setTimeout(() => {
      const el = document.getElementById('recommendation-list') || anchorRef.current;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white rounded-xl shadow p-6 h-full min-h-[28rem] flex flex-col">
          <div className="flex-1 overflow-auto pr-2">
            <Preferences
              preferences={preferences}
              onPreferenceChange={(selected) =>
                handleChange('selectedPreferences', selected)
              }
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 h-full min-h-[28rem] flex flex-col">
          <div className="flex-1 overflow-auto pr-2">
            <Features
              features={features}
              onFeatureChange={(selected) =>
                handleChange('selectedFeatures', selected)
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-white rounded-lg p-4 shadow-sm mb-4">
          <RecommendationType
            value={formData.selectedRecommendationType}
            onRecommendationTypeChange={(selected) =>
              handleChange('selectedRecommendationType', selected)
            }
          />
        </div>

        <SubmitButton
          type="submit"
          text="Obter recomendação"
          className="w-64 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-3 shadow"
        />
      </div>

      <div ref={anchorRef} id="recommendation-list-anchor" className="mt-8" />
    </form>
  );
}

export default Form;
