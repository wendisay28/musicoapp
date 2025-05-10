import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
export const SwipeCard: React.FC = ({ item, onSwipe, onViewDetails, showDetails }) => {
    const [isDragging, setIsDragging] = useState(false);
    const cardRef = useRef(null);
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });
    const handleDragEnd: React.FC = (event, info) => {
        const threshold = 100;
        if (Math.abs(info.offset.x) > threshold) {
            onSwipe(info.offset.x > 0 ? 'right' : 'left');
        }
        else {
            setCardPosition({ x: 0, y: 0 });
        }
        setIsDragging(false);
    };
    const handleDragStart: React.FC = () => {
        setIsDragging(true);
    };
    const handleViewDetails: React.FC = () => {
        onViewDetails();
    };
    const renderContent: React.FC = () => {
        if ('name' in item) {
            // Es un usuario (artista o lugar)
            return (_jsxs("div", { className: "relative h-full w-full", children: [_jsx("img", { src: item.profileImage || '/default-profile.jpg', alt: item.name, className: "w-full h-full object-cover rounded-lg" }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white", children: [_jsx("h3", { className: "text-xl font-bold", children: item.name }), _jsx("p", { className: "text-sm", children: item.description })] })] }));
        }
        else if ('title' in item) {
            // Es un evento
            return (_jsxs("div", { className: "relative h-full w-full", children: [_jsx("img", { src: item.images?.[0] || '/default-event.jpg', alt: item.title, className: "w-full h-full object-cover rounded-lg" }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white", children: [_jsx("h3", { className: "text-xl font-bold", children: item.title }), _jsx("p", { className: "text-sm", children: item.description }), _jsx("p", { className: "text-sm", children: new Date(item.startDate).toLocaleDateString() })] })] }));
        }
        else {
            // Es un servicio
            return (_jsxs("div", { className: "relative h-full w-full", children: [_jsx("img", { src: item.images?.[0] || '/default-service.jpg', alt: item.name, className: "w-full h-full object-cover rounded-lg" }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white", children: [_jsx("h3", { className: "text-xl font-bold", children: item.name }), _jsx("p", { className: "text-sm", children: item.description }), _jsxs("p", { className: "text-sm", children: ["$", item.price] })] })] }));
        }
    };
    return (_jsxs("div", { className: "relative h-full w-full", children: [_jsx(motion.div, { ref: cardRef, drag: "x", dragConstraints: { left: 0, right: 0 }, onDragStart: handleDragStart, onDragEnd: handleDragEnd, animate: cardPosition, className: "absolute inset-0 cursor-grab active:cursor-grabbing", children: renderContent() }), !isDragging && (_jsxs("div", { className: "absolute bottom-4 left-0 right-0 flex justify-center space-x-4", children: [_jsx("button", { onClick: () => onSwipe('left'), className: "p-4 bg-white rounded-full shadow-lg hover:bg-gray-100", children: _jsx("svg", { className: "w-6 h-6 text-red-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), _jsx("button", { onClick: handleViewDetails, className: "p-4 bg-white rounded-full shadow-lg hover:bg-gray-100", children: _jsxs("svg", { className: "w-6 h-6 text-blue-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }), _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" })] }) }), _jsx("button", { onClick: () => onSwipe('right'), className: "p-4 bg-white rounded-full shadow-lg hover:bg-gray-100", children: _jsx("svg", { className: "w-6 h-6 text-green-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" }) }) })] }))] }));
};
