
describe('Page load', () => {
  beforeEach(() => {
    cy.fixture('mockReviews.json')
    .then(reviewData => {
        cy.intercept('GET', 'http://localhost:3003/api/v1/reviews', {
            statusCode: 200,
            body: reviewData
        })
    })
    cy.visit('http://localhost:3000/')
  })

  it('As a user, when I navigate to the home page, a list of outstanding code review requests will be displayed', () => {
    cy.get('.card-container')
    .children()
    .should('have.length', 4)
  })

  it('As a user, when I navigate to my dashboard, I can view all of my active reviews.', () => {
    cy.get('#dashBoard').click()
    cy.get('H1')
    .contains('Active Reviews')
    cy.get('H1')
    .contains('Completed Reviews')
  })

  it('As a user, when I navigate to different areas of the application, the URL should update accordingly.', () => {
    cy.visit('http://localhost:3000/new')
    cy.get('H2')
    .contains('Submit a new request')
    cy.visit('http://localhost:3000/dashboard')
    cy.get('H1')
    .contains('Active Reviews')
    cy.visit('http://localhost:3000/')
    cy.get('H1')
    .contains('Open Review Requests')
  })

  it('As a user, when I select a filter value, I will only be shown requests relevant to that filter', () => {
    cy.get('#languageFilter').select('Java')
    cy.get('.card-container')
    .children()
    .should('have.length', 1)
  })
})
