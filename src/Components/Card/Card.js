import React from 'react';
import './Card.css';

const Card = ( {username, summary, email, language, date, id, addReview} ) => {
    return (
        <article className='card'>
          <div className='card-top'>
            <img src={`https://avatars.githubusercontent.com/${username}`} className='user-picture' alt='github profile'></img>
            <button id={id} className='review-button' onClick = {(e) => addReview(e.target.id)}>Review</button>
          </div>
            <p>Username: {username}</p>
            <p>Summary: {summary}</p>
            <div className='card-specifics'>
                <p>{language}</p>
                <p>{date}</p>
            </div>
        </article>
    )
}

export default Card;