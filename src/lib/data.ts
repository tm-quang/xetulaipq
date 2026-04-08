import { Car, Booking, User, Promotion, CarUnit } from '@/types';

export const mockCars: Car[] = [
  {
    id: 'car_vf5',
    name: 'VinFast VF5 Plus',
    category: 'thue-xe',
    slug: 'vf5-plus',
    price_per_day: 750000,
    is_hot: true,
    description: 'Mẫu SUV điện 5 chỗ hoàn hảo cho gia đình nhỏ. Xe vận hành êm ái, nội thất rộng rãi cùng nhiều tính năng an toàn hiện đại.',
    images: [
      '/images/vf5/vf5.png',
      '/images/vf5/vf5-1.png'
    ],
    specs: {
      seats: 5,
      transmission: 'Auto',
      fuel: 'Electric'
    },
    available: true,
    features: [
      'Cốp xe rộng rãi cho 2 vali lớn',
      'Công nghệ hỗ trợ lái ADAS thông minh',
      'Hệ thống giải trí đa phương tiện',
      'Vận hành cực êm, không mùi khí thải'
    ],
    terms: [
      'Miễn phí sạc tại hệ thống VinFast',
      'Giao nhận 24/7 (có phụ phí đêm)',
      'Thủ tục nhanh gọn, nhận xe trong 5p'
    ]
  }
];

export const mockUsers: User[] = [
  {
    id: 'user_1',
    name: 'Nguyễn Văn A',
    email: 'nva@example.com',
    phone: '0901234567'
  },
  {
    id: 'user_2',
    name: 'Trần Thị B',
    email: 'ttb@example.com',
    phone: '0987654321'
  },
  {
    id: 'user_admin',
    name: 'Quản trị viên',
    email: 'minhquang030@gmail.com',
    phone: '0933960788'
  }
];

export const mockCarUnits: CarUnit[] = [
  { id: 'unit_vf5_1', car_id: 'car_vf5', color: 'Đỏ', color_code: '#FF0000', plate_number: '68A-111.11', status: 'available' },
  { id: 'unit_vf5_2', car_id: 'car_vf5', color: 'Trắng', color_code: '#FFFFFF', plate_number: '68A-222.22', status: 'available' },
];

export const mockBookings: Booking[] = [
  {
    id: 'bk_5',
    user_id: 'user_1',
    car_id: 'car_vf5',
    unit_id: 'unit_vf5_1',
    start_date: '2026-04-10T09:00:00Z',
    end_date: '2026-04-12T09:00:00Z',
    pickup_location: 'Sân bay Rạch Giá',
    dropoff_location: 'Sân bay Rạch Giá',
    total_price: 1500000,
    status: 'confirmed'
  },
  {
    id: 'bk_6',
    user_id: 'user_2',
    car_id: 'car_vf5',
    unit_id: 'unit_vf5_2',
    start_date: '2026-04-15T09:00:00Z',
    end_date: '2026-04-16T09:00:00Z',
    pickup_location: 'Bến tàu Rạch Giá',
    dropoff_location: 'Bến tàu Rạch Giá',
    total_price: 750000,
    status: 'confirmed'
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: 'promo_1',
    title: 'GIẢM GIÁ 20% DỊP HÈ',
    description: 'Ưu đãi dành riêng cho khách hàng thuê từ 3 ngày trở lên.',
    image: '/images/vf5/vf5-1.png',
    valid_until: '2026-08-31',
    slug: 'giam-gia-20-dip-he',
    discount_percentage: 20
  },
  {
    id: 'promo_3',
    title: 'ĐẶT SỚM GIẢM SÂU',
    description: 'Giảm ngay 10% khi đặt trước 14 ngày. Số lượng có hạn.',
    image: '/images/vf5/vf5.png',
    valid_until: '2026-10-31',
    slug: 'dat-som-giam-sau',
    discount_percentage: 10
  }
];
