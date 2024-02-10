import { useState, useEffect } from 'react';

import GiftButton from '../../components/GiftButton';
import BackButton from '../../components/BackButton';

function AdminPage() {
    const [gifts, setGifts] = useState(null);
    const [selectedGift, setSelectedGift] = useState(null);
    const [newGift, setNewGift] = useState({ name: '', image: null, reserved: false });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.3:3001/gifts');
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

    const handleClick = async (gift) => {
        const response = await fetch(`http://192.168.1.3:3001/gifts/${gift.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reserved: !gift.reserved }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const updatedGift = await response.json();
        // Update the gifts state with the updated gift
        setGifts(gifts.map(g => g.id === updatedGift.id ? updatedGift : g));
        setSelectedGift(null);
    };

    const handleDelete = async (gift) => {
        const response = await fetch(`http://192.168.1.3:3001/gifts/${gift.id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Remove the deleted gift from the gifts state
        setGifts(gifts.filter(g => g.id !== gift.id));
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', newGift.name);
        formData.append('image', newGift.image);

        const response = await fetch('http://192.168.1.3:3001/gifts', {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const addedGift = await response.json();
        // Add the new gift to the gifts state
        setGifts([...gifts, addedGift]);
        setNewGift({ name: '', image: null, reserved: false });
    };

    const handleCancel = async (gift) => {
        const response = await fetch(`http://192.168.1.3:3001/gifts/${gift.id}`, {
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
    };


    return (
        <>
            <BackButton to="/" />
            <div>
                <input type="text" value={newGift.name} onChange={e => setNewGift({ ...newGift, name: e.target.value })} placeholder="Gift name" />
                <input type="file" onChange={e => setNewGift({ ...newGift, image: e.target.files[0] })} />
                <button onClick={handleAdd}>Add Gift</button>
            </div>
            {gifts && gifts.map((gift, index) => (
                <div key={index}>
                    <GiftButton gift={gift} handleClick={handleClick} handleDelete={handleDelete} handleCancel={handleCancel} adminView={true} />
                </div>
            ))}
        </>
    )
}

export default AdminPage;