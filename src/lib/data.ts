import { Car, Booking, User, Promotion, CarUnit } from '@/types';

export const mockCars: Car[] = [
  {
    id: 'car_vf3',
    name: 'VinFast VF3',
    category: 'thue-xe',
    slug: 'vf3',
    price_per_day: 500000,
    discount_price: 450000,
    is_new: true,
    description: 'Dòng xe điện mini siêu gọn nhẹ, linh hoạt cho phố đảo. Thiết kế thời thượng, trẻ trung, phù hợp cho cặp đôi hoặc nhóm bạn 4 người khám phá Phú Quốc.',
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
    available: true,
    features: [
      'Thiết kế mini thời thượng, dễ dàng đỗ xe',
      'Quãng đường di chuyển ~210km/lần sạc',
      'Màn hình cảm ứng 10 inch hiện đại',
      'Tiết kiệm chi phí di chuyển tối đa'
    ],
    terms: [
      'Miễn phí sạc tại trạm sạc VinFast',
      'Giao xe tận nơi nội ô Dương Đông',
      'Hỗ trợ kỹ thuật 24/7 trên toàn đảo'
    ]
  },
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
  },
  {
    id: 'car_limo',
    name: 'VinFast Limo Green (Taxi)',
    category: 'thue-xe',
    slug: 'limo-green',
    price_per_day: 1200000,
    discount_price: 1100000,
    description: 'Phiên bản taxi xanh cao cấp (VF8/VF9), mang lại sự sang trọng và tiện nghi bậc nhất. Phù hợp cho đón tiễn sân bay và tham quan đảo theo phong cách VIP.',
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
    available: true,
    features: [
      'Ghế da cao cấp, massage (tùy dòng)',
      'Hệ thống âm thanh kịch nghệ',
      'Nội thất hạng sang, cực kỳ rộng rãi',
      'Đẳng cấp dẫn đầu xu hướng Xanh'
    ],
    terms: [
      'Hỗ trợ tài xế nếu khách yêu cầu',
      'Giao xe miễn phí tại Sân bay',
      'Đại sứ hỗ trợ lộ trình du lịch VIP'
    ]
  },
  {
    id: 'car_mpv7',
    name: 'Mitsubishi Xpander / MPV 7',
    category: 'thue-xe',
    slug: 'mpv-7',
    price_per_day: 900000,
    is_hot: true,
    description: 'Dòng xe 7 chỗ quốc dân, rộng rãi và tiết kiệm nhiên liệu. Lựa chọn tối ưu cho gia đình 7 người hoặc nhóm bạn với hành lý nhiều.',
    images: [
      '/images/mpv7/mpv7.jpg',
      '/images/mpv7/mpv7-1.jpg',
      '/images/mpv7/mpv7-2.jpg'
    ],
    specs: {
      seats: 7,
      transmission: 'Auto',
      fuel: 'Gasoline'
    },
    available: true,
    features: [
      'Khoang cabin 7 chỗ biến hóa linh hoạt',
      'Điều hòa 2 dàn lạnh, làm mát cực nhanh',
      'Hộc để đồ thông minh khắp xe',
      'Động cơ MIVEC bền bỉ và tiết kiệm'
    ],
    terms: [
      'Quý khách tự túc chi phí đổ xăng',
      'Hỗ trợ cứu hộ 24/7 toàn Phú Quốc',
      'Áp dụng cọc theo quy định xe xăng'
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
    email: 'admin@xetulaipq.vn',
    phone: '0123456789'
  }
];

export const mockCarUnits: CarUnit[] = [
  { id: 'unit_vf3_1', car_id: 'car_vf3', color: 'Trắng', color_code: '#FFFFFF', plate_number: '68A-123.45', status: 'available' },
  { id: 'unit_vf3_2', car_id: 'car_vf3', color: 'Vàng', color_code: '#FFD700', plate_number: '68A-678.90', status: 'available' },
  { id: 'unit_vf3_3', car_id: 'car_vf3', color: 'Xanh dương', color_code: '#0000FF', plate_number: '68A-456.78', status: 'available' },
  { id: 'unit_vf5_1', car_id: 'car_vf5', color: 'Đỏ', color_code: '#FF0000', plate_number: '68A-111.11', status: 'available' },
  { id: 'unit_vf5_2', car_id: 'car_vf5', color: 'Trắng', color_code: '#FFFFFF', plate_number: '68A-222.22', status: 'available' },
  { id: 'unit_mpv7_1', car_id: 'car_mpv7', color: 'Bạc', color_code: '#C0C0C0', plate_number: '68A-333.33', status: 'available' },
  { id: 'unit_mpv7_2', car_id: 'car_mpv7', color: 'Đen', color_code: '#000000', plate_number: '68A-444.44', status: 'available' },
];

export const mockBookings: Booking[] = [
  {
    id: 'bk_1',
    user_id: 'user_1',
    car_id: 'car_vf3',
    unit_id: 'unit_vf3_1',
    start_date: '2026-04-01T08:00:00Z',
    end_date: '2026-04-03T18:00:00Z',
    pickup_location: 'Sân bay Phú Quốc',
    dropoff_location: 'Sân bay Phú Quốc',
    total_price: 1000000,
    status: 'completed'
  },
  {
    id: 'bk_2',
    user_id: 'user_2',
    car_id: 'car_vf3',
    unit_id: 'unit_vf3_2',
    start_date: '2026-04-10T09:00:00Z',
    end_date: '2026-04-12T09:00:00Z',
    pickup_location: 'Sân bay Phú Quốc',
    dropoff_location: 'Sân bay Phú Quốc',
    total_price: 1000000,
    status: 'confirmed'
  },
  {
    id: 'bk_3',
    user_id: 'user_1',
    car_id: 'car_vf3',
    unit_id: 'unit_vf3_1',
    start_date: '2026-04-15T09:00:00Z',
    end_date: '2026-04-17T09:00:00Z',
    pickup_location: 'Sân bay Phú Quốc',
    dropoff_location: 'Sân bay Phú Quốc',
    total_price: 1000000,
    status: 'confirmed'
  },
  {
    id: 'bk_4',
    user_id: 'user_2',
    car_id: 'car_vf3',
    unit_id: 'unit_vf3_3',
    start_date: '2026-05-01T09:00:00Z',
    end_date: '2026-05-05T09:00:00Z',
    pickup_location: 'Sân bay Phú Quốc',
    dropoff_location: 'Sân bay Phú Quốc',
    total_price: 2000000,
    status: 'confirmed'
  },
  {
    id: 'bk_5',
    user_id: 'user_1',
    car_id: 'car_vf5',
    unit_id: 'unit_vf5_1',
    start_date: '2026-04-10T09:00:00Z',
    end_date: '2026-04-12T09:00:00Z',
    pickup_location: 'Sân bay Phú Quốc',
    dropoff_location: 'Sân bay Phú Quốc',
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
    pickup_location: 'Sân bay Phú Quốc',
    dropoff_location: 'Sân bay Phú Quốc',
    total_price: 750000,
    status: 'confirmed'
  },
];

export const mockPromotions: Promotion[] = [
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

