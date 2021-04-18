
export const getAllReviews = () => {
  return fetch('http://localhost:3003/api/v1/reviews')
           .then((response) => response.json())
 }

 export const updateExistingData = (path, verb) => {
  return fetch(`http://localhost:3003/api/v1/reviews/${path}`, {method: `${verb}`})
           .then((response) => response.json())
 }

 export const postNewReview = (request) => {
   return fetch(`http://localhost:3003/api/v1/reviews`, {
            method: 'POST',headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({
              date: request.date,
              email: request.email,
              language: request.language, 
              repo: request.repo,
              reviewer: request.reviewer,
              status: request.status,
              summary: request.summary, 
              username: request.username
            })
          })
          .then((response) => response.json())
 }