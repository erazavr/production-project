
let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.visit('profile')
    cy.login().then(data => {
      profileId = data.id
      cy.visit(`profile/${data.id}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('Профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'Test')
  })
  it('Пользователь редактирует профиль', () => {
    const newName = 'new name'
    const newLastname = 'new lastname'
    cy.updateProfile(newName, newLastname)
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
  })
})

export {}
