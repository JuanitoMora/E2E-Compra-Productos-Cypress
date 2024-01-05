export class ReciptPage {

    obtenerNombre(nombre) {
        return cy.contains(nombre);
    };

    obtenerApellido(apellido) {
        return cy.contains(apellido);
    };

    obtenerProducto1(product1) {
        return cy.contains(product1);
    };

    obtenerProducto2(product2) {
        return cy.contains(product2);
    };

    obtenerNumTarjeta(numTarjeta) {
        return cy.contains(numTarjeta);
    };

    obtenerGastado(gastado) {
        return cy.contains(gastado);
    };

    clicThankUButton() {
        cy.xpath(`//button[text()="Thank you"]`).click();
    };
}