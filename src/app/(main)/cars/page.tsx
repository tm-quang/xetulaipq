import CarsClient from "./CarsClient";

export const metadata = {
  title: "Tìm và đặt xe điện VinFast tự lái tại Phú Quốc | Xế Tự Lái",
  description: "Dịch vụ cho thuê xe điện VinFast (VF3, VF5, VF8, VFe34) tự lái chuyên nghiệp tại Phú Quốc. Lọc xe trống theo ngày, giá thuê tốt nhất, giao nhận tận nơi miễn phí.",
  keywords: ["thuê xe điện phú quốc", "vinfast tự lái phú quốc", "thuê xe vf3 phú quốc", "thuê xe vf5 phú quốc", "xế tự lái phú quốc"],
};

export default function CarsPage() {
  return <CarsClient />;
}
