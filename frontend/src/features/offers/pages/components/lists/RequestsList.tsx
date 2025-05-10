import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
import { RequestCard } from "../cards/RequestCard";
export function RequestsList (props: any){ requests, onViewDetails, onContact }) {
    return (_jsx("div", { className: "space-y-4", children: requests.map((request) => (_jsx(RequestCard, { request: request, onViewDetails: () => onViewDetails?.(request.id), onContact: () => onContact?.(request.id) }, request.id))) }));
}
