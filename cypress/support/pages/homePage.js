export class HomePage {
    constructor() {
        this.onlineShopButton = `a[id="onlineshoplink"]`;
    };

    clicOnlineShopButton() {
        cy.get(this.onlineShopButton).click();
    };
};