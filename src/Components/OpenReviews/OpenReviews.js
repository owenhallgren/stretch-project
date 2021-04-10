import React from 'react';
import Card from '../Card/Card';
import './OpenReviews.css';


const OpenReviews = ( {openReviews, addReview} ) => {
    const filteredReviews = openReviews.filter(review => !review.reviewer)
    const allReviews = filteredReviews.map(review => {
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
            <div className='filters'>
                <p>Date</p>
                <p>Language</p>
            </div>
            <section className='card-container'>
                {allReviews}
            </section>
        </div>
    )
}

export default OpenReviews;