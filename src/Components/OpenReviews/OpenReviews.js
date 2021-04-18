import React from 'react';
import Card from '../Card/Card';
import Form from '../Form/Form'
import './OpenReviews.css';


const OpenReviews = ( {filterValue, openReviews, addReview, filteredReviews, sortByLanguage, noFilteredReviews} ) => {
    const reviewsToMap = filteredReviews.length ? filteredReviews : openReviews
    const reviews = reviewsToMap.filter(review => !review.reviewer)
    const allReviews = reviews.map(review => {
        return (
            <Card
                username={review.username}
                summary={review.summary}
                language={review.language}
                date={review.date}
                id={review.id}
                key={review.id}
                addReview={addReview}
            />
        )
    })
    return (

        <div>
          <div className="header-container">
            <h2 className='open-review-header'>Open Review Requests</h2>
            <Form filterValue={filterValue} sortByLanguage={sortByLanguage} />
          </div>
              {noFilteredReviews && <p className="no-results-message">No reviews available for this language</p>}
            <section className='card-container'>
                {!noFilteredReviews && allReviews}
            </section>
        </div>
        
    )
}

export default OpenReviews;