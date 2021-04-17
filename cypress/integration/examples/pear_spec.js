
describe('Initial Page', () => {
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


describe.only('Adding New Reviews', () => {
  before(() => {
      cy.fixture('mockReviews.json')
      .then(reviewData => {
          cy.intercept('GET', 'http://localhost:3003/api/v1/reviews', reviewData)
      })
      // cy.intercept('PUT', 'http://localhost:3003/api/v1/reviews/accept/69/Jackson', )
      // })

      cy.intercept({
        method: 'PUT',
        url: 'http://localhost:3003/api/v1/reviews/accept/69/Jackson'
      },
        {
          statusCode: 201,
          body:
          [{"username":"JeffShepherd","summary":"this is a summary","email":"nazosnowboarder@yahoo.com","language":"Python","date":"02/24/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"active","reviewer":"Jackson","id":420},
          {"username":"jacksonmcguire","summary":"this is a summary","email":"lumbersexual@gmail.com","language":"JavaScript","date":"02/24/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"active","reviewer":"Jackson","id":69},
          {"username":"josharagon","summary":"this is a summary","email":"sucksquishbangblow@gmail.com","language":"C++","date":"02/24/21","repo":"https://github.com/josharagon/self-care-center","status":"complete","reviewer":"Jackson","id":42069},
          {"username":"owenhallgren","summary":"this is a summary","email":"owenhallgren69@hotmail.com","language":"C#","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"","reviewer":"","id":69420},
          {"username":"rdtho2525","summary":"this is a summary","email":"reggietheveggie@msn.com","language":"Ruby","date":"02/01/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"complete","reviewer":"Jackson","id":6969},
          {"username":"aemiers","summary":"this is a summary","email":"ispeakgerman@gmail.com","language":"Java","date":"06/15/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"","reviewer":"","id":420420},
          {"username":"ConnorAndersonLarson","summary":"this is a summary","email":"igivehousetours@gmail.com","language":"PHP","date":"09/18/21","repo":"https://github.com/josharagon/self-care-center","status":"","reviewer":"","id":123},
          {"username":"Shakikka","summary":"this is a summary","email":"owenhallgren69@hotmail.com","language":"Other","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"active","reviewer":"Jackson","id":69420247}
        ]
        });
    
      cy.visit('http://localhost:3000/') 
  })

  it('As a user, when I volunteer for a review, I will be presented with the requestor\'s contact info', () => {
    cy.get('.accept-button').first().click()
    cy.get('.review-button').click()   
    cy.get('#dashBoard').click()
    cy.get('td').contains('jacksonmcguire')
  })

})