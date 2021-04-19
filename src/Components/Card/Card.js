import React from 'react';
import './Card.css';
import Modal from '../Modal/Modal'

const Card = ( {username, summary, language, date, id, addReview, sendEmail} ) => {
  let path;
  
  if(language === 'C#') {
    path = `./assets/Csharp.png`
  } else {
    path = `./assets/${language}.png`
  }

  return (
        <article className='card'>
          <div className='card-top'>
            <img src={`https://avatars.githubusercontent.com/${username}`} className='user-picture' alt='github profile'></img>
            
            <Modal addReview={addReview} id={id} sendEmail={sendEmail}/>
          </div>
            <p><strong>Username:</strong> {username}</p>
            <p><strong>Summary:</strong> {summary}</p>
            <div className='card-specifics'>
                <p><img src={path} alt={language}/> {language}</p>
                <p>{date}</p>
            </div>
        </article>
    )
}

export default Card;