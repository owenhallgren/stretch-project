
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
})
