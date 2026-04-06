import { Car } from '@/types';

export const mockCars: Car[] = [
  {
    id: 'car_1',
    name: 'VinFast VF3',
    category: 'thue-xe',
    slug: 'vf3',
    price_per_day: 400000,
    discount_price: 350000,
    is_new: true,
    description: 'Dòng xe điện mini siêu gọn nhẹ, linh hoạt cho phố đảo.',
    images: [
      '/images/vf3/vf3.jpg',
      '/images/vf3/vf3-1.jpg',
      '/images/vf3/vf3-2.jpg'
    ],
    specs: {
      seats: 4,
      transmission: 'Auto',
      fuel: 'Electric'
    },
    available: true
  },
  {
    id: 'car_2',
    name: 'VinFast VF5 Plus',
    category: 'thue-xe',
    slug: 'vf5',
    price_per_day: 650000,
    is_hot: true,
    description: 'Mẫu SUV điện 5 chỗ hoàn hảo cho gia đình nhỏ.',
    images: [
      '/images/vf5/vf5.png',
      '/images/vf5/vf5-1.png'
    ],
    specs: {
      seats: 5,
      transmission: 'Auto',
      fuel: 'Electric'
    },
    available: true
  },
  {
    id: 'car_3',
    name: 'VinFast Limo Green (Taxi)',
    category: 'thue-xe',
    slug: 'limo-green',
    price_per_day: 800000,
    discount_price: 750000,
    description: 'Phiên bản taxi xanh cao cấp, rộng rãi và êm ái.',
    images: [
      '/images/mpv7/mpv7.jpg',
      '/images/mpv7/mpv7-1.jpg',
      '/images/mpv7/mpv7-2.jpg'
    ],
    specs: {
      seats: 5,
      transmission: 'Auto',
      fuel: 'Electric'
    },
    available: true
  }
];

export const mockPromotions: import('@/types').Promotion[] = [
  {
    id: 'promo_1',
    title: 'GIẢM GIÁ 20% DỊP HÈ',
    description: 'Ưu đãi dành riêng cho khách hàng thuê từ 3 ngày trở lên.',
    image: 'https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=600&auto=format&fit=crop',
    valid_until: '2026-08-31',
    slug: 'giam-gia-20-dip-he',
    discount_percentage: 20
  },
  {
    id: 'promo_2',
    title: 'TẶNG 1 NGÀY MIỄN PHÍ',
    description: 'Thuê 7 ngày tính tiền 6 ngày cho các dòng xe VinFast.',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=600&auto=format&fit=crop',
    valid_until: '2026-12-31',
    slug: 'tang-1-ngay-mien-phi',
  },
  {
    id: 'promo_3',
    title: 'ĐẶT SỚM GIẢM SÂU',
    description: 'Giảm ngay 10% khi đặt trước 14 ngày. Số lượng có hạn.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop',
    valid_until: '2026-10-31',
    slug: 'dat-som-giam-sau',
    discount_percentage: 10
  }
];
