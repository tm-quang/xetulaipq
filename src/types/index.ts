export type Car = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price_per_day: number;
  discount_price?: number;
  is_new?: boolean;
  is_hot?: boolean;
  description?: string;
  images: string[];
  specs: {
    seats: number;
    transmission: 'Auto' | 'Manual';
    fuel: 'Electric' | 'Gasoline' | 'Diesel';
  };
  available: boolean;
  features?: string[];
  terms?: string[];
};

export type CarUnit = {
  id: string;
  car_id: string;
  color: string;
  color_code?: string;
  plate_number: string;
  status: 'available' | 'maintenance' | 'retired';
};

export type Booking = {
  id: string;
  user_id: string;
  car_id: string;
  unit_id?: string;
  start_date: string;
  end_date: string;
  pickup_location: string;
  dropoff_location: string;
  total_price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  image: string;
  valid_until: string;
  slug: string;
  discount_percentage?: number;
};
