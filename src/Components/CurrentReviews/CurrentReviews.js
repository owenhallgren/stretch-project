import React from 'react'
import './CurrentReviews.css'

const CurrentReviews = ( { state, finishReview, undoReview, cancelReview, deleteReview} ) => {
  const matchedReviews = state.openReviews.filter(review => review.reviewer === state.user && review.status === 'active')
  const reviewTable = matchedReviews.map(review => {
    return(
      <tr key={review.id}>
          <td>{review.date}</td>
          <td>{review.username}</td>
          <td><a href={review.repo} target='_blank' rel="noreferrer">{review.repo}</a></td>
          <td>{review.email}</td>
          <td><button className='complete-button' id={review.id} onClick={(e) => finishReview(e)}>Complete</button></td>
          <td><button className='cancel-button' id={review.id} onClick={(e) => cancelReview(e)}>X</button></td>
      </tr>
    )
  })

  const completedReviews = state.openReviews.filter(review => review.reviewer === state.user && review.status === 'complete')
  const completedReviewTable = completedReviews.map(review => {
    return(
      <tr key={review.id}>
          <td>{review.date}</td>
          <td>{review.username}</td>
          <td><a href={review.repo} target='_blank' rel="noreferrer">{review.repo}</a></td>
          <td>{review.email}</td>
          <td><button className='undo-button' id={review.id} onClick={(e) => undoReview(e)}>Undo</button></td>
      </tr>
    )
  })

  //below is new
  const myReviews = state.openReviews.filter(review => review.username === state.username && review.status === '')
  const completedRequestTable = myReviews.map(review => {
    return(
      <tr key={review.id}>
          <td>{review.date}</td>
          <td>{review.username}</td>
          <td><a href={review.repo} target='_blank' rel="noreferrer">{review.repo}</a></td>
          <td>{review.status || 'pending'}</td>
          <td><button id={review.id} onClick={(e) => deleteReview(e)}>Delete</button></td>

      </tr>
    )
  })



    return (
      <>
      <div className='table-container'>
        <h1 className='table-header'>My Requests</h1>
        <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Repo</th>
                <th>Status</th>
                <th></th>
        </tr>
        </thead>
        <tbody>
           {completedRequestTable && <tr className="empty-review-table"><td>no reviews available</td></tr>} 
        </tbody>
      </table>
      </div>




      <div className='table-container'>
        <h1 className='table-header'>Active Reviews</h1>
        <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Repo</th>
                <th>Email</th>
                <th></th>
                <th></th>
        </tr>
        </thead>
        <tbody>
           {reviewTable && <tr className="empty-review-table"><td>no reviews available</td></tr>}
        </tbody>
      </table>
      </div>
      <div className='table-container'>
      <h1 className='table-header'>Completed Reviews</h1>
        <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Repo</th>
                <th>Email</th>
                <th></th>
        </tr>
        </thead>
        <tbody>
           {completedReviewTable && <tr className="empty-review-table"><td>no reviews available</td></tr>}
        </tbody>
      </table>
      </div>
      </>
    )
}

export default CurrentReviews;