import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
let productName;
let productPrice;
Given("que acesso o site da Giuliana Flores", () => {
  cy.visit("https://www.giulianaflores.com.br/", { timeout: 20000 });
  cy.get("body", { timeout: 10000 }).should("be.visible");
  cy.log("✅ Site carregado");
});
When("pesquiso por {string}", (produto) => {
  cy.get('[data-testid="txtDsKeyWord"]', { timeout: 10000 })
    .should("be.visible")
    .clear()
    .type(`${produto}{enter}`);
  // Aguarda lista de produtos aparecer
  cy.get('[data-testid="product-item"]', { timeout: 15000 }).should("exist");
  cy.log(`🔍 Pesquisa realizada: ${produto}`);
});
When("seleciono o primeiro resultado", () => {
  cy.get('[data-testid="product-item"]', { timeout: 10000 })
    .first()
    .within(() => {
      // Nome do produto
      cy.get('[data-testid="product-name"]')
        .invoke("text")
        .then((text) => {
          productName = text.trim();
          cy.log(`🛒 Produto encontrado: ${productName}`);
        });
      // Preço do produto
      cy.get('[data-testid="product-price"]')
        .invoke("text")
        .then((text) => {
          productPrice = text.replace(/[^\d,]/g, "").trim();
          cy.log(`💰 Preço encontrado: ${productPrice}`);
        });
      cy.root().click();
    });
});
Then("o nome e o preço são os mesmos no detalhe", () => {
  cy.get("h1", { timeout: 10000 })
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(productName);
    });
  cy.get(".precoPor", { timeout: 10000 })
    .invoke("text")
    .then((text) => {
      const detalhePrice = text.replace(/[^\d,]/g, "").trim();
      expect(detalhePrice).to.eq(productPrice);
    });
  cy.log("✅ Nome e preço conferidos na página de detalhes");
});
When("adiciono o produto ao carrinho", () => {
  cy.get("#ContentSite_lbtBuy", { timeout: 10000 })
    .should("be.visible")
    .click();
  cy.url({ timeout: 15000 }).should("include", "/carrinho");
  cy.get(".carrinho-container", { timeout: 10000 }).should("be.visible");
  cy.log("🛒 Produto adicionado ao carrinho");
});
Then("o nome e o preço são os mesmos no carrinho", () => {
  // Nome no carrinho
  cy.get(".carrinho-container a", { timeout: 10000 })
    .first()
    .invoke("text")
    .then((text) => {
      expect(text.trim()).to.eq(productName);
    });
  // Preço no carrinho
  cy.get(".valor-total-carrinho", { timeout: 10000 })
    .invoke("text")
    .then((text) => {
      const precoCarrinho = text.replace(/[^\d,]/g, "").trim();
      expect(precoCarrinho).to.eq(productPrice);
    });
  cy.log("✅ Nome e preço conferidos no carrinho");
});
