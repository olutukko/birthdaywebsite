import { useState, useEffect } from 'react';
import './App.css';
import GiftButton from '../../components/GiftButton';
import BackButton from '../../components/BackButton';

function GiftReservation() {
    const [gifts, setGifts] = useState(null);
    const [confirmingGift, setConfirmingGift] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://lahjasivu-backend.fly.dev/gifts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleGiftClick = (gift) => {
        if (!gift.reserved) {
            setConfirmingGift(gift);
        }
    };

    const handleConfirm = async () => {
        const response = await fetch(`https://lahjasivu-backend.fly.dev/gifts/${confirmingGift.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reserved: true }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const updatedGift = await response.json();
        // Update the gifts state with the updated gift
        setGifts(gifts.map(g => g.id === updatedGift.id ? updatedGift : g));
        setConfirmingGift(null);
    };

    const handleCancel = async (gift) => {
        const response = await fetch(`https://lahjasivu-backend.fly.dev/gifts/${gift.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reserved: false }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const updatedGift = await response.json();
        // Update the gifts state with the updated gift
        setGifts(gifts.map(g => g.id === updatedGift.id ? updatedGift : g));
        setConfirmingGift(null);
    };


    return (
        <div className="gift-container">
            <div className="back-button-container">
                <BackButton to="/" className="back-button"/>
            </div>
            <div className='gift-list-container'>
                <div className='gift-list'>
                    {gifts && gifts.map((gift, index) => (
                    <div key={index} className="gift-item">
                        <GiftButton gift={gift} handleClick={handleGiftClick} handleConfirm={handleConfirm} handleCancel={handleCancel} confirmingGift={confirmingGift} />
                    </div>
                    ))}
                </div>
            </div>
            <div className="text-container">
                <p>
                    Tai jos et halua valita noista mitään niin nämä ovat aina tervetulleita ja lahjoja 🙂<br />
                    Kesävaatteita 80 koossa<br />
                    Vaippoja<br />
                    Naksuja<br />
                    Kaikenlaiset ääntä pitävät lelut<br />
                    Rahaa Adessan säästöpossuun
                </p>
            </div>
        </div>
    );
}

export default GiftReservation;