import { User } from '../../../src/entities/User'

export const updateProfile = (firstname: string, lastname: string) => {
  cy.getByTestId('EditableProfileHeader.EditButton').click()
  cy.getByTestId('ProfileCard.firstname').clear().type(firstname)
  cy.getByTestId('ProfileCard.lastname').clear().type(lastname)
  cy.getByTestId('EditableProfileHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
  return cy.request({
    method: 'PUT',
    url: 'http://localhost:8000/profile/' + profileId,
    headers: { Authorization: 'asdf' },
    body: {
      id: '4',
      first: 'Test',
      lastname: 'User',
      age: 22,
      currency: 'KGS',
      country: 'Ukraine',
      city: 'Bishkek',
      username: 'Test User',
      avatar: 'https://static.javatpoint.com/images/javascript/javascript_logo.png'
    }
  })
}

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstname: string, lastname: string): Chainable<User>
      resetProfile(profileId: string): Chainable<User>
    }
  }
}
