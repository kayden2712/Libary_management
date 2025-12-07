import { useContext } from "react";
import { BorrowContext } from "../context/BorrowContext";
import PageLayout from "../components/PageLayout";

export default function BorrowHistory() {
  const { borrows } = useContext(BorrowContext);

  const total = borrows.length;
  const returned = borrows.filter(b => b.status === 'RETURNED').length;
  const borrowed = borrows.filter(b => b.status === 'BORROWED').length;

  return (
      <PageLayout title="Lịch sử mượn">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-amber-50/90 rounded border border-amber-200">
            <div className="text-sm text-amber-700">Tổng phiếu</div>
            <div className="text-2xl font-semibold">{total}</div>
          </div>
          <div className="p-4 bg-amber-50/90 rounded border border-amber-200">
            <div className="text-sm text-amber-700">Đang mượn</div>
            <div className="text-2xl font-semibold">{borrowed}</div>
          </div>
          <div className="p-4 bg-amber-50/90 rounded border border-amber-200">
            <div className="text-sm text-amber-700">Đã trả</div>
            <div className="text-2xl font-semibold">{returned}</div>
          </div>
        </div>

        <div className="overflow-x-auto bg-amber-50/90 rounded border border-amber-200 p-3">
          <table className="table-auto w-full border-collapse">
            <thead>
            <tr className="bg-amber-100">
              <th className="border px-2 py-1 text-left">Mã</th>
              <th className="border px-2 py-1 text-left">Sách</th>
              <th className="border px-2 py-1 text-left">Ngày mượn</th>
              <th className="border px-2 py-1 text-left">Hạn trả</th>
              <th className="border px-2 py-1 text-left">Trạng thái</th>
            </tr>
            </thead>
            <tbody>
            {borrows.map(b => (
                <tr key={b.borrowId} className="even:bg-amber-50">
                  <td className="border px-2 py-1">{b.borrowId}</td>
                  <td className="border px-2 py-1">{b.book?.title}</td>
                  <td className="border px-2 py-1">{b.borrowDate}</td>
                  <td className="border px-2 py-1">{b.dueDate}</td>
                  <td className="border px-2 py-1">{b.status}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </PageLayout>
  );
}
