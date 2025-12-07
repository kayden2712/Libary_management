export default function BorrowCard({ borrow, onReturn, onDetail }) {
    return (
        <div className="border rounded-lg p-4 flex flex-col bg-amber-50/80 drop-shadow-inner border-amber-200">
            <h3 className="font-semibold">{borrow.book?.title || '—'}</h3>
            <p className="text-sm text-amber-800">Người mượn: {borrow.user?.username || borrow.userId}</p>
            <p className="text-sm text-amber-700">Ngày mượn: {borrow.borrowDate}</p>
            <p className="text-sm text-amber-700">Hạn trả: {borrow.dueDate}</p>
            <p className="text-sm text-amber-700">Trạng thái: {borrow.status}</p>

            <div className="mt-3 flex gap-2">
                {onDetail && (
                    <button onClick={() => onDetail(borrow)} className="px-3 py-1 bg-amber-100 rounded">Chi tiết</button>
                )}

                {onReturn && borrow.status === "BORROWED" && (
                    <button onClick={() => onReturn(borrow.borrowId)} className="bg-amber-800 text-white px-3 py-1 rounded">Trả sách</button>
                )}
            </div>
        </div>
    );
}
