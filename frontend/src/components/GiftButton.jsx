import React from 'react';
import './GiftButton.css';

const GiftButton = ({ gift, handleClick, handleConfirm, handleCancel, confirmingGift, adminView, handleDelete }) => (
  <div className='gift-button' onClick={(e) => {e.stopPropagation(); handleClick(gift);}}>
    <span>{gift.reserved ? '🔒' : '🔓'}</span>
    <h2>{gift.name}</h2>
    {confirmingGift && confirmingGift.id === gift.id && (
      <>
        <button onClick={(e) => {e.stopPropagation(); handleConfirm();}}>✔️</button>
        <button onClick={(e) => {e.stopPropagation(); handleCancel(gift);}}>❌</button>
      </>
    )}
    {adminView && (
      <>
        <button onClick={(e) => {e.stopPropagation(); handleDelete(gift);}}>❌</button>
      </>
    )}
    <img src={`http://192.168.1.3:3001/uploads/${gift.imageUrl}`} alt={gift.name} className='gift-image'/>
  </div>
);

export default GiftButton;