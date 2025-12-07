import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import BorrowCard from "../components/BorrowCard";
import { AuthContext } from "../context/AuthContext";
import PageLayout from "../components/PageLayout";
import Modal from "../components/Modal";

export default function Borrow() {
    const [borrows, setBorrows] = useState([]);
    const { user } = useContext(AuthContext);
    const [detailOpen, setDetailOpen] = useState(false);
    const [detailBorrow, setDetailBorrow] = useState(null);

    useEffect(() => {
        if (!user) return;
        // Readers see only their borrows; staff/admin see all borrows
        const url = user.role === 'READER' ? `/borrow/user/${user.id}` : '/borrow';
        api.get(url).then(res => setBorrows(res.data || [])).catch(() => setBorrows([]));
    }, [user]);

    const handleReturn = async (borrowId) => {
        try {
            await api.post(`/borrow/return/${borrowId}`);
            alert("Trả sách thành công!");
            setBorrows(prev => prev.map(b => b.borrowId === borrowId ? { ...b, status: "RETURNED" } : b));
        } catch (err) {
            alert(err.response?.data?.message || "Lỗi khi trả sách");
        }
    };

    const openDetail = (borrow) => {
        setDetailBorrow(borrow);
        setDetailOpen(true);
    };

    return (
        <PageLayout title={user?.role === 'READER' ? 'Mượn sách của bạn' : 'Danh sách phiếu mượn'}>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {borrows.map(b => (
                    <BorrowCard
                        key={b.borrowId}
                        borrow={b}
                        onReturn={(user && (user.role === 'ADMIN' || user.role === 'STAFF' || (user.role === 'READER' && user.id === b.userId))) ? handleReturn : null}
                        onDetail={openDetail}
                    />
                ))}
            </div>

            {detailOpen && detailBorrow && (
                <Modal onClose={() => setDetailOpen(false)}>
                    <h2 className="text-xl font-bold mb-2">Chi tiết phiếu mượn</h2>
                    <div className="space-y-2 text-sm text-amber-800">
                        <div><strong>Mã phiếu:</strong> {detailBorrow.borrowId}</div>
                        <div><strong>Sách:</strong> {detailBorrow.book?.title}</div>
                        <div><strong>Người mượn:</strong> {detailBorrow.user?.username || detailBorrow.userId}</div>
                        <div><strong>Ngày mượn:</strong> {detailBorrow.borrowDate}</div>
                        <div><strong>Hạn trả:</strong> {detailBorrow.dueDate}</div>
                        <div><strong>Trạng thái:</strong> {detailBorrow.status}</div>
                        {detailBorrow.notes && <div><strong>Ghi chú:</strong> {detailBorrow.notes}</div>}
                    </div>
                    <div className="mt-4 flex justify-end gap-2">
                        { (user && (user.role === 'ADMIN' || user.role === 'STAFF') && detailBorrow.status === 'BORROWED') && (
                            <button onClick={() => { handleReturn(detailBorrow.borrowId); setDetailOpen(false); }} className="px-3 py-1 bg-amber-800 text-white rounded">Đánh dấu trả</button>
                        )}
                        <button onClick={() => setDetailOpen(false)} className="px-3 py-1 bg-amber-100 rounded">Đóng</button>
                    </div>
                </Modal>
            )}
        </PageLayout>
    );
}
