
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
    cy.get('H2')
    .contains('Open Review Requests')
  })

  it('As a user, when I select a filter value, I will only be shown requests relevant to that filter', () => {
    cy.get('#languageFilter').select('Java')
    cy.get('.card-container')
    .children()
    .should('have.length', 1)
  })

})


describe('Reviews', () => {
  before(() => {
      cy.fixture('mockReviews.json')
      .then(reviewData => {
          cy.intercept('GET', 'http://localhost:3003/api/v1/reviews', reviewData)
      })


      cy.intercept({
        method: 'PUT',
        url: 'http://localhost:3003/api/v1/reviews/accept/22/Jackson'
      },
        {
          statusCode: 200,
          body:
          [{"username":"JeffShepherd","summary":"this is a summary","email":"mynamejeff@yahoo.com","language":"Python","date":"02/24/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"active","reviewer":"Jackson","id":1},
          {"username":"jacksonmcguire","summary":"this is a summary","email":"lumberjack@gmail.com","language":"JavaScript","date":"02/24/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"active","reviewer":"Jackson","id":22},
          {"username":"josharagon","summary":"this is a summary","email":"joshy@gmail.com","language":"C++","date":"02/24/21","repo":"https://github.com/josharagon/self-care-center","status":"complete","reviewer":"Jackson","id":333},
          {"username":"owenhallgren","summary":"this is a summary","email":"owenhallgren@hotmail.com","language":"C#","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"","reviewer":"","id":4444},
          {"username":"rdtho2525","summary":"this is a summary","email":"reggieveggie@msn.com","language":"Ruby","date":"02/01/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"complete","reviewer":"Jackson","id":5050},
          {"username":"aemiers","summary":"this is a summary","email":"ispeakgerman@gmail.com","language":"Java","date":"06/15/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"","reviewer":"","id":6060},
          {"username":"ConnorAndersonLarson","summary":"this is a summary","email":"cal@gmail.com","language":"PHP","date":"09/18/21","repo":"https://github.com/josharagon/self-care-center","status":"","reviewer":"","id":123},
          {"username":"Shakikka","summary":"this is a summary","email":"shakika@hotmail.com","language":"Other","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"active","reviewer":"Jackson","id":777}
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

  it('As a user, when I click complete on an open review, the review will appear in my completed table view', () => { 
    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3003/api/v1/reviews/complete/777'
    },
      {
        statusCode: 200,
        body:
        [{"username":"JeffShepherd","summary":"this is a summary","email":"mynamejeff@yahoo.com","language":"Python","date":"02/24/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"active","reviewer":"Jackson","id":1},
        {"username":"jacksonmcguire","summary":"this is a summary","email":"lumberjack@gmail.com","language":"JavaScript","date":"02/24/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"active","reviewer":"Jackson","id":22},
        {"username":"josharagon","summary":"this is a summary","email":"joshy@gmail.com","language":"C++","date":"02/24/21","repo":"https://github.com/josharagon/self-care-center","status":"complete","reviewer":"Jackson","id":333},
        {"username":"owenhallgren","summary":"this is a summary","email":"owenhallgren@hotmail.com","language":"C#","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"","reviewer":"","id":4444},
        {"username":"rdtho2525","summary":"this is a summary","email":"reggieveggie@msn.com","language":"Ruby","date":"02/01/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"complete","reviewer":"Jackson","id":5050},
        {"username":"aemiers","summary":"this is a summary","email":"ispeakgerman@gmail.com","language":"Java","date":"06/15/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"","reviewer":"","id":6060},
        {"username":"ConnorAndersonLarson","summary":"this is a summary","email":"cal@gmail.com","language":"PHP","date":"09/18/21","repo":"https://github.com/josharagon/self-care-center","status":"","reviewer":"","id":123},
        {"username":"Shakikka","summary":"this is a summary","email":"shakika@hotmail.com","language":"Other","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"complete","reviewer":"Jackson","id":777}
      ]
      });
    cy.get('#777').click()
    cy.get('#active').find('tr').its('length').should('eq', 3)
    cy.get('#completed').find('tr').its('length').should('eq', 4)
    
  })

  it('As a user, when I click undo on a completed review, the review will be moved back to my open reviews', () => { 
    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3003/api/v1/reviews/undo/777'
    },
      {
        statusCode: 201,
        body:
        [{"username":"JeffShepherd","summary":"this is a summary","email":"mynamejeff@yahoo.com","language":"Python","date":"02/24/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"active","reviewer":"Jackson","id":1},
        {"username":"jacksonmcguire","summary":"this is a summary","email":"lumberjack@gmail.com","language":"JavaScript","date":"02/24/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"active","reviewer":"Jackson","id":22},
        {"username":"josharagon","summary":"this is a summary","email":"joshy@gmail.com","language":"C++","date":"02/24/21","repo":"https://github.com/josharagon/self-care-center","status":"complete","reviewer":"Jackson","id":333},
        {"username":"owenhallgren","summary":"this is a summary","email":"owenhallgren@hotmail.com","language":"C#","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"","reviewer":"","id":4444},
        {"username":"rdtho2525","summary":"this is a summary","email":"reggieveggie@msn.com","language":"Ruby","date":"02/01/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"complete","reviewer":"Jackson","id":5050},
        {"username":"aemiers","summary":"this is a summary","email":"ispeakgerman@gmail.com","language":"Java","date":"06/15/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"","reviewer":"","id":6060},
        {"username":"ConnorAndersonLarson","summary":"this is a summary","email":"cal@gmail.com","language":"PHP","date":"09/18/21","repo":"https://github.com/josharagon/self-care-center","status":"","reviewer":"","id":123},
        {"username":"Shakikka","summary":"this is a summary","email":"shakika@hotmail.com","language":"Other","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"active","reviewer":"Jackson","id":777}
      ]
      });
    cy.get('#777').click()
    cy.get('#active').find('tr').its('length').should('eq', 4)
    cy.get('#completed').find('tr').its('length').should('eq', 3)  
  })

  it('As a user, when I click undo on a completed review, the review will be moved back to my open reviews', () => { 
    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3003/api/v1/reviews/cancel/1'
    },
      {
        statusCode: 201,
        body:
        [{"username":"JeffShepherd","summary":"this is a summary","email":"mynamejeff@yahoo.com","language":"Python","date":"02/24/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"","reviewer":"","id":1},
        {"username":"jacksonmcguire","summary":"this is a summary","email":"lumberjack@gmail.com","language":"JavaScript","date":"02/24/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"active","reviewer":"Jackson","id":22},
        {"username":"josharagon","summary":"this is a summary","email":"joshy@gmail.com","language":"C++","date":"02/24/21","repo":"https://github.com/josharagon/self-care-center","status":"complete","reviewer":"Jackson","id":333},
        {"username":"owenhallgren","summary":"this is a summary","email":"owenhallgren@hotmail.com","language":"C#","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"","reviewer":"","id":4444},
        {"username":"rdtho2525","summary":"this is a summary","email":"reggieveggie@msn.com","language":"Ruby","date":"02/01/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"complete","reviewer":"Jackson","id":5050},
        {"username":"aemiers","summary":"this is a summary","email":"ispeakgerman@gmail.com","language":"Java","date":"06/15/21","repo":"https://github.com/Jacksonmcguire/intention-timer","status":"","reviewer":"","id":6060},
        {"username":"ConnorAndersonLarson","summary":"this is a summary","email":"cal@gmail.com","language":"PHP","date":"09/18/21","repo":"https://github.com/josharagon/self-care-center","status":"","reviewer":"","id":123},
        {"username":"Shakikka","summary":"this is a summary","email":"shakika@hotmail.com","language":"Other","date":"02/24/21","repo":"https://github.com/owenhallgren/js-fun-at-the-library","status":"active","reviewer":"Jackson","id":777}
      ]
      });
    cy.get('#1.cancel-button').click()
    cy.get('#home').click()
    cy.get('.card-container')
    .children()
    .should('have.length', 4)
  })

})


describe('Posting a Review Request', () => {
  before(() => {

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3003/api/v1/reviews'
    },
      {
        statusCode: 200,
        body:
        [
        {"username":"LumberJackJoe","summary":"I need help!","email":"lumberjackjoe@hotmail.com","language":"Other","date":"02/24/21","repo":"github.com/Joemama","status":"","reviewer":"","id":123456}
      ]
      });

    cy.fixture('mockReviews.json')
    .then(reviewData => {
        cy.intercept('GET', 'http://localhost:3003/api/v1/reviews', reviewData)
    })
    cy.visit('http://localhost:3000/') 
})

  it('Can post a new review request' , () => {
    
    cy.get('#addReq').click()
    
    cy.get('select').select('Java')

    cy.get('input').type('github.com/Joemama')

    cy.get('textarea').type('I need help!')

    cy.get('button').last().click()

    cy.get('#home').click()

    cy.get('.card-container')
    .children()
    .should('have.length', 5)
  })
})

describe('Sad Paths', () => {
  before(() => {
    cy.fixture('mockReviews.json')
    .then(reviewData => {
        cy.intercept('GET', 'http://localhost:3003/api/v1/reviews', reviewData)
    })
    cy.visit('http://localhost:3000/') 
  })

  it('Should show an appropriate message if no requests are available ina searched langauge', () => {
    cy.get('#languageFilter').select('C')
    cy.get('.no-results-message').contains('No reviews available')
  })

  it('Should show an appropriate message if any of the tables have no data', () => {
    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3003/api/v1/reviews/cancel/1'
    },
      {
        statusCode: 200,
        body:
        [{"username":"JeffShepherd","summary":"this is a summary","email":"mynamejeff@yahoo.com","language":"Python","date":"02/24/21","repo":"https://github.com/JeffShepherd/Rancid-Tomatillos","status":"","reviewer":"","id":1}
      ]
      });
    cy.get('#dashBoard').click()
    cy.get('#1.cancel-button').click()
    cy.get('td').contains('no reviews')
  })

  it('If app fails to fetch data on load, user will recieve an appropriate error', () => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:3003/api/v1/reviews'
    },
      {
        statusCode: 500,
        body:''
      });
      cy.visit('http://localhost:3000')
      cy.get('.message').contains('error')
  })

  it.only('If app fails to accept a review, user will recieve an appropriate error', () => {
    cy.intercept({
      method: 'PUT',
      url: 'http://localhost:3003/api/v1/reviews/accept/123/Jackson'
    },
      {
        statusCode: 500,
        body:''
      });
      cy.visit('http://localhost:3000')
      cy.get('.accept-button').last().click()
      cy.get('#123').click()
      cy.get('.message').contains('error')
  })


})