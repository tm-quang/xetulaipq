"use client";

import { useState } from "react";
import { AdminCard, AdminTable, AdminBadge, AdminButton, AdminInput, AdminSelect, AdminTextarea } from "@/components/admin/UI";
import { AdminModal, AdminConfirmModal } from "@/components/admin/Modal";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch, HiOutlineGift, HiOutlineTicket } from "react-icons/hi";
import toast from "react-hot-toast";

interface Promotion {
  id?: string;
  code: string;
  title: string;
  discount: string;
  type: string;
  expiry: string;
  status: string;
}

export default function PromotionManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<Promotion | null>(null);

  const mockPromotions: Promotion[] = [
    { id: "PROMO01", code: "HE2026", title: "Ưu đãi mùa hè", discount: "20%", type: "Percentage", expiry: "2026-08-31", status: "active" },
    { id: "PROMO02", code: "QUOCTE30", title: "Mừng ngày quốc tế", discount: "150.000đ", type: "Flat", expiry: "2026-05-30", status: "expired" },
    { id: "PROMO03", code: "KHACHHANGMOI", title: "Dành cho khách mới", discount: "10%", type: "Percentage", expiry: "2026-12-31", status: "active" },
  ];

  const handleOpenModal = (promo: Promotion | null = null) => {
    setSelectedPromo(promo || { code: "", title: "", discount: "", type: "Percentage", expiry: "", status: "active" });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedPromo) {
      toast.success(selectedPromo.id ? "Cập nhật mã khuyến mãi thành công!" : "Tạo mã khuyến mãi mới thành công!");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mb-3">Mã khuyến mãi</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Quản lý các chương trình ưu đãi và voucher</p>
        </div>
        <AdminButton onClick={() => handleOpenModal()}>
          <HiOutlinePlus size={20} />
          THÊM MÃ MỚI
        </AdminButton>
      </div>

      {/* Statistics for Promotions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <HiOutlineGift size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Đang hoạt động</p>
            <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">12 Mã</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-2xl bg-[#18A14D]/10 text-[#18A14D] flex items-center justify-center">
            <HiOutlineTicket size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Lượt sử dụng</p>
            <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">428 Lượt</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
             <HiOutlineSearch size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">Tiết kiệm</p>
            <h3 className="text-2xl font-black text-gray-900 tracking-tighter leading-none">12.4M</h3>
          </div>
        </div>
      </div>

      <AdminCard title="Danh sách mã KM" subtitle="Toàn bộ các chương trình ưu đãi hiện hành">
        <AdminTable headers={["Mã Voucher", "Chiến Dịch", "Loại", "Giá Trị", "Ngày Hết Hạn", "Trạng Thái", "Thao Tác"]}>
          {mockPromotions.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <span className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200 text-[#18A14D] font-black text-xs uppercase tracking-widest block text-center min-w-[100px]">
                  {p.code}
                </span>
              </td>
              <td className="px-6 py-4">
                 <div className="font-black text-gray-900 uppercase tracking-tight text-sm mb-1 line-clamp-1">{p.title}</div>
                 <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none">{p.id}</div>
              </td>
              <td className="px-6 py-4 text-gray-500 font-bold uppercase text-[11px]">
                 {p.type === 'Percentage' ? 'Phần trăm %' : 'Số tiền cố định'}
              </td>
              <td className="px-6 py-4 font-black text-gray-900">
                 {p.discount}
              </td>
              <td className="px-6 py-4 text-gray-400 font-bold">
                 {p.expiry}
              </td>
              <td className="px-6 py-4">
                <AdminBadge variant={p.status === 'active' ? 'success' : 'neutral'}>
                   {p.status === 'active' ? 'Đang chạy' : 'Hết hạn'}
                </AdminBadge>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <AdminButton 
                    variant="ghost" 
                    size="icon" 
                    className="w-9 h-9 text-gray-400 hover:text-[#18A14D] hover:bg-[#18A14D]/5"
                    onClick={() => handleOpenModal(p)}
                  >
                    <HiOutlinePencil size={18} />
                  </AdminButton>
                  <AdminButton 
                    variant="ghost" 
                    size="icon" 
                    className="w-9 h-9 text-gray-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => { setSelectedPromo(p); setIsConfirmOpen(true); }}
                  >
                    <HiOutlineTrash size={18} />
                  </AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Modal & Form Showcase */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedPromo?.id ? "Chỉnh sửa mã KM" : "Tạo mã KM mới"}
        size="md"
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Hủy bỏ</AdminButton>
            <AdminButton onClick={handleSave}>Lưu mã Voucher</AdminButton>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <AdminInput label="Mã Voucher" placeholder="Tên mã in hoa..." value={selectedPromo?.code} onChange={() => {}} />
            <AdminSelect label="Loại ưu đãi" value={selectedPromo?.type} onChange={() => {}}>
              <option value="Percentage">Phần trăm (%)</option>
              <option value="Flat">Số tiền cố định (đ)</option>
            </AdminSelect>
          </div>
          <AdminInput label="Tiêu đề chiến dịch" placeholder="Nhập tên chiến dịch..." value={selectedPromo?.title} onChange={() => {}} />
          <div className="grid grid-cols-2 gap-4">
            <AdminInput label="Giá trị giảm" placeholder="20% hoặc 50000..." value={selectedPromo?.discount} onChange={() => {}} />
            <AdminInput label="Ngày hết hạn" type="date" value={selectedPromo?.expiry} onChange={() => {}} />
          </div>
          <AdminTextarea label="Mô tả & Điều kiện áp dụng" placeholder="Nhập các quy định áp dụng mã này..." />
        </div>
      </AdminModal>

      <AdminConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => { toast.success(`Đã xóa mã voucher thành công!`); setIsConfirmOpen(false); }}
        title="Xác nhận xóa mã KM"
        message="Dữ liệu về mã voucher này sẽ bị xóa vĩnh viễn khỏi hệ thống."
      />
    </div>
  );
}
