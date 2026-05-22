import React, { useEffect } from 'react'

export const Home = () => {

    const [rotatingMessage, setRotatingMessage] = useSate(0);

    const careMsgs = [
        'Healing starts with conversation.',
        'Your wellbeing matters.',
        'Together we can overcome challenges',
        'Support is always available',
        'Prevention is better than cure',
        'Share your problems to know how to overcome them',
        'Better share ideas with your friend',
        'You are not alone,we are here for you',
        'Feel more comfortable and healthy.'
    ];

    useEffect(() => {

        const interval = setInterval(() => {
            setRotatingMessage((prev) => (prev + 1) % careMsgs.length);
        }, 5000);
        return () => clearInterval(interval);

    }, []);


    console.log("hello");


    













    return (
        <div>

        </div>
    )
}
