import React from 'react'
import './CurrentReviews.css'

const CurrentReviews = ( {state} ) => {
  const matchedReviews = state.openReviews.filter(review => review.reviewer === state.user )
  const reviewTable = matchedReviews.map(review => {
    return(
      <tr>
          <td>{review.username}</td>
          <td>{review.date}</td>
          <td>{review.repo}</td>
          <td>{review.email}</td>
          <td>{review.status}</td>
      </tr>
    )
  })

    return (
      <div className='table-container'>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Repo</th>
                <th>Email</th>
                <th>Status</th>
                <th></th>
        </tr>
        </thead>
        <tbody>
           {reviewTable}
        </tbody>
      </table>
      </div>
      
    )
}

export default CurrentReviews