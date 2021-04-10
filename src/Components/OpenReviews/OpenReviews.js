import React from 'react';
import Card from '../Card/Card';
import './OpenReviews.css';


const OpenReviews = ( {openReviews} ) => {
    const allReviews = openReviews.map(review => {
        return (
            <Card
                username={review.username}
                summary={review.summary}
                language={review.language}
                date={review.date}
            />
        )
    })
    return (
        <body>
            <h1 className='open-review-header'>Open Review Requests</h1>
            <div className='filters'>
                <p>Date</p>
                <p>Language</p>
            </div>
            <section className='card-container'>
                {allReviews}
            </section>
        </body>
    )
}

export default OpenReviews;