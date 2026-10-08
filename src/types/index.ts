export interface MenuItem {
  id: string;
  name: string;
  italianName: string;
  category: 'pizza' | 'pasta' | 'dessert' | 'drinks';
  description: string;
  pricePkr: number;
  highlight?: string;
  ingredients: string[];
  dietary?: 'Vegetarian' | 'Chef Specialty' | 'Classic';
  imagePlaceholderColor?: string;
  accentColor?: string;
  imageUrl: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
  favoriteDish: string;
}

export interface CourtyardZone {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  tag: string;
}

export type FulfillmentMode = 'delivery' | 'pickup';

export interface KarachiArea {
  id: string;
  name: string;
  zone: 'nearby' | 'mid' | 'extended';
  distanceKm: number;
  estimatedDeliveryMin: string;
  deliveryFeePkr: number;
  landmark: string;
}

export interface FulfillmentPreference {
  mode: FulfillmentMode;
  area: KarachiArea;
  streetAddress?: string;
  pickupTimeMin?: number;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'courtyard-alley' | 'balcony-upper' | 'indoor-nook' | 'no-preference';
  specialRequests?: string;
}
