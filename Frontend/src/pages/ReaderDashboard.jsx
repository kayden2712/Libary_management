import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function ReaderPanel() {
  const [user, setUser] = useState(null);
  const [myBorrows, setMyBorrows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Giả lập dữ liệu sách đã mượn
    setMyBorrows([
      { id: 1, bookTitle: 'Lập trình React', borrowDate: '2024-01-15', dueDate: '2024-02-15', status: 'Đang mượn' },
      { id: 2, bookTitle: 'JavaScript cơ bản', borrowDate: '2024-01-01', returnDate: '2024-01-20', status: 'Đã trả' },
    ]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <PageLayout title={`Reader Dashboard - ${user.fullName}`}>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-900">Trang của tôi</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-100 p-6 rounded-lg border-2 border-blue-300">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Sách đang mượn</h3>
          <p className="text-4xl font-bold text-blue-700">1</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg border-2 border-green-300">
          <h3 className="text-lg font-bold text-green-900 mb-2">Tổng sách đã mượn</h3>
          <p className="text-4xl font-bold text-green-700">2</p>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
        <h3 className="text-xl font-bold mb-4 text-amber-900">Lịch sử mượn sách</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-amber-200">
              <th className="border border-amber-300 px-4 py-2">ID</th>
              <th className="border border-amber-300 px-4 py-2">Tên sách</th>
              <th className="border border-amber-300 px-4 py-2">Ngày mượn</th>
              <th className="border border-amber-300 px-4 py-2">Hạn trả</th>
              <th className="border border-amber-300 px-4 py-2">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {myBorrows.map((borrow) => (
              <tr key={borrow.id} className="even:bg-amber-100">
                <td className="border border-amber-300 px-4 py-2">{borrow.id}</td>
                <td className="border border-amber-300 px-4 py-2">{borrow.bookTitle}</td>
                <td className="border border-amber-300 px-4 py-2">{borrow.borrowDate}</td>
                <td className="border border-amber-300 px-4 py-2">
                  {borrow.dueDate || borrow.returnDate}
                </td>
                <td className="border border-amber-300 px-4 py-2">
                  <span className={`px-2 py-1 rounded ${
                    borrow.status === 'Đang mượn' ? 'bg-yellow-200' : 'bg-green-200'
                  }`}>
                    {borrow.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-amber-100 p-4 rounded-lg border-2 border-amber-300">
        <h3 className="font-bold text-amber-900 mb-2">📚 Tìm sách mới</h3>
        <p className="text-amber-800">Truy cập trang Books để tìm và mượn sách mới!</p>
      </div>
    </PageLayout>
  );
}
