export type TReview = {
  _id: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type TStudio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  securityDeposit: number;
  maxCapacity: number;
  location: string;
  image: string;
  gallery?: string[];
  amenities: string[];
  overview: string;
  ownerEmail: string;
  ownerName: string;
  ownerImage?: string;
  rating: number;
  reviews: TReview[];
  createdAt: string;
};
