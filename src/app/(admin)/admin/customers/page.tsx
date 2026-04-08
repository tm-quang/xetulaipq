"use client";

import { useState } from "react";
import { mockUsers } from "@/lib/data";
import { AdminCard, AdminTable, AdminBadge, AdminButton } from "@/components/admin/UI";
import { AdminModal, AdminConfirmModal } from "@/components/admin/Modal";
import { 
  HiOutlineSearch, 
  HiOutlineEye, 
  HiOutlineTrash,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineUserCircle,
  HiOutlineChevronRight,
  HiOutlineDatabase
} from "react-icons/hi";
import toast from "react-hot-toast";

import { User } from "@/types";

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredCustomers = customers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.phone.includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (customer: User) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedCustomer) {
      setCustomers(customers.filter(c => c.id !== selectedCustomer.id));
      toast.success(`Đã xóa khách hàng ${selectedCustomer.name}`);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mb-3">Quản lý khách hàng</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Danh sách tài khoản khách hàng trên hệ thống</p>
        </div>
        <AdminButton variant="outline">
          <HiOutlineDatabase size={20} />
          ĐỒNG BỘ DỮ LIỆU
        </AdminButton>
      </div>

      {/* Search Bar */}
      <AdminCard className="p-4">
        <div className="relative group w-full">
           <HiOutlineSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#18A14D] transition-colors" size={20} />
           <input 
            type="text" 
            placeholder="Tìm kiếm theo tên, số điện thoại hoặc email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#18A14D]/50 transition shadow-sm"
          />
        </div>
      </AdminCard>

      {/* Table Content */}
      <AdminCard title={`Khách hàng (${filteredCustomers.length})`} subtitle="Lịch sử giao dịch và thông tin liên hệ">
        <AdminTable headers={["Khách Hàng", "Email", "Số Điện Thoại", "Trạng Thái", "Ngày Tham Gia", "Thao Tác"]}>
          {filteredCustomers.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-[#18A14D] font-black group-hover:scale-110 transition-transform">
                    {c.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-black text-gray-900 uppercase tracking-tight text-sm leading-none mb-1">{c.name}</div>
                    <div className="text-[10px] text-gray-400 font-black tracking-widest leading-none">ID: {c.id.slice(0, 8)}...</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                 <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-700 transition-colors">
                    <HiOutlineMail size={16} />
                    <span className="font-bold">{c.email}</span>
                 </div>
              </td>
              <td className="px-6 py-4">
                 <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-700 transition-colors">
                    <HiOutlinePhone size={16} />
                    <span className="font-bold">{c.phone}</span>
                 </div>
              </td>
              <td className="px-6 py-4">
                <AdminBadge variant="success">Hoạt động</AdminBadge>
              </td>
              <td className="px-6 py-4 text-gray-400 text-xs font-bold uppercase tracking-tight">
                 01/04/2026
              </td>
              <td className="px-6 py-4">
                 <div className="flex gap-2">
                    <AdminButton 
                      variant="ghost" 
                      size="icon" 
                      className="w-9 h-9 text-gray-400 hover:text-[#18A14D] transition-all"
                      onClick={() => handleView(c)}
                    >
                       <HiOutlineEye size={20} />
                    </AdminButton>
                    <AdminButton 
                      variant="ghost" 
                      size="icon" 
                      className="w-9 h-9 text-gray-400 hover:text-red-500 transition-all"
                      onClick={() => { setSelectedCustomer(c); setIsDeleteModalOpen(true); }}
                    >
                       <HiOutlineTrash size={20} />
                    </AdminButton>
                 </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* View Modal */}
      <AdminModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        title="Hồ sơ khách hàng"
        size="md"
        footer={<AdminButton variant="ghost" onClick={() => setIsViewModalOpen(false)}>Đóng lại</AdminButton>}
      >
        {selectedCustomer && (
          <div className="text-center">
            <div className="w-24 h-24 rounded-[40px] bg-gradient-to-br from-[#18A14D] to-[#128a40] mx-auto flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-[#18A14D]/20 mb-6">
              {selectedCustomer.name[0].toUpperCase()}
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-1">{selectedCustomer.name}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Thành viên từ 2026</p>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-[#18A14D]/20 transition-all cursor-pointer group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#18A14D] group-hover:shadow-sm">
                    <HiOutlineMail size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Địa chỉ Email</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{selectedCustomer.email}</p>
                  </div>
                </div>
                <HiOutlineChevronRight size={18} className="text-gray-300 group-hover:text-[#18A14D] transition-all" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-[#18A14D]/20 transition-all cursor-pointer group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#18A14D] group-hover:shadow-sm">
                    <HiOutlinePhone size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Số điện thoại</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{selectedCustomer.phone}</p>
                  </div>
                </div>
                <HiOutlineChevronRight size={18} className="text-gray-300 group-hover:text-[#18A14D] transition-all" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-md hover:border-[#18A14D]/20 transition-all cursor-pointer group">
                <div className="flex items-center gap-4 text-left">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#18A14D] group-hover:shadow-sm">
                    <HiOutlineUserCircle size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Giao dịch thành công</p>
                    <p className="text-sm font-bold text-gray-900 truncate">12 Chuyến đi</p>
                  </div>
                </div>
                <HiOutlineChevronRight size={18} className="text-gray-300 group-hover:text-[#18A14D] transition-all" />
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Vô hiệu hóa khách hàng"
        message={`Bạn có chắc chắn muốn vô hiệu hóa tài khoản của ${selectedCustomer?.name}? Hành động này có thể được khôi phục bởi Admin cấp cao hơn.`}
      />
    </div>
  );
}
