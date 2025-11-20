import React, { useState } from 'react';
import Bell from './components/Bell';
import Result from './components/Result';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
    const [gameState, setGameState] = useState('idle'); // 'idle' | 'finished'

    const handleRing = () => {
        setGameState('finished');
    };

    return (
        <AnimatePresence mode="wait">
            {gameState === 'idle' && (
                <motion.div
                    key="bell"
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full"
                >
                    <Bell onRing={handleRing} />
                </motion.div>
            )}

            {gameState === 'finished' && (
                <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-full h-full"
                >
                    <Result />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default App;
