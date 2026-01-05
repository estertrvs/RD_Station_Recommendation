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

  test('Trata preferências com espaços e case diferente', () => {
    const formData = {
      selectedPreferences: ['  automação de Marketing  '],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };
    const recs = recommendationService.getRecommendations(formData, mockProducts);
    expect(recs.map(p => p.name)).toContain('RD Station Marketing');
  });

  test('Não quebra quando formData é undefined', () => {
    const recs = recommendationService.getRecommendations(undefined, mockProducts);
    expect(Array.isArray(recs)).toBe(true);
  });

  test('Não quebra quando products é undefined', () => {
    const formData = { selectedPreferences: ['Automação de marketing'], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' };
    const recs = recommendationService.getRecommendations(formData, undefined);
    expect(Array.isArray(recs)).toBe(true);
  });

  test('Limite 0 retorna vazio', () => {
    const formData = { selectedPreferences: ['Automação de marketing'], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts', limit: 0 };
    const recs = recommendationService.getRecommendations(formData, mockProducts);
    expect(recs).toHaveLength(0);
  });

  test('Limite maior que matches retorna todos os matches', () => {
    const formData = { selectedPreferences: ['Automação de marketing'], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts', limit: 10 };
    const recs = recommendationService.getRecommendations(formData, mockProducts);
    expect(recs.length).toBeGreaterThanOrEqual(1);
  });

  test('Tipo inválido cai para MultipleProducts por padrão', () => {
    const formData = { selectedPreferences: ['Automação de marketing'], selectedFeatures: [], selectedRecommendationType: 'UnknownType' };
    const recs = recommendationService.getRecommendations(formData, mockProducts);
    expect(Array.isArray(recs)).toBe(true);
  });

  test('Empates em MultipleProducts mantêm ordem estável definida', () => {
    const tieProducts = [
      { id: 1, name: 'A', preferences: ['X'], features: [] },
      { id: 2, name: 'B', preferences: ['X'], features: [] },
      { id: 3, name: 'C', preferences: [], features: [] }, 
    ];

    const formData = {
      selectedPreferences: ['X'],
      selectedFeatures: [],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recs = recommendationService.getRecommendations(formData, tieProducts);

    expect(recs).toHaveLength(2);
    expect(recs.map(r => r.name)).toEqual(['A', 'B']);
  });

  test('Não muta o array original de produtos', () => {
    const productsCopy = JSON.parse(JSON.stringify(mockProducts));
    const formData = { selectedPreferences: ['Automação de marketing'], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' };
    recommendationService.getRecommendations(formData, productsCopy);
    expect(productsCopy).toEqual(JSON.parse(JSON.stringify(mockProducts)));
  });

  test('Trata fields não-array sem quebrar', () => {
    const products = [{ name: 'P1', preferences: 'Automação de marketing' }, ...mockProducts];
    const formData = { selectedPreferences: ['Automação de marketing'], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' };
    const recs = recommendationService.getRecommendations(formData, products);
    expect(Array.isArray(recs)).toBe(true);
  });

  test('Escala com muitos produtos sem estourar', () => {
    const big = new Array(1000).fill(0).map((_, i) => ({ id: i, name: `P${i}`, preferences: ['A'] }));
    const formData = { selectedPreferences: ['A'], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' };
    const recs = recommendationService.getRecommendations(formData, big);
    expect(recs.length).toBeGreaterThan(0);
  });

  test('Produtos retornados preservam description e link', () => {
    const formData = { selectedPreferences: ['Automação de marketing'], selectedFeatures: [], selectedRecommendationType: 'MultipleProducts' };
    const recs = recommendationService.getRecommendations(formData, mockProducts);
    if (recs.length > 0) {
      expect(recs[0]).toHaveProperty('description');
      expect(recs[0]).toHaveProperty('link');
    }
  });

});
