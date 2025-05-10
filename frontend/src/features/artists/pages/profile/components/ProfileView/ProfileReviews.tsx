import React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/features/shared/components/ui/avatar';
import { Star } from 'lucide-react';
export function ProfileReviews (props: any){ reviews, averageRating, totalReviews }) {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Rese\u00F1as" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex items-center", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: `h-4 w-4 ${i < Math.round(averageRating)
                                        ? 'text-yellow-400 fill-yellow-400'
                                        : 'text-gray-300'}` }, i))) }), _jsxs("span", { className: "text-sm text-muted-foreground", children: [averageRating.toFixed(1), " (", totalReviews, " rese\u00F1as)"] })] })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: reviews.map((review) => (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsxs(Avatar, { children: [_jsx(AvatarImage, { src: review.user.photoURL, alt: review.user.name }), _jsx(AvatarFallback, { children: review.user.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase() })] }), _jsxs("div", { className: "flex-1 space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "font-semibold", children: review.user.name }), _jsx("span", { className: "text-sm text-muted-foreground", children: new Date(review.createdAt).toLocaleDateString() })] }), _jsx("div", { className: "flex items-center", children: [...Array(5)].map((_, i) => (_jsx(Star, { className: `h-4 w-4 ${i < review.rating
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'}` }, i))) }), _jsx("p", { className: "text-muted-foreground", children: review.comment })] })] }) }, review.id))) }) })] }));
}
