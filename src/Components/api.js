
export const getAllReviews = (path) => {
  return fetch('http://localhost:3003/api/v1/reviews')
           .then((response) => response.json())
 }

 export const updateExistingData = (path, verb) => {
  return fetch(`http://localhost:3003/api/v1/reviews/${path}`, {method: `${verb}`})
           .then((response) => response.json())
 }
