/// <reference types="Cypress" />

import loginPage from "../support/pages/login"
import shaversPage from "../support/pages/shavers"
import header from "../support/components/header"

describe("login", () => {
  context("quando submeto o formulário", () => {
    it("deve logar com sucesso", () => {
      const user = {
        name: "stevan",
        email: "stevan@gmail.com",
        password: "senha123",
      }

      loginPage.submit(user.email, user.password)
      shaversPage.header.userShouldLoggedIn(user.name)
    })

    it("não deve logar com senha incorreta", () => {
      const user = {
        name: "stevan",
        email: "stevan@gmail.com",
        password: "wrongPassword",
      }

      loginPage.submit(user.email, user.password)

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais."

      loginPage.noticeShouldBe(message)
    })

    it("não deve logar com email incorreta", () => {
      const user = {
        name: "stevan",
        email: "inexistentemail@gmail.com",
        password: "inexistentpass",
      }

      loginPage.submit(user.email, user.password)

      const message =
        "Ocorreu um erro ao fazer login, verifique suas credenciais."

      loginPage.noticeShouldBe(message)
    })

    it("campos obrigatórios", () => {
      loginPage.submit()
      loginPage.requiredFields("E-mail é obrigatório", "Senha é obrigatória")
    })
  })

  context("senha muito curta", () => {
    const passwords = ["1", "12", "123", "1234", "12345"]

    passwords.forEach((p) => {
      it(`não deve logar com a senha: ${p}`, () => {
        loginPage.submit("stevan@gmail.com", p)
        loginPage.alertShouldBe("Pelo menos 6 caracteres")
      })
    })
  })

  context("email no formato incorreto", () => {
    const emails = [
      "stevan$gmail.com",
      "stevan.com.br",
      "@gmail.com",
      "@",
      "stevan@",
      "121212",
      "xpto123",
      "@#$%¨&*",
    ]

    emails.forEach((e) => {
      it(`não deve logar com a email: ${e}`, () => {
        loginPage.submit(e, "senha123")
        loginPage.alertShouldBe("Informe um email válido")
      })
    })
  })
})
