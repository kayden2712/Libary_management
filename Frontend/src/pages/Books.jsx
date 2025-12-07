import { useEffect, useState, useContext } from "react";
import api, { deleteBook, updateBook,addBook } from "../api/api"; // Import thêm hàm update, delete nếu có trong api.js, hoặc dùng trực tiếp api.delete
import BookCard from "../components/BookCard";
import { AuthContext } from "../context/AuthContext";
import PageLayout from "../components/PageLayout";
import Modal from "../components/Modal";
import { toast } from 'react-toastify'; // Nên dùng toast để thông báo đẹp hơn alert

export default function Books() {
    const [books, setBooks] = useState([]);
    const { user } = useContext(AuthContext);
    
    console.log("Current User:", user); // Thêm dòng này để debug

    // Kiểm tra quyền Admin hoặc Staff
    // const isAdminOrStaff = user?.role === 'STAFF' || user?.role === 'ADMIN'; // Code cũ
    const isAdminOrStaff = true; // Sửa tạm thành true để test

    // Hàm load sách
    const loadBooks = () => {
        api.get("/books")
            .then(res => setBooks(res.data))
            .catch(() => setBooks([]));
    };

    useEffect(() => {
        loadBooks();
    }, []);

    // --- Xử lý Mượn (READER) ---
    const handleBorrow = async (bookId) => {
        try {
            // Giả sử API mượn sách là /borrow
            await api.post("/borrow", { bookId, userId: user.id, daysToBorrow: 14 });
            toast.success("Mượn sách thành công!");
            // Cập nhật lại số lượng hiển thị ngay lập tức
            setBooks(books.map(b => b.id === bookId ? { ...b, quantity: b.quantity - 1, availableQuantity: (b.availableQuantity || b.quantity) - 1 } : b));
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi khi mượn sách");
        }
    };

    // --- Xử lý Xóa (ADMIN/STAFF) ---
    const handleDelete = async (id) => {
        if (window.confirm("Bạn chắc chắn muốn xóa sách này?")) {
            try {
                await deleteBook(id); // Gọi API xóa
                toast.success("Đã xóa sách");
                loadBooks(); // Tải lại danh sách
            } catch (err) {
                toast.error(err.response?.data?.message || "Xóa thất bại");
            }
        }
    };

    // --- Xử lý Thêm & Sửa (ADMIN/STAFF) ---
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: null, title: '', author: '', pages: '', quantity: 1, imageUrl: '' });

    // Mở modal thêm mới
    const openAddModal = () => {
        setIsEditing(false);
        setFormData({ id: null, title: '', author: '', pages: '', quantity: 1, imageUrl: '' });
        setModalOpen(true);
    };

    // Mở modal sửa
    const openEditModal = (book) => {
        setIsEditing(true);
        setFormData({ 
            id: book.id, 
            title: book.title, 
            author: book.author, 
            pages: book.pages || 0, // Lưu ý: Backend có thể không có trường pages, thay bằng description hoặc category
            quantity: book.quantity,
            imageUrl: book.imageUrl || ''
        });
        setModalOpen(true);
    };

    const handleSaveBook = async (e) => {
        e?.preventDefault();
        try {
            const payload = { 
                ...formData, 
                pages: Number(formData.pages), 
                quantity: Number(formData.quantity),
                // Nếu backend cần categoryId, bạn cần thêm select box category vào form
                categoryId: 1 // Demo: set cứng categoryId = 1 nếu chưa làm select box
            };

            if (isEditing) {
                await updateBook(payload.id,payload);
                toast.success('Cập nhật thành công!');
            } else {
                await addBook(payload);
                toast.success('Thêm sách thành công!');
            }
            
            setModalOpen(false);
            loadBooks();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Lỗi khi lưu sách');
        }
    };

    return (
        <PageLayout title="Kho sách">
            <div className="flex justify-between items-center mb-4">
                <div />
                {isAdminOrStaff && (
                    <div>
                        <button onClick={openAddModal} className="bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900">
                            + Thêm sách
                        </button>
                    </div>
                )}
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {books.map(book => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        // Truyền hàm xử lý tương ứng với quyền
                        onBorrow={user?.role === 'READER' ? handleBorrow : null}
                        onEdit={isAdminOrStaff ? () => openEditModal(book) : null}
                        onDelete={isAdminOrStaff ? () => handleDelete(book.id) : null}
                    />
                ))}
            </div>

            {modalOpen && (
                <Modal onClose={() => setModalOpen(false)}>
                    <h2 className="text-xl font-bold mb-3 text-amber-900">
                        {isEditing ? 'Cập nhật sách' : 'Thêm sách mới'}
                    </h2>
                    <form onSubmit={handleSaveBook} className="space-y-3">
                        <div>
                            <label className="block text-sm text-gray-600">Tiêu đề</label>
                            <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="border p-2 w-full rounded" />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-600">Tác giả</label>
                            <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="border p-2 w-full rounded" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600">Số trang</label>
                                <input type="number" value={formData.pages} onChange={e => setFormData({...formData, pages: e.target.value})} className="border p-2 w-full rounded" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600">Số lượng</label>
                                <input required type="number" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} className="border p-2 w-full rounded" />
                            </div>
                        </div>
                         <div>
                            <label className="block text-sm text-gray-600">Link ảnh</label>
                            <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="border p-2 w-full rounded" placeholder="https://..." />
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button type="button" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setModalOpen(false)}>Hủy</button>
                            <button type="submit" className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900">
                                {isEditing ? 'Lưu thay đổi' : 'Thêm mới'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </PageLayout>
    );
}
