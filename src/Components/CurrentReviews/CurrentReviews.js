import React from 'react'
import './CurrentReviews.css'

const CurrentReviews = ( {state} ) => {
  const matchedReviews = state.openReviews.filter(review => review.reviewer === state.user && !review.status)
  const reviewTable = matchedReviews.map(review => {
    return(
      <tr key={review.id}>
          <td>{review.username}</td>
          <td>{review.date}</td>
          <td><a href={review.repo} target='_blank' rel="noreferrer">{review.repo}</a></td>
          <td>{review.email}</td>
          <td><button className='complete-button'>Complete</button></td>
      </tr>
    )
  })

  const completedReviews = state.openReviews.filter(review => review.reviewer === state.user && review.status === 'complete')
  const completedReviewTable = completedReviews.map(review => {
    return(
      <tr key={review.id}>
          <td>{review.username}</td>
          <td>{review.date}</td>
          <td><a href={review.repo} target='_blank' rel="noreferrer">{review.repo}</a></td>
          <td>{review.email}</td>
          <td>Completed</td>
      </tr>
    )
  })

    return (
      <>
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
           {completedReviewTable}
        </tbody>
      </table>
      </div>
      </>
    )
}

export default CurrentReviews;