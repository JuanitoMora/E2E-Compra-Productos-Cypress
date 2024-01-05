export class ShoppingCartPage {

    obtenerProducto(product) {
        return cy.contains(product);
    };

    clicShowTotalPriceButton() {
        cy.xpath(`//button[text()="Show total price"]`).click();
    };

    clicGoToCheckoutButton() {
        cy.xpath(`//button[text()="Go to Checkout"]`).click();
    };
};