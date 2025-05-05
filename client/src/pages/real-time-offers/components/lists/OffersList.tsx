import { OfferCard } from "../cards/OfferCard";

interface Offer {
  id: number;
  artistId: string;
  artistName: string;
  artistPhoto: string;
  artistRating: number;
  price: number;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

interface OffersListProps {
  offers: Offer[];
  onContact?: (offerId: number) => void;
}

export function OffersList({ offers, onContact }: OffersListProps) {
  return (
    <div className="space-y-4">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onContact={() => onContact?.(offer.id)}
        />
      ))}
    </div>
  );
} 