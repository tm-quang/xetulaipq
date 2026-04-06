import { mockCars } from "@/lib/data";
import { formatCurrencyVND } from "@/lib/utils";
import { notFound } from "next/navigation";
import CarDetailClient from "./CarDetailClient";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const car = mockCars.find((c) => c.slug === params.slug);
  if (!car) return { title: "Không tìm thấy xe" };

  return {
    title: `Thuê xe ${car.name}`,
    description: `Dịch vụ cho thuê xe ${car.name} tự lái tại Phú Quốc. Giá chỉ từ ${formatCurrencyVND(car.price_per_day)}/ngày. Thủ tục đơn giản, xe đời mới.`,
    alternates: {
      canonical: `/cars/${car.category}/${car.slug}`,
    },
  };
}

export default function CarDetailPage({ params }: Props) {
  const car = mockCars.find((c) => c.slug === params.slug);

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}
