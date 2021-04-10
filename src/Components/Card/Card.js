import React from 'react';
import './Card.css';

const Card = () => {
    return (
        <article className='card'>
            <img src='https://avatars.githubusercontent.com/u/72821268?v=4' className='user-picture'></img>
            <p>username</p>
            <p>summary</p>
            <div className='card-specifics'>
                <p>Languages</p>
                <p>Date</p>
            </div>
        </article>
    )
}

export default Card;