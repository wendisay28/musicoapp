import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Card } from './card';
import { cn } from '@/lib/utils';
/**
 * Card que se puede deslizar horizontalmente
 * @component
 */
export function SwipeableCard (props: any){ children, onSwipeRight, onSwipeLeft, swipeThreshold = 100, className }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    const handleDragEnd: React.FC = (_, info) => {
        const swipe = info.offset.x;
        if (Math.abs(swipe) >= swipeThreshold) {
            if (swipe > 0 && onSwipeRight) {
                onSwipeRight();
            }
            else if (swipe < 0 && onSwipeLeft) {
                onSwipeLeft();
            }
        }
    };
    return (_jsx(motion.div, { style: {
            x,
            rotate,
            opacity
        }, drag: "x", dragConstraints: { left: 0, right: 0 }, onDragEnd: handleDragEnd, whileTap: { cursor: 'grabbing' }, className: cn('cursor-grab touch-none select-none', className), children: _jsxs(Card, { className: "relative", children: [children, _jsx("div", { className: cn('absolute inset-0 flex items-center justify-center text-4xl font-bold pointer-events-none', 'opacity-0 transition-opacity duration-200', 'bg-green-500/20 text-green-500', x.get() > 50 && 'opacity-100'), children: "LIKE" }), _jsx("div", { className: cn('absolute inset-0 flex items-center justify-center text-4xl font-bold pointer-events-none', 'opacity-0 transition-opacity duration-200', 'bg-red-500/20 text-red-500', x.get() < -50 && 'opacity-100'), children: "NOPE" })] }) }));
}
