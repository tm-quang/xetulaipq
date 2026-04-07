import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Booking, Car, CarUnit } from "@/types";
import { parseISO } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyVND(amount: number) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

/**
 * Checks if a specific car model has at least one free unit during the requested period.
 */
export function isCarAvailable(
  car: Car,
  units: CarUnit[],
  bookings: Booking[],
  startDate: Date,
  endDate: Date
): boolean {
  const carUnits = units.filter(u => u.car_id === car.id && u.status === 'available');
  
  if (carUnits.length === 0) return false;

  return carUnits.some(unit => {
    const unitBookings = bookings.filter(b => b.unit_id === unit.id && b.status !== 'cancelled');
    
    return !unitBookings.some(b => {
      const bStart = parseISO(b.start_date);
      const bEnd = parseISO(b.end_date);
      
      // Basic overlap check
      return startDate <= bEnd && endDate >= bStart;
    });
  });
}
