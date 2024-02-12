import React from 'react';
import './GiftButton.css';

const GiftButton = ({ gift, handleClick, handleConfirm, handleCancel, confirmingGift, adminView, handleDelete }) => (
  <div className='gift-item'>
    <tr onClick={(e) => {e.stopPropagation(); handleClick(gift);}}>
      <th className='gift-name'>
        <span className='lock'>{gift.reserved ? '🔒' : '🔓'}</span>
        {gift.name}</th>
      <th className='confirmation-button'>
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
      </th>
      <th className='gift-image'>
        <img src={`http://192.168.1.194:3001/uploads/${gift.imageUrl}`} alt={gift.name} className='gift-image'/>
      </th>
    </tr>
  </div>
);

export default GiftButton;

/*

  <div className='gift-button' onClick={(e) => {e.stopPropagation(); handleClick(gift);}}>
    <span className='lock'>{gift.reserved ? '🔒' : '🔓'}</span>
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
    <img src={`http://192.168.1.194:3001/uploads/${gift.imageUrl}`} alt={gift.name} className='gift-image'/>
  </div>

*/