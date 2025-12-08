import {useEffect, useState, useContext} from "react";
import api, {borrowBook, deleteBorrow, returnBook} from "../api/api";
import BorrowCard from "../components/BorrowCard";
import {AuthContext} from "../context/AuthContext";
import PageLayout from "../components/PageLayout";
import Modal from "../components/Modal";
import {toast} from "react-toastify";

export default function Borrows() {
    const [borrows, setBorrows] = useState([]);
    const {user} = useContext(AuthContext);

    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);

    const [detailBorrow, setDetailBorrow] = useState(null);

    const [formData, setFormData] = useState({
        borrowId: null,
        userId: "",
        bookId: "",
        daysToBorrow: 14
    });

    const isAdminOrStaff = user?.role === "ADMIN" || user?.role === "STAFF";

    // LOAD BORROWS
    const loadBorrows = () => {
        if (!user) return;
        const url = user.role === "READER" ? `/borrows/user/${user.id}` : `/borrows`;

        api.get(url)
            .then(res => setBorrows(res.data || []))
            .catch(() => setBorrows([]));
    };

    useEffect(() => {
        loadBorrows();
    }, [user]);

    // Mở modal thêm mới
    const openAddModal = () => {
        setIsEditing(false);
        setFormData({
            borrowId: null,
            userId: "",
            bookId: "",
            daysToBorrow: 14
        });
        setModalOpen(true);
    };

    // Mở modal sửa
    const openEditModal = (borrow) => {
        setIsEditing(true);
        setFormData({
            borrowId: borrow.borrowId,
            userId: borrow.userId,
            bookId: borrow.bookId,
            daysToBorrow: borrow.daysToBorrow || 14
        });
        setModalOpen(true);
    };

    // Xử lý thêm
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                userId: Number(formData.userId),
                bookId: Number(formData.bookId),
                daysToBorrow: Number(formData.daysToBorrow)
            };

            if (!isEditing) {
                await borrowBook(payload);
                toast.success("Tạo phiếu mượn thành công!");
            }

            setModalOpen(false);
            loadBorrows();
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi khi lưu phiếu");
        }
    };

    // DELETE BORROW
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa phiếu mượn này?")) return;

        try {
            await deleteBorrow(id);
            toast.success("Đã xóa phiếu mượn");
            loadBorrows();
        } catch (err) {
            toast.error(err.response?.data?.message || "Xóa thất bại");
        }
    };

    // RETURN BOOK
    const handleReturn = async (borrowId) => {
        try {
            await returnBook(borrowId);
            toast.success("Trả sách thành công!");
            loadBorrows();
        } catch (err) {
            toast.error(err.response?.data?.message || "Trả sách thất bại");
        }
    };

    const openDetail = (borrow) => {
        setDetailBorrow(borrow);
        setDetailOpen(true);
    };

    return (
        <PageLayout title="Quản lý phiếu mượn">
            <div className="flex justify-end mb-3">
                {isAdminOrStaff && (
                    <button
                        onClick={openAddModal}
                        className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900"
                    >
                        + Thêm phiếu mượn
                    </button>
                )}
            </div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
                {borrows.map(b => (
                    <BorrowCard
                        key={b.borrowId}
                        borrow={b}
                        onReturn={handleReturn}
                        onDetail={openDetail}
                        onEdit={isAdminOrStaff ? () => openEditModal(b) : null}
                        onDelete={isAdminOrStaff ? () => handleDelete(b.borrowId) : null}
                    />
                ))}
            </div>

            {/* ADD/EDIT MODAL */}
            {modalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    <h2 className="text-xl font-bold mb-2">
                        {isEditing ? "Cập nhật phiếu mượn" : "Thêm phiếu mượn mới"}
                    </h2>

                    <form onSubmit={handleSave} className="space-y-3">
                        <div>
                            <label className="block text-sm">User ID</label>
                            <input
                                required
                                type="number"
                                value={formData.userId}
                                onChange={(e) =>
                                    setFormData({...formData, userId: e.target.value})
                                }
                                className="border p-2 w-full rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm">Book ID</label>
                            <input
                                required
                                type="number"
                                value={formData.bookId}
                                onChange={(e) =>
                                    setFormData({...formData, bookId: e.target.value})
                                }
                                className="border p-2 w-full rounded"
                            />
                        </div>

                        <div>
                            <label className="block text-sm">Số ngày mượn</label>
                            <input
                                type="number"
                                value={formData.daysToBorrow}
                                onChange={(e) =>
                                    setFormData({...formData, daysToBorrow: e.target.value})
                                }
                                className="border p-2 w-full rounded"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                Hủy
                            </button>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900"
                            >
                                {isEditing ? "Lưu thay đổi" : "Thêm mới"}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* DETAIL MODAL */}
            {detailOpen && detailBorrow && (
                <Modal onClose={() => setDetailOpen(false)}>
                    <h2 className="text-xl font-bold mb-3">Chi tiết phiếu mượn</h2>

                    <div className="space-y-2 text-sm text-amber-800">
                        <div><strong>ID:</strong> {detailBorrow.borrowId}</div>
                        <div><strong>Book:</strong> {detailBorrow.book?.title}</div>
                        <div><strong>User:</strong> {detailBorrow.user?.username || detailBorrow.userId}</div>
                        <div><strong>Ngày mượn:</strong> {detailBorrow.borrowDate}</div>
                        <div><strong>Ngày trả:</strong> {detailBorrow.dueDate}</div>
                        <div><strong>Trạng thái:</strong> {detailBorrow.status}</div>
                    </div>

                    <div className="mt-4 flex justify-end gap-2">
                        {isAdminOrStaff && detailBorrow.status === "BORROWED" && (
                            <button
                                onClick={() => {
                                    handleReturn(detailBorrow.borrowId);
                                    setDetailOpen(false);
                                }}
                                className="px-3 py-1 bg-amber-800 text-white rounded"
                            >
                                Đánh dấu trả
                            </button>
                        )}

                        <button
                            className="px-3 py-1 bg-amber-100 rounded"
                            onClick={() => setDetailOpen(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </Modal>
            )}
        </PageLayout>
    );
}
