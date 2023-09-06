import { login } from './commpands/login'

Cypress.Commands.add('login', login)

declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable<void>
    }
  }
}

export {}
