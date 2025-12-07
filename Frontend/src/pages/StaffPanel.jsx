import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import PageLayout from '../components/PageLayout';

export default function StaffPanel() {
  const [user, setUser] = useState(null);
  const [borrows, setBorrows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra đăng nhập và quyền staff
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'STAFF' && parsedUser.role !== 'ADMIN') {
      navigate('/login');
      return;
    }

    setUser(parsedUser);
    fetchBorrows();
  }, [navigate]);

  const fetchBorrows = async () => {
    try {
      // Giả lập dữ liệu mượn sách
      setBorrows([
        { id: 1, bookTitle: 'React Basics', readerName: 'Nguyễn Văn A', borrowDate: '2024-01-15', status: 'Đang mượn' },
        { id: 2, bookTitle: 'JavaScript Advanced', readerName: 'Trần Thị B', borrowDate: '2024-01-10', returnDate: '2024-01-20', status: 'Đã trả' },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <PageLayout title={`Staff Panel - ${user.fullName}`}>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-900">Quản lý Mượn/Trả Sách</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-300">
          <h3 className="text-lg font-bold text-blue-900">Sách đang mượn</h3>
          <p className="text-3xl font-bold text-blue-700">5</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg border-2 border-green-300">
          <h3 className="text-lg font-bold text-green-900">Đã trả hôm nay</h3>
          <p className="text-3xl font-bold text-green-700">3</p>
        </div>
        <div className="bg-amber-100 p-4 rounded-lg border-2 border-amber-300">
          <h3 className="text-lg font-bold text-amber-900">Quá hạn</h3>
          <p className="text-3xl font-bold text-amber-700">2</p>
        </div>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg border-2 border-amber-200">
        <h3 className="text-xl font-bold mb-4 text-amber-900">Danh sách Mượn/Trả</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-amber-200">
              <th className="border border-amber-300 px-4 py-2">ID</th>
              <th className="border border-amber-300 px-4 py-2">Tên sách</th>
              <th className="border border-amber-300 px-4 py-2">Người mượn</th>
              <th className="border border-amber-300 px-4 py-2">Ngày mượn</th>
              <th className="border border-amber-300 px-4 py-2">Trạng thái</th>
              <th className="border border-amber-300 px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow) => (
              <tr key={borrow.id} className="even:bg-amber-100">
                <td className="border border-amber-300 px-4 py-2">{borrow.id}</td>
                <td className="border border-amber-300 px-4 py-2">{borrow.bookTitle}</td>
                <td className="border border-amber-300 px-4 py-2">{borrow.readerName}</td>
                <td className="border border-amber-300 px-4 py-2">{borrow.borrowDate}</td>
                <td className="border border-amber-300 px-4 py-2">
                  <span className={`px-2 py-1 rounded ${
                    borrow.status === 'Đang mượn' ? 'bg-yellow-200' : 'bg-green-200'
                  }`}>
                    {borrow.status}
                  </span>
                </td>
                <td className="border border-amber-300 px-4 py-2">
                  {borrow.status === 'Đang mượn' && (
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Xác nhận trả
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}
