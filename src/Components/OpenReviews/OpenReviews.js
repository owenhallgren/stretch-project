import React from 'react';
import Card from '../Card/Card';
import Form from '../Form/Form'
import './OpenReviews.css';


const OpenReviews = ( {openReviews, addReview, filteredReviews, sortByLanguage, noFilteredReviews} ) => {
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
            <h1 className='open-review-header'>Open Review Requests</h1>
            <Form sortByLanguage={sortByLanguage} />

              {noFilteredReviews && <p>no reviews</p>}
            <section className='card-container'>
                {!noFilteredReviews && allReviews}
            </section>
        </div>
        
    )
}

export default OpenReviews;