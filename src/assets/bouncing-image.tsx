import React, {useEffect, useState} from 'react';

function BouncingImage({src}) {
    const [position, setPosition] = useState({top: 50, left: 50});
    const [velocity, setVelocity] = useState({x: 2, y: 2});

    useEffect(() => {
        const moveImage = () => {
            setPosition((prev) => {
                const newTop = prev.top + velocity.y;
                const newLeft = prev.left + velocity.x;

                const containerHeight = window.innerHeight - 200; // Subtracting image height
                const containerWidth = window.innerWidth - 300; // Subtracting image width

                let newVelocity = {...velocity};

                if (newTop <= 0 || newTop >= containerHeight) {
                    newVelocity.y = -newVelocity.y;
                }

                if (newLeft <= 0 || newLeft >= containerWidth) {
                    newVelocity.x = -newVelocity.x;
                }

                setVelocity(newVelocity);

                return {
                    top: newTop,
                    left: newLeft,
                };
            });
        };

        const intervalId = setInterval(moveImage, 20);

        return () => clearInterval(intervalId);
    }, [velocity]);

    return (
        <img
            src={src}
            alt={'Bouncing Image'}
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                width: 300,
                height: 200,
            }}
        />
    );
}

export default BouncingImage;