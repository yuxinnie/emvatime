import React, { useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import bellImage from '../assets/bell_v2.png';
import ropeImage from '../assets/rope.png';
import bellSound from '../assets/bell-ring.m4a';

const Bell = ({ onRing }) => {
    const [isRinging, setIsRinging] = useState(false);

    // Motion values for drag
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for return animation
    const springConfig = { damping: 10, stiffness: 100, mass: 1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    // Rotation based on movement to simulate swinging
    const rotate = useTransform(xSpring, [-100, 100], [-45, 45]);

    const playSound = () => {
        try {
            const audio = new Audio(bellSound);
            audio.volume = 0.5;
            audio.play().catch(e => console.log("Audio play failed (user interaction needed or file missing):", e));
        } catch (e) {
            console.error("Audio error:", e);
        }
    };

    const handleDragEnd = (_, info) => {
        const dragDistance = Math.sqrt(info.offset.x ** 2 + info.offset.y ** 2);

        // Trigger ring if dragged far enough
        if (dragDistance > 50 && !isRinging) {
            setIsRinging(true);
            playSound();

            // Wait for a bit of swinging before transitioning
            setTimeout(() => {
                onRing();
            }, 2000);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white overflow-hidden relative">
            {/* Optional subtle background texture or gradient to make it look less plain, but keeping it white for blend mode */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100 z-0" />

            <motion.div
                style={{ x: xSpring, y: ySpring, rotate, cursor: 'grab' }}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: 'grabbing' }}
                className="z-10 relative flex flex-col items-center"
            >
                {/* Rope visual - Thicker hemp/cotton texture, overlapping with bell */}
                {/* Moved to z-20 to sit ON TOP of the bell image to avoid being hidden by the bell's white background/mask */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 w-3 origin-bottom z-20"
                    style={{
                        height: '1000px',
                        // Adjust overlap to sit nicely on the handle
                        bottom: 'calc(100% - 50px)',
                        // Hemp rope texture: lighter beige/brown mix with twist
                        backgroundImage: 'repeating-linear-gradient(45deg, #D2B48C 0px, #D2B48C 4px, #8B4513 5px, #8B4513 6px)',
                        boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.2), 2px 0 4px rgba(0,0,0,0.3)',
                        borderRadius: '2px'
                    }}
                />
                {/* Bell Image - using mask to hide square edges */}
                <div className="relative z-10">
                    <img
                        src={bellImage}
                        alt="Christmas Bell"
                        className="w-64 h-auto select-none pointer-events-none"
                        style={{
                            // Mask the edges to hide the square box
                            maskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 70%)',
                            // Blend mode to help the inner white match the background
                            mixBlendMode: 'multiply'
                        }}
                        draggable="false"
                    />
                </div>
            </motion.div>

            <div className="absolute bottom-10 text-gray-400 text-sm animate-pulse font-light tracking-widest uppercase">
                Pull to ring
            </div>
        </div>
    );
};

export default Bell;
