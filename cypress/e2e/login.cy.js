import baseTricentis from "../../support/pageObject/tricentis/baseTricentis"

describe('verify login scenario', () => {
    const BaseTricentis = new baseTricentis ()

    it('success login', () => {
        cy.visit('/')
        cy.get('.ico-login').click()
        cy.get(BaseTricentis.email).type('melindafitriani@gmail.com')
        cy.get(BaseTricentis.password).type(123456)
        cy.get('#RememberMe').click()
        cy.get('form > .buttons > .button-1').click()
        cy.get('.header-links > ul > :nth-child(1) > .account').should('contain.text', 'melindafitriani@gmail.com')
        cy.url().should('include', 'https://demowebshop.tricentis.com/')
    

    })

})