function validateForm(formData) {
  const errors = [];

  if (!formData.selectedRecommendationType) {
    errors.push({ field: 'type', message: 'Por favor, selecione o tipo de recomendação.' });
  }

  if (
    (!formData.selectedPreferences || formData.selectedPreferences.length === 0) &&
    (!formData.selectedFeatures || formData.selectedFeatures.length === 0)
  ) {
    errors.push({ field: 'selection', message: 'Selecione pelo menos uma preferência ou funcionalidade para receber recomendações.' });
  }

  return errors;
}

export default validateForm;
