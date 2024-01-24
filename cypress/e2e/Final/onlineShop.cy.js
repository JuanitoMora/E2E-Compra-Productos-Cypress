/// <reference types="cypress" />

import { CheckoutPage } from "../../support/pages/checkoutPage";
import { HomePage } from "../../support/pages/homePage";
import { ProductPage } from "../../support/pages/productPage";
import { ReciptPage } from "../../support/pages/reciptPage";
import { ShoppingCartPage } from "../../support/pages/shoppingCartPage";


describe('Deberia completar una compra ', () => {

    let info;
    let username;
 
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const reciptPage = new ReciptPage();

    before('Before', () => {
        cy.fixture('datos').then(datos => {
            info = datos;
        })
    });

    it("Deberia registrarse y loguearse correctamente", () => {

        username = info.credentials.nameuser + Math.floor(Math.random() * 1000);
        let password = info.credentials.password;
        let gender = info.credentials.gender;
        let day = info.credentials.day;
        let month = info.credentials.month;
        let year = info.credentials.year;

        cy.postRegister(username, password, gender, day, month, year).then(respuesta => {
            expect(respuesta.status).to.be.equal(201);
            expect(respuesta.body.newUser.username).to.be.equal(username);
        });

        cy.postLogin(username, password).then(respuestaPost2 => {
            expect(respuestaPost2.status).to.be.equal(201);
            expect(respuestaPost2.body.user.username).to.be.equal(username);
            window.localStorage.setItem('token', respuestaPost2.body.token);
            window.localStorage.setItem('user', respuestaPost2.body.user.username);
        });

        cy.visit('');

        homePage.clicOnlineShopButton();
        productPage.agregarProductosButton(info.productos.product1);
        productPage.agregarProductosButton(info.productos.product2);
        productPage.clicGoShoppingCartButton();
        shoppingCartPage.obtenerProducto(info.productos.product1).should('exist').siblings(info.productos.price1);
        shoppingCartPage.obtenerProducto(info.productos.product2).should('exist').siblings(info.productos.price2);;
        shoppingCartPage.clicShowTotalPriceButton();
        cy.xpath(`//p[@id='price']`).invoke('text').then(texto => {
            expect(texto).to.be.equal(`${info.productos.price1 + info.productos.price2}`);
        });
        shoppingCartPage.clicGoToCheckoutButton();
        checkoutPage.escribirNombre(info.compra.nombre);
        checkoutPage.escribirApellido(info.compra.apellido);
        checkoutPage.escribirTarjeta(info.compra.numeroTarjeta);
        checkoutPage.clicPurchaseButton();
        reciptPage.obtenerNombre(info.compra.nombre).should('exist');
        reciptPage.obtenerApellido(info.compra.apellido).should('exist');
        reciptPage.obtenerProducto1(info.productos.product1).should('exist');
        reciptPage.obtenerProducto2(info.productos.product2).should('exist');
        reciptPage.obtenerNumTarjeta(info.compra.numeroTarjeta).should('exist');
        reciptPage.obtenerGastado(info.productos.price1 + info.productos.price2).should('exist');
        reciptPage.clicThankUButton();
    });

    after('After', () => {
        cy.deleteUser(username).then(respuestaDelete => {
            cy.log(respuestaDelete);
            expect(respuestaDelete.status).to.be.equal(202);
        });
    });
});
