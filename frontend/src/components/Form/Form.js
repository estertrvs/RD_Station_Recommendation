import React, { useRef, useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import recommendationService from '../../services/recommendation.service';
import validateForm from '../../hooks/useFormValidation';
import ErrorMessage from './ErrorMessage';

function Form({ setRecommendations }) {
  const { preferences, features, products } = useProducts();
  const { formData, handleChange } = useForm({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  });

  const [errors, setErrors] = useState([]);
  const anchorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (validationErrors.length) {
      setErrors(validationErrors);
      setTimeout(() => setErrors([]), 5000);
      return;
    }

    const result = recommendationService.getRecommendations(formData, products);
    const normalized = Array.isArray(result) ? result : result ? [result] : [];

    if (typeof setRecommendations === 'function') {
      setRecommendations(normalized);
    }

    setTimeout(() => {
      const el = document.getElementById('recommendation-list') || anchorRef.current;
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-surface-100 rounded-xl shadow-md p-6 h-full min-h-[20rem] flex flex-col">
          <Preferences
            preferences={preferences}
            onPreferenceChange={(selected) =>
              handleChange('selectedPreferences', selected)
            }
          />
        </div>

        <div className="bg-surface-100 rounded-xl shadow-md p-6 h-full min-h-[20rem] flex flex-col">
          <Features
            features={features}
            onFeatureChange={(selected) =>
              handleChange('selectedFeatures', selected)
            }
          />
        </div>
      </div>

      {errors.find(e => e.field === 'selection') && (
        <ErrorMessage message={errors.find(e => e.field === 'selection').message} />
      )}

      <div className="mt-8 flex flex-col items-center">
        <div className="w-full max-w-md bg-white rounded-lg p-6 mb-6">
          <RecommendationType
            value={formData.selectedRecommendationType}
            onRecommendationTypeChange={(selected) =>
              handleChange('selectedRecommendationType', selected)
            }
          />
          {errors.find(e => e.field === 'type') && (
            <ErrorMessage message={errors.find(e => e.field === 'type').message} />
          )}
        </div>

        <SubmitButton
          type="submit"
          text="Obter recomendação"
          className="w-64 bg-primary-500 hover:bg-primary-600 text-white rounded-lg py-3 shadow-md font-semibold transition-colors"
        />
      </div>

      <div ref={anchorRef} id="recommendation-list-anchor" className="mt-10" />
    </form>
  );
}

export default Form;
