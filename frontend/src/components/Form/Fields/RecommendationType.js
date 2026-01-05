import React from 'react';
import Checkbox from '../../shared/Checkbox';

function RecommendationType({ onRecommendationTypeChange, value = '' }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2 text-center">Tipo de Recomendação:</h2>
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <Checkbox
            id="rec-single"
            type="radio"
            name="recommendationType"
            value="SingleProduct"
            checked={value === 'SingleProduct'}
            onChange={() => onRecommendationTypeChange('SingleProduct')}
          />
          <label htmlFor="rec-single" className="text-sm text-gray-700">Produto Único</label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="rec-multiple"
            type="radio"
            name="recommendationType"
            value="MultipleProducts"
            checked={value === 'MultipleProducts'}
            onChange={() => onRecommendationTypeChange('MultipleProducts')}
          />
          <label htmlFor="rec-multiple" className="text-sm text-gray-700">Múltiplos Produtos</label>
        </div>
      </div>
    </div>
  );
}

export default RecommendationType;
