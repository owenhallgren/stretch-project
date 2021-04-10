import React from 'react';
import Card from '../Card/Card';
import './OpenReviews.css';


const OpenReviews = () => {
    return (
        <body>
            <h1 className='open-review-header'>Open Review Requests</h1>
            <div className='filters'>
                <p>Date</p>
                <p>Language</p>
            </div>
            <section className='card-container'>
                <Card />
                <Card />
                <Card />
                <Card />
            </section>
        </body>
    )
}

export default OpenReviews;