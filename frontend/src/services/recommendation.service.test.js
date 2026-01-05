import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('recommendationService', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração com chatbots'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna vazio quando nenhuma preferência ou feature é selecionada', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(0);
  });

  test('Retorna produtos corretos quando apenas preferências são selecionadas', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);

    expect(recommendations.map(p => p.name)).toContain('RD Station Marketing');
  });

  test('Retorna produtos corretos quando apenas features são selecionadas', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: ['Rastreamento de interações com clientes'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);

    expect(recommendations.map(p => p.name)).toContain('RD Station CRM');
  });

  test('Retorna vazio quando não há produtos que atendem às seleções', () => {
    const formData = {
      selectedPreferences: ['Preferência inexistente'],
      selectedFeatures: ['Feature inexistente'],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(0);
  });

  test('Respeita o limite em MultipleProducts', () => {
    const formData = {
      selectedPreferences: ['Automação de marketing', 'Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Rastreamento de interações com clientes', 'Rastreamento de comportamento do usuário'],
      selectedRecommendationType: 'MultipleProducts',
      limit: 1,
    };

    const recommendations = recommendationService.getRecommendations(formData, mockProducts);

    expect(recommendations).toHaveLength(1);
  });

  test('Não quebra quando produto não possui campos de features ou preferences', () => {
    const products = [
      { name: 'Produto sem campos' },
      ...mockProducts,
    ];
    const formData = {
      selectedPreferences: ['Automação de marketing'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(formData, products);

    expect(Array.isArray(recommendations)).toBe(true);
  });

});
