/// <reference types="Cypress" />

import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"
import header from "../support/components/header"

import data from "../fixtures/users.json"

describe("login", () => {
	/**
	 * MODO 3: importando no beforeEach
	 * beforeEach(() => {
	 *   cy.fixture("user-login").then(function (data) {
	 *     this.data = data
	 *   })
	 * })
	 */

	context("quando submeto o formulário", () => {
		it.only("deve logar com sucesso", () => {
			/**
			 * MODO 1: usando o methodo cy.fixture()
			 * cy.fixture("user-login").then(function (data) {
			 *   loginPage.submit(data.email, data.password)
			 *   shaversPage.header.userShouldLoggedIn(data.name)
			 *   loginPage.submit(data.email, data.password)
			 *   shaversPage.header.userShouldLoggedIn(data.name)
			 * })
			 */

			/**
			 * MODO 2: importa a fixture direto no código, via JS puro
			 * */

			// dado que eu tenho um NOVO usuário cadastrado
			const user = data.success

			cy.createUser(user)

			loginPage.submit(user.email, user.password)

			shaversPage.header.userShouldLoggedIn(user.name)

			/**
			 *
			 * MODO 3:importando no beforeEach
			 * obs. Para que esse modo funcione, o 'it' deve usar função
			 * convencional function() {} ao invés de () => {}
			 * const user = this.data
			 * loginPage.submit(user.email, user.password)
			 * shaversPage.header.userShouldLoggedIn(user.name)
			 */
		})

		it("não deve logar com senha incorreta", () => {
			const user = data.invypass

			loginPage.submit(user.email, user.password)

			const message = "Ocorreu um erro ao fazer login, verifique suas credenciais."

			loginPage.noticeShouldBe(message)
		})

		it("não deve logar com email incorreta", () => {
			const user = data.email404

			loginPage.submit(user.email, user.password)

			const message = "Ocorreu um erro ao fazer login, verifique suas credenciais."

			loginPage.noticeShouldBe(message)
		})

		it("campos obrigatórios", () => {
			loginPage.submit()
			loginPage.requiredFields("E-mail é obrigatório", "Senha é obrigatória")
		})
	})

	context("senha muito curta", () => {
		// const passwords = ["1", "12", "123", "1234", "12345"]

		data.shortpass.forEach((p) => {
			it(`não deve logar com a senha: ${p}`, () => {
				loginPage.submit("stevan@gmail.com", p)
				loginPage.alertShouldBe("Pelo menos 6 caracteres")
			})
		})
	})

	context("email no formato incorreto", () => {
		// const emails = [
		//   "stevan$gmail.com",
		//   "stevan.com.br",
		//   "@gmail.com",
		//   "@",
		//   "stevan@",
		//   "121212",
		//   "xpto123",
		//   "@#$%¨&*",
		// ]

		data.invemails.forEach((e) => {
			it(`não deve logar com a email: ${e}`, () => {
				loginPage.submit(e, "senha123")
				loginPage.alertShouldBe("Informe um email válido")
			})
		})
	})
})
