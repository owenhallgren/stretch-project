import React from 'react';
import './Card.css';

const Card = ( {username, summary, email, language, date} ) => {
    return (
        <article className='card'>
            <img src={`https://avatars.githubusercontent.com/${username}`} className='user-picture'></img>
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