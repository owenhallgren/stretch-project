import React from 'react'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css';

const Modal = ({addReview, id}) => { 
  return (
    <Popup
    trigger={<button className="button"> Open Modal </button>}
    modal
    nested
    >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="content">
          To add this review to your dashboard, click the confirm button below. If you confirm, the review will be added along with the associated repo and contact info. After accepting, please reach out to the requestor using the contact info listed in your dashboard.   
        <br />
        <br />
        <br />
          Thank you!
        </div>
        <div className="actions">
          <button id={id} className='review-button' onClick = {(e) => addReview(e.target.id)}> 
          Accept Review
          </button>
        </div>
      </div>
    )}
  </Popup>
  );
}

export default Modal

