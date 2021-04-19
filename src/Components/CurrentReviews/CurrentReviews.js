import React from 'react'
import './CurrentReviews.css'

const CurrentReviews = ( { state, finishReview, undoReview, cancelReview, deleteReview, sendEmail} ) => {
  const matchedReviews = state.openReviews.filter(review => review.reviewer === state.user && review.status === 'active')
  const reviewTable = matchedReviews.map(review => {
    return(
      <tr key={review.id}>
          <td>{review.date}</td>
          <td>{review.username}</td>
          <td><a href={review.repo} target='_blank' rel="noreferrer">{review.repo}</a></td>
          <td>{review.email}</td>
          <td><button title="complete and close this review request" className='complete-button dash-button' id={review.id} onClick={(e) => {finishReview(e); sendEmail('completed', e)}}>Complete</button></td>
          <td><button title="I am unable to complete this review" className='cancel-button dash-button' id={review.id} onClick={(e) => {cancelReview(e); sendEmail('canceled', e)}}>X</button></td>
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
          <td><button title="return request to my active queue" className='undo-button dash-button' id={review.id} onClick={(e) => undoReview(e)}>Undo</button></td>
      </tr>
    )
  })

  const myReviews = state.openReviews.filter(review => review.username === state.username && review.status === '')
  const completedRequestTable = myReviews.map(review => {
    return(
      <tr key={review.id}>
          <td>{review.date}</td>
          <td>{review.username}</td>
          <td><a href={review.repo} target='_blank' rel="noreferrer">{review.repo}</a></td>
          <td>{review.status || 'pending'}</td>
          <td><button title="delete this review request" className="dash-button" id={review.id} onClick={(e) => deleteReview(e)}>Delete</button></td>

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
           {!completedRequestTable.length && <tr className="empty-review-table"><td>no reviews available</td></tr>} 
           {completedRequestTable}
        </tbody>
      </table>
      </div>




      <div className='table-container'>
        <h1 className='table-header'>Active Reviews</h1>
        <table id='active'>
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
           {!reviewTable.length && <tr className="empty-review-table"><td>no reviews available</td></tr>}
           {reviewTable}
        </tbody>
      </table>
      </div>
      <div className='table-container'>
      <h1 className='table-header'>Completed Reviews</h1>
        <table id='completed'>
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
          {!completedReviewTable.length && <tr className="empty-review-table"><td>no reviews available</td></tr>}
          {completedReviewTable}
        </tbody>
      </table>
      </div>
      </>
    )
}

export default CurrentReviews;