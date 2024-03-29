import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';


const InvitationPage = () => {
  /*
  const images = [cake1, cake2, cake3]; // Add more images as needed
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevImageIndex) => (prevImageIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
  
    return () => {
      clearInterval(intervalId); // Clean up on unmount
    };
  }, [images.length]);
*/

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/giftreservation');
  };
  //style={{ backgroundImage: `url(${images[currentImageIndex]})
  return (
    <div className="invitation-page">
        <div className="invitation-content-container">
            <div className="invitation-button-container">
                <button onClick={handleButtonClick}>Lahjalistalle</button>
            </div>
            <div className="invitation-text-container">
                <h1 className='invitation-title'>Tervetuloa Adessan 1-vuotis syntymäpäiväjuhliin</h1>
                <p>lauantaina 23.3. klo : 15:00</p>
                <p>Tervaskatu 12 A 2</p>
                <p>Ilmoitathan, jos et pääse tulemaan</p>
            </div>
        </div>
    </div>
  );
};

export default InvitationPage;