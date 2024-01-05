/// <reference types="cypress" />

import { CheckoutPage } from "../../support/pages/checkoutPage";
import { HomePage } from "../../support/pages/homePage";
import { ProductPage } from "../../support/pages/productPage";
import { ReciptPage } from "../../support/pages/reciptPage";
import { ShoppingCartPage } from "../../support/pages/shoppingCartPage";


describe('Deberia completar una compra ', () => {

    let info;
    let username = 0;

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

        username = info.credentials.username + Math.floor(Math.random() * 1000);

        cy.request({
            url: `https://pushing-it.onrender.com/api/register`,
            method: "POST",
            body: {
                "username": username,
                "password": info.credentials.password,
                "gender": info.credentials.gender,
                "day": info.credentials.day,
                "month": info.credentials.month,
                "year": info.credentials.year
            }
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(201);
            expect(respuesta.body.newUser.username).to.be.equal(username);
        });

        cy.request({
            url: `https://pushing-it.onrender.com/api/login`,
            method: "POST",
            body: {
                "username": username,
                "password": info.credentials.password
            }
        }).then(respuestaPost2 => {
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
        cy.request({
            url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
            method: "DELETE",
            failOnStatusCode: false
        }).then(respuestaDelete => {
            cy.log(respuestaDelete);
            expect(respuestaDelete.status).to.be.equal(202);
        });
    });
});
