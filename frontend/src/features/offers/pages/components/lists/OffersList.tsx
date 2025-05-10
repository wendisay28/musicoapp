import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { OfferCard } from "../cards/OfferCard";
export function OffersList (props: any){ offers, onContact }) {
    return (_jsx("div", { className: "space-y-4", children: offers.map((offer) => (_jsx(OfferCard, { offer: offer, onContact: () => onContact?.(offer.id) }, offer.id))) }));
}
