import React from 'react';
import Card from '../Card/Card';
import Form from '../Form/Form'
import './OpenReviews.css';


const OpenReviews = ( {openReviews, addReview, filteredReviews} ) => {
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
            <Form />
                        {/* <div className='filters'>
                <p>Date</p>
                <p>Language</p>
            </div> */}
            <section className='card-container'>
                {allReviews}
            </section>
        </div>
    )
}

export default OpenReviews;