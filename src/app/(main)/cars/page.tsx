import { Suspense } from 'react';
import CarsClient from "./CarsClient";

export const metadata = {
  title: "Tìm và đặt xe điện VinFast tự lái tại Rạch Giá | VF5 Tự Lái",
  description: "Dịch vụ cho thuê xe điện VinFast (VF3, VF5, VF8, VFe34) tự lái chuyên nghiệp tại Rạch Giá. Lọc xe trống theo ngày, giá thuê tốt nhất, giao nhận tận nơi miễn phí.",
  keywords: ["thuê xe điện Rạch Giá", "vinfast tự lái Rạch Giá", "thuê xe vf3 Rạch Giá", "thuê xe vf5 Rạch Giá", "xế tự lái Rạch Giá"],
};

export default function CarsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CarsClient />
    </Suspense>
  );
}
