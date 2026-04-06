export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-black mb-8 uppercase tracking-tight text-gray-900 border-b pb-4">Quản Trị Hệ Thống</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <span className="text-gray-500 font-bold mb-2 uppercase text-sm">Tổng xe</span>
            <span className="text-4xl font-black text-primary">12</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <span className="text-gray-500 font-bold mb-2 uppercase text-sm">Đang cho thuê</span>
            <span className="text-4xl font-black text-orange-500">5</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <span className="text-gray-500 font-bold mb-2 uppercase text-sm">Doanh thu tháng</span>
            <span className="text-2xl font-black text-green-600">45.000.000đ</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
            <span className="text-gray-500 font-bold mb-2 uppercase text-sm">Yêu cầu mới</span>
            <span className="text-4xl font-black text-red-500">3</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Danh sách đặt xe gần đây</h2>
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">Xem tất cả</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left font-medium">
              <thead>
                <tr className="border-b text-gray-500 text-sm">
                  <th className="pb-3 px-2">Mã Đặt Xe</th>
                  <th className="pb-3 px-2">Khách Hàng</th>
                  <th className="pb-3 px-2">Xe</th>
                  <th className="pb-3 px-2">Thời Gian</th>
                  <th className="pb-3 px-2">Trạng Thái</th>
                  <th className="pb-3 px-2">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                <tr className="border-b">
                  <td className="py-4 px-2 font-bold">#BK00123</td>
                  <td className="py-4 px-2">Nguyễn Văn A<br/><span className="text-gray-500 text-sm">0901234567</span></td>
                  <td className="py-4 px-2">VinFast VF5 Plus</td>
                  <td className="py-4 px-2">12/10 - 15/10/2023</td>
                  <td className="py-4 px-2">
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Chờ duyệt</span>
                  </td>
                  <td className="py-4 px-2">
                    <button className="text-primary hover:underline font-bold text-sm">Chi tiết</button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-2 font-bold">#BK00122</td>
                  <td className="py-4 px-2">Trần Thị B<br/><span className="text-gray-500 text-sm">0987654321</span></td>
                  <td className="py-4 px-2">VinFast VF3</td>
                  <td className="py-4 px-2">10/10 - 11/10/2023</td>
                  <td className="py-4 px-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Đang thuê</span>
                  </td>
                  <td className="py-4 px-2">
                    <button className="text-primary hover:underline font-bold text-sm">Chi tiết</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
