"use client";

import { useState } from "react";
import { formatCurrencyVND } from "@/lib/utils";
import { mockCars } from "@/lib/data";
import { AdminCard, AdminTable, AdminBadge, AdminButton, AdminInput, AdminSelect } from "@/components/admin/UI";
import { AdminModal, AdminConfirmModal } from "@/components/admin/Modal";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineSearch, HiOutlineFilter, HiOutlinePhotograph } from "react-icons/hi";
import toast from "react-hot-toast";

import { Car } from "@/types";

export default function CarManagement() {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState<Partial<Car> | null>(null);
  const [carToDelete, setCarToDelete] = useState<Car | null>(null);

  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (car: Car | null = null) => {
    setCurrentCar(car || { name: "", price_per_day: 0, specs: { fuel: "Electric" } as unknown as Car["specs"], available: true, images: [""] });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (currentCar) {
      toast.success(currentCar.id ? "Cập nhật thông tin xe thành công!" : "Thêm xe mới thành công!");
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (carToDelete) {
      setCars(cars.filter(c => c.id !== carToDelete.id));
      toast.success(`Đã xóa xe ${carToDelete.name}`);
      setIsConfirmOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase leading-none mb-3">Danh mục xe</h1>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Quản lý đội xe và thông số kỹ thuật</p>
        </div>
        <AdminButton onClick={() => handleOpenModal()}>
          <HiOutlinePlus size={20} />
          THÊM XE MỚI
        </AdminButton>
      </div>

      {/* Filter & Search Bar */}
      <AdminCard className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group w-full">
            <HiOutlineSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#18A14D] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên xe, mã xe..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-gray-900 focus:outline-none focus:border-[#18A14D]/50 focus:bg-white transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <AdminButton variant="outline" className="flex-1 md:flex-none">
              <HiOutlineFilter size={18} /> Lọc
            </AdminButton>
            <AdminSelect className="min-w-[160px] flex-1 md:flex-none">
              <option>Tất cả trạng thái</option>
              <option>Đang sẵn sàng</option>
              <option>Đang cho thuê</option>
            </AdminSelect>
          </div>
        </div>
      </AdminCard>

      {/* Table Container */}
      <AdminCard title={`Danh sách xe (${filteredCars.length})`} subtitle="Thông tin chi tiết và trạng thái xe">
        <AdminTable headers={["Ảnh", "Tên Xe & Mã", "Loại Máy", "Giá Thuê", "Trạng Thái", "Thao Tác"]}>
          {filteredCars.map((car) => (
            <tr key={car.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="px-6 py-4">
                <div className="w-20 h-14 rounded-[18px] bg-gray-100 overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform">
                  <img src={car.images[0]} alt={car.name} className="object-cover w-full h-full" />
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-black text-gray-900 uppercase tracking-tight text-sm mb-1">{car.name}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-black leading-none">{car.id}</div>
              </td>
              <td className="px-6 py-4">
                <AdminBadge variant={car.specs.fuel === 'Electric' ? 'success' : 'info'}>
                  {car.specs.fuel === 'Electric' ? 'Xe điện' : 'Xe xăng'}
                </AdminBadge>
              </td>
              <td className="px-6 py-4">
                <div className="font-black text-gray-900 leading-none">{formatCurrencyVND(car.price_per_day)}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">mỗi ngày</div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ring-4 ${car.available ? 'bg-[#18A14D] ring-[#18A14D]/10' : 'bg-red-500 ring-red-500/10'}`} />
                   <span className="font-black text-[11px] uppercase tracking-widest text-gray-500">{car.available ? 'Còn xe' : 'Hết xe'}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <AdminButton 
                    variant="ghost" 
                    size="icon" 
                    className="w-9 h-9 text-gray-400 hover:text-[#18A14D] hover:bg-[#18A14D]/5"
                    onClick={() => handleOpenModal(car)}
                  >
                    <HiOutlinePencil size={18} />
                  </AdminButton>
                  <AdminButton 
                    variant="ghost" 
                    size="icon" 
                    className="w-9 h-9 text-gray-400 hover:text-red-500 hover:bg-red-50"
                    onClick={() => { setCarToDelete(car); setIsConfirmOpen(true); }}
                  >
                    <HiOutlineTrash size={18} />
                  </AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      {/* Create/Edit Modal */}
      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentCar?.id ? "Chỉnh sửa thông tin xe" : "Thêm xe mới"}
        size="lg"
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setIsModalOpen(false)}>Hủy bỏ</AdminButton>
            <AdminButton onClick={handleSave}>Lưu thông tin</AdminButton>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <AdminInput 
              label="Tên hiển thị" 
              placeholder="Ví dụ: VinFast VF3 - Special Edition" 
              value={currentCar?.name}
              onChange={(e) => setCurrentCar({...currentCar, name: e.target.value})}
            />
          </div>
          <AdminInput 
            label="Giá thuê (VND/Ngày)" 
            type="number" 
            value={currentCar?.price_per_day || 0}
            onChange={(e) => currentCar && setCurrentCar({...currentCar, price_per_day: Number(e.target.value)})}
          />
          <AdminSelect 
            label="Loại động cơ"
            value={currentCar?.specs?.fuel || "Electric"}
            onChange={(e) => currentCar && setCurrentCar({...currentCar, specs: { ...currentCar.specs, fuel: e.target.value } as unknown as Car["specs"]})}
          >
            <option value="Electric">Xe điện (Electric)</option>
            <option value="Gasoline">Xe xăng (Gasoline)</option>
          </AdminSelect>
          <div className="md:col-span-2">
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none ml-1 mb-3">Hình ảnh xe</label>
            <div className="grid grid-cols-4 gap-4">
               {currentCar?.images?.map((img: string, idx: number) => (
                 <div key={idx} className="aspect-[4/3] rounded-2xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden group">
                    {img ? (
                      <img src={img} className="object-cover w-full h-full" alt="" />
                    ) : (
                      <HiOutlinePhotograph size={24} className="text-gray-300" />
                    )}
                 </div>
               ))}
               <button className="aspect-[4/3] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 hover:border-[#18A14D] hover:bg-green-50 transition-all text-gray-400 hover:text-[#18A14D]">
                  <HiOutlinePlus size={20} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Thêm ảnh</span>
               </button>
            </div>
          </div>
        </div>
      </AdminModal>

      {/* Delete Confirmation */}
      <AdminConfirmModal 
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Xác nhận xóa xe"
        message={`Bạn có chắc chắn muốn xóa xe ${carToDelete?.name}? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
}
