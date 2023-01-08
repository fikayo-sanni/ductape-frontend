import React, { useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

export const Loading: React.FC = () => {
    return (
        <div>
            <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_qjosmr4w.json"
                style={{ width: '200px' }}
            />
        </div>
    );
};

export default Loading;
