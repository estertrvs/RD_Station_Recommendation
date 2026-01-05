# Recomendador de Produtos RD Station

Este repositório contém uma aplicação React que permite ao usuário selecionar **preferências** e **funcionalidades** e receber recomendações de produtos RD Station. O backend é simulado com **json-server**. A interface usa **Tailwind CSS** e foi estilizada com base no visual do site da RD Station: https://www.rdstation.com.

## O que foi implementado
- **Serviço de recomendação modular**  
  - `recommendation.service.js` com algoritmo de pontuação, regras de empate e modos **SingleProduct** e **MultipleProducts**.  
  - Empate em **SingleProduct**: retorna o **último** produto válido (maior índice).  
  - **MultipleProducts**: retorna produtos ordenados por score decrescente e, em empate, pela ordem original.

- **Validação e UX no formulário**  
  - Validação visual para **Tipo de recomendação** (Produto Único / Múltiplos Produtos).  
  - Validação visual para **pelo menos uma preferência ou funcionalidade**.  
  - Mensagens de erro exibidas dentro das seções, em vermelho suave, centralizadas e desaparecendo após 5 segundos.  
  - Scroll suave para a lista de recomendações após submissão.

- **Refatoração e componentização**  
  - `FormSection`, `RecommendationBox`, `ErrorMessage` e componentes de campos (`Preferences`, `Features`, `RecommendationType`) para manter `Form.js` enxuto e legível.  
  - Hook `useFormValidation` para centralizar regras de validação.

- **Melhorias na interface**  
  - Header com gradiente nas cores RD Station e logo no topo.  
  - Tipografia e espaçamento ajustados para melhor legibilidade.  
  - Caixas de Preferências e Funcionalidades com fundo suave (`surface-100`) para reduzir excesso de branco.  
  - Separador visual claro entre introdução e formulário.

- **Dados do produto**  
  - `db.json` (json-server) atualizado para incluir **description** e **link** em cada produto, permitindo exibir resumo e botão "Saiba mais" nos cards de recomendação.

- **Testes**  
  - Suíte de testes unitários cobrindo: SingleProduct, MultipleProducts, empate (último válido), ausência de seleções, limites (`limit`), entradas inválidas (`undefined`), normalização (trim/case), produtos sem campos, imutabilidade do array de produtos e comportamento com muitos produtos.  
  - Mocks realistas para cenários determinísticos (empates e ordenação).

## Estrutura principal
**Principais arquivos e pastas**
- `src/services/recommendation.service.js` — lógica de recomendação.  
- `src/components/Form` — formulário e subcomponentes.  
- `src/components/RecommendationList` — exibição das recomendações.  
- `src/mocks/mockProducts.js` — dados de teste usados nos testes unitários.  
- `backend/db.json` — dados do json-server incrementados com `description` e `link`.  
- `src/utils/recommendationHelper.js` — helpers de normalização e tokenização.  
- `src/services/recommendation.service.test.js` — testes unitários.

## Como executar
**Pré‑requisitos**  
- Node.js >= 18.3

**Instalação e execução**
```bash
# clonar repositório
git clone https://github.com/estertrvs/RD_Station_Recommendation.git
cd RD_Station_Recommendation

# instalar dependências
yarn install

# executar script de instalação (se aplicável)
./install.sh

# iniciar frontend e backend (modo dev)
yarn dev

# ou iniciar apenas frontend
yarn start:frontend

# ou iniciar apenas backend (json-server)
yarn start:backend
```

**Rodar testes**
```bash
# executar suíte de testes
cd frontend
yarn test
```

## Notas técnicas e decisões de implementação
- **Complexidade**: o algoritmo avalia cada produto uma única vez e calcula score por produto — complexidade **O(n)** em relação ao número de produtos. Ordenação em `MultipleProducts` é feita apenas sobre os produtos com score > 0, minimizando custo quando poucos produtos batem.  
- **Normalização**: entradas do usuário são normalizadas (trim e lowercase) e comparadas com tokens do produto para permitir correspondências parciais e tolerância a variações de case/espacos.  
- **Robustez**: o serviço trata produtos sem campos `preferences`/`features`, `formData` ou `products` `undefined`, e entradas não-array.  
- **Testabilidade**: regras de negócio isoladas em serviço facilitam testes unitários e manutenção.

## Critérios de aceite atendidos
1. Recebe preferências via formulário.  
2. Retorna recomendações baseadas nas preferências e funcionalidades.  
3. **SingleProduct** retorna um produto.  
4. **MultipleProducts** retorna lista de produtos.  
5. Em empate, **SingleProduct** retorna o último produto válido.  
6. Lida com diferentes tipos de preferências e features.  
7. Serviço modular e extensível.

## Observações finais
- O estilo visual foi inspirado no site oficial da RD Station: https://www.rdstation.com. A logo usada no header é a mesma fonte pública do site.
- Pequenas melhorias no `db.json` foram feitas para enriquecer os cards de recomendação com **description** e **link**. 

## Autor e contato
- Desenvolvedora: Ester Trevisan
- E-mail: estertrvs@gmail.com
- LinkdIn: https://www.linkedin.com/in/estertrvs/
- GitHub: https://github.com/estertrvs
