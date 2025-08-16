🌸 Automação de Testes - Giuliana Flores (Cypress + Cucumber)

Este projeto contém um conjunto de testes automatizados para o site Giuliana Flores, utilizando Cypress com Cucumber (Gherkin).
O objetivo é validar a pesquisa de produtos, conferência de nome e preço, e o fluxo de adição ao carrinho.

🛠️ Tecnologias utilizadas

Cypress

Cucumber Preprocessor

JavaScript (ES6)

📂 Estrutura do projeto
cypress/
  e2e/
    features/
      produto.feature     # Cenário em Gherkin
      produto.js          # Step Definitions (seu código)
  support/
cypress.config.js
package.json

✅ Cenários cobertos

Acessar o site da Giuliana Flores

Pesquisar por um produto

Selecionar o primeiro resultado e validar nome e preço

Adicionar o produto ao carrinho

Validar nome e preço no carrinho

▶️ Como executar

Clone este repositório:

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio


Instale as dependências:

npm install


Rode os testes no modo interativo:

npx cypress open


Ou no modo headless:

npx cypress run

📌 Observações

Certifique-se de ter o Node.js instalado.

Os testes acessam o site oficial da Giuliana Flores em ambiente real.
