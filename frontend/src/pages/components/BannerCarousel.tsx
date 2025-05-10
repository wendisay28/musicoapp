import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/features/shared/components/ui/carousel';
import { Card, CardContent } from '@/features/shared/components/ui/card';
import { cn } from '@/lib/utils';
export function BannerCarousel (props: any){ banners, className }) {
    return (_jsxs(Carousel, { className: cn('w-full', className), children: [_jsx(CarouselContent, { children: banners.map((banner) => (_jsx(CarouselItem, { children: _jsx(Card, { className: "border-0", children: _jsx(CardContent, { className: "p-0", children: _jsxs("div", { className: "relative aspect-[21/9] overflow-hidden rounded-lg", children: [_jsx("img", { src: banner.imageUrl, alt: banner.title, className: "h-full w-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }), _jsxs("div", { className: "absolute bottom-0 left-0 p-6 text-white", children: [_jsx("h2", { className: "text-2xl font-bold", children: banner.title }), _jsx("p", { className: "mt-2 text-sm opacity-90", children: banner.description })] })] }) }) }) }, banner.id))) }), _jsx(CarouselPrevious, { className: "left-4" }), _jsx(CarouselNext, { className: "right-4" })] }));
}
