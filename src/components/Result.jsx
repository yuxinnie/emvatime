```javascript
import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/background.png';

const Result = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 opacity-80"
                style={{
                    backgroundImage: `url(${ backgroundImage })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Overlay Content */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.8, bounce: 0.5 }}
                className="z-10 text-center p-8 rounded-2xl backdrop-blur-sm bg-black/30 border border-white/10 shadow-2xl"
            >
                <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-lg font-sans tracking-tight">
                    emva 时间到！
                </h1>
            </motion.div>

            {/* Floating Particles/Confetti (Simple CSS animation) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full mix-blend-screen animate-pulse"
                        style={{
                            left: `${ Math.random() * 100 }% `,
                            top: `${ Math.random() * 100 }% `,
                            width: `${ Math.random() * 20 + 5 } px`,
                            height: `${ Math.random() * 20 + 5 } px`,
                            backgroundColor: `hsl(${ Math.random() * 360 }, 100 %, 50 %)`,
                            animationDelay: `${ Math.random() * 2 } s`,
                            animationDuration: `${ Math.random() * 3 + 2 } s`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Result;
