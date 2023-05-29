import baseTricentis from "../../support/pageObject/tricentis/baseTricentis"
import registerPage from "../../support/pageObject/tricentis/registerPage"
const registerinput = require("../../fixtures/tricentis/register.json")

describe('verify register scenario', () => {
    const BaseTricentis = new baseTricentis ()
    const RegisterPage = new registerPage ()
    
    beforeEach(() => {
        cy.visit('/')
        cy.get(RegisterPage.registerMenu).click()
    })

    it('succes register', () => {
        cy.get(RegisterPage.genderFemale).click()
        cy.get(RegisterPage.firstName).should('be.visible').type(registerinput.firstName)
        cy.get(RegisterPage.lastName).should('be.visible').type(registerinput.lastName)
        cy.get(BaseTricentis.email).should('be.visible').type(`${Date.now()}@gmail.com`)
        cy.get(BaseTricentis.password).should('be.visible').type(registerinput.password)
        cy.get(RegisterPage.confirmPassword).should('be.visible').type(registerinput.confirmPassword)
        cy.get(RegisterPage.registerBtn).click()
        cy.get(RegisterPage.succsessMsg).should('contain.text',registerinput.succsessMsg)
        cy.get(RegisterPage.continueBtn).click()
        cy.get(RegisterPage.welcomeMsg).should('contain.text', registerinput.welcomeMsg)

    })

    it('falied register empty fields', () => {
        cy.get(RegisterPage.continueBtn).click()
        cy.get(RegisterPage.errorFirstname).should('contain.text', registerinput.errorFirstname)
        cy.get(RegisterPage.errorEmail).should('contain.text', registerinput.errorEmail)
        cy.get(RegisterPage.errorPassword).should('contain.text', registerinput.errorPassword)

    })

    it('failed register using existing email', () => {
        cy.get(RegisterPage.genderFemale).click()
        cy.get(RegisterPage.firstName).should('be.visible').type(registerinput.firstName)
        cy.get(RegisterPage.lastName).should('be.visible').type(registerinput.lastName)
        cy.get(BaseTricentis.email).should('be.visible').type(registerinput.emailExist)
        cy.get(BaseTricentis.password).should('be.visible').type(registerinput.password)
        cy.get(RegisterPage.confirmPassword).should('be.visible').type(registerinput.confirmPassword)
        cy.get(RegisterPage.registerBtn).click()
        cy.get(RegisterPage.errorEmailexist).should('contain.text', registerinput.emailExistMsg)
    })
})