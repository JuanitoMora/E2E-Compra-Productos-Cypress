export class ProductPage {

    agregarProductosButton(product) {
        cy.xpath(`//p[contains(text(), "${product}")]//following-sibling::button`).click();
        cy.xpath(`//button[contains(text(), "Close")]`).click();
    };

    clicGoShoppingCartButton() {
        cy.xpath(`//button[@id="goShoppingCart"]`).click();
    };
};