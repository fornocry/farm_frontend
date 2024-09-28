import React, { useState } from 'react';

interface PressableProps {
    onPress: () => void; // Function to call on press
    children: React.ReactNode; // Content to render inside the component
}

const Pressable: React.FC<PressableProps> = ({ onPress, children }) => {
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const handlePress = () => {
        const timeout = setTimeout(() => {
            if (onPress) {
                onPress(); // Call the function passed as a prop
            }
        }, 500);
        setTimer(timeout);
    };

    const handleRelease = () => {
        if (timer) {
            clearTimeout(timer);
        }
    };

    return (
        <div
            onMouseDown={handlePress}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            onTouchStart={handlePress}
            onTouchEnd={handleRelease}
        >
            {children}
        </div>
    );
};

export default Pressable;
