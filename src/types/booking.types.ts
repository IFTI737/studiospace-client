export type TBookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export type TBooking = {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioImage: string;
  studioLocation: string;
  category: string;
  hostEmail: string;
  hostName: string;
  hourlyRate: number;
  securityDeposit: number;
  date: string;
  startTime: string;
  hours: number;
  guests: number;
  note?: string;
  totalPrice: number;
  userEmail: string;
  userName: string;
  status: TBookingStatus;
  createdAt: string;
};
