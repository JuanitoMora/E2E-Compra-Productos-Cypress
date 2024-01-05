export class CheckoutPage {
    constructor() {
        this.firstNameInput = `input[id="FirstName"]`;
        this.lastNameInput = `input[id="lastName"]`;
        this.cardNumberInput = `input[id="cardNumber"]`;
    };

    escribirNombre(firstName) {
        cy.get(this.firstNameInput).type(firstName);
    };

    escribirApellido(lastName) {
        cy.get(this.lastNameInput).type(lastName);
    };

    escribirTarjeta(tarjeta) {
        cy.get(this.cardNumberInput).type(tarjeta);
    };

    clicPurchaseButton() {
        cy.xpath(`//button[text()="Purchase"]`, { timeout: 20000 }).click();
    };
};