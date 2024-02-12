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
                const response = await fetch('http://192.168.1.194:3001/gifts');
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
        const response = await fetch(`http://192.168.1.194:3001/gifts/${confirmingGift.id}`, {
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
        const response = await fetch(`http://192.168.1.194:3001/gifts/${gift.id}`, {
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
        <>
            <div className="container">
                <div className='container-items'>
                    {gifts && gifts.map((gift, index) => (
                    <div key={index}>
                        <GiftButton gift={gift} handleClick={handleGiftClick} handleConfirm={handleConfirm} handleCancel={handleCancel} confirmingGift={confirmingGift} />
                    </div>
                    ))}
                    <BackButton to="/" />
                </div>
            

            </div>
        </>
    )
}

export default GiftReservation;