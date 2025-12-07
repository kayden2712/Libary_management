import { useState, useEffect, useContext } from "react";
import api from "../api/api";
import PageLayout from "../components/PageLayout";
import Modal from "../components/Modal";
import { AuthContext } from "../context/AuthContext";
import BookCard from "../components/BookCard";

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const [tab, setTab] = useState("books");

    // Data states
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [borrows, setBorrows] = useState([]);

    // Modal states
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalEntity, setModalEntity] = useState("");
    const [modalData, setModalData] = useState(null);

    // Load data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const booksRes = await api.get("/books");
            setBooks(booksRes.data || []);
            if (user.role !== "READER") {
                const categoriesRes = await api.get("/categories");
                setCategories(categoriesRes.data || []);
                const areasRes = await api.get("/areas");
                setAreas(areasRes.data || []);
                const borrowsRes = await api.get("/borrow");
                setBorrows(borrowsRes.data || []);
            } else {
                const myBorrowsRes = await api.get(`/borrow/user/${user.id}`);
                setBorrows(myBorrowsRes.data || []);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Modal functions
    const openModal = (entity, type, data = null) => {
        setModalEntity(entity);
        setModalType(type);
        setModalData(data);
        setModalOpen(true);
    };
    const closeModal = () => {
        setModalOpen(false);
        setModalData(null);
    };

    const handleDelete = async (entity, id) => {
        if (!window.confirm("Bạn có chắc muốn xóa?")) return;
        try {
            await api.delete(`/${entity}/${id}`);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (modalType === "add") {
                await api.post(`/${modalEntity}`, modalData);
            } else {
                await api.put(`/${modalEntity}/${modalData.id}`, modalData);
            }
            fetchData();
            closeModal();
        } catch (err) {
            console.error(err);
        }
    };

    const handleBorrow = async (bookId) => {
        try {
            await api.post("/borrow", { bookId, userId: user.id });
            alert("Mượn sách thành công!");
            setBooks(books.map(b => b.id === bookId ? { ...b, quantity: b.quantity - 1 } : b));
            fetchData();
        } catch (err) {
            alert(err.response?.data?.message || "Lỗi khi mượn sách");
        }
    };

    // Render table (Admin/Staff)
    const renderTable = () => {
        const baseTable = (headCols, rows) => (
            <div className="overflow-x-auto bg-amber-50/90 rounded-lg p-3 border border-amber-200">
                <table className="table-auto w-full border-collapse">
                    <thead>
                    <tr className="bg-amber-100">
                        {headCols.map((h, i) => <th key={i} className="border px-2 py-1 text-left">{h}</th>)}
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );

        switch (tab) {
            case "books":
                return baseTable(
                    ["ID", "Title", "Author", "Category", "Area", "Actions"],
                    books.map(b => (
                        <tr key={b.id} className="even:bg-amber-50">
                            <td className="border px-2 py-1">{b.id}</td>
                            <td className="border px-2 py-1">{b.title}</td>
                            <td className="border px-2 py-1">{b.author}</td>
                            <td className="border px-2 py-1">{b.category?.categoryName}</td>
                            <td className="border px-2 py-1">{b.area?.areaName}</td>
                            <td className="border px-2 py-1 space-x-2">
                                {(user.role === "STAFF" || user.role === "ADMIN") && (
                                    <>
                                        <button className="bg-amber-400 px-2 py-1 rounded" onClick={() => openModal("books", "edit", b)}>Sửa</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete("books", b.id)}>Xóa</button>
                                    </>
                                )}
                                {user.role === "READER" && (
                                    <button className="bg-green-500 text-white px-2 py-1 rounded" onClick={() => handleBorrow(b.id)}>Mượn</button>
                                )}
                            </td>
                        </tr>
                    ))
                );
            case "categories":
                return baseTable(
                    ["ID", "Name", "Area", "Actions"],
                    categories.map(c => (
                        <tr key={c.categoryId} className="even:bg-amber-50">
                            <td className="border px-2 py-1">{c.categoryId}</td>
                            <td className="border px-2 py-1">{c.categoryName}</td>
                            <td className="border px-2 py-1">{c.area?.areaName}</td>
                            <td className="border px-2 py-1 space-x-2">
                                {(user.role === "STAFF" || user.role === "ADMIN") && (
                                    <>
                                        <button className="bg-amber-400 px-2 py-1 rounded" onClick={() => openModal("categories", "edit", c)}>Sửa</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete("categories", c.categoryId)}>Xóa</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                );
            case "areas":
                return baseTable(
                    ["ID", "Name", "Description", "Actions"],
                    areas.map(a => (
                        <tr key={a.areaId} className="even:bg-amber-50">
                            <td className="border px-2 py-1">{a.areaId}</td>
                            <td className="border px-2 py-1">{a.areaName}</td>
                            <td className="border px-2 py-1">{a.description}</td>
                            <td className="border px-2 py-1 space-x-2">
                                {user.role === "ADMIN" && (
                                    <>
                                        <button className="bg-amber-400 px-2 py-1 rounded" onClick={() => openModal("areas", "edit", a)}>Sửa</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete("areas", a.areaId)}>Xóa</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                );
            case "borrow":
                return baseTable(
                    ["ID", "Book", "Borrow Date", "Due Date", "Status"],
                    borrows.map(b => (
                        <tr key={b.borrowId} className="even:bg-amber-50">
                            <td className="border px-2 py-1">{b.borrowId}</td>
                            <td className="border px-2 py-1">{b.book?.title}</td>
                            <td className="border px-2 py-1">{b.borrowDate}</td>
                            <td className="border px-2 py-1">{b.dueDate}</td>
                            <td className="border px-2 py-1">{b.status}</td>
                        </tr>
                    ))
                );
            default:
                return null;
        }
    };

    // Tabs based on role
    const tabs = [];
    if (user.role === "READER") tabs.push("books", "borrow");
    if (user.role === "STAFF") tabs.push("books", "categories", "borrow");
    if (user.role === "ADMIN") tabs.push("books", "categories", "areas", "borrow");

    return (
        <PageLayout title={`Dashboard - ${user.role}`}>
            {/* Logout button */}
            <div className="flex justify-end mb-4">
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Đăng xuất</button>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-4">
                {tabs.map(t => (
                    <button key={t} onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded ${tab === t ? "bg-amber-800 text-white" : "bg-amber-100"}`}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {/* Render content */}
            {renderTable()}

            {/* Modal for add/edit */}
            {modalOpen && (
                <Modal onClose={closeModal}>
                    <h2 className="text-xl font-bold mb-4">{modalType === "add" ? "Thêm" : "Sửa"} {modalEntity.slice(0, -1)}</h2>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {/* Example input for book */}
                        {modalEntity === "books" && (
                            <>
                                <input required placeholder="Title" value={modalData?.title || ""}
                                       onChange={e => setModalData({...modalData, title: e.target.value})}
                                       className="border p-2 w-full" />
                                <input required placeholder="Author" value={modalData?.author || ""}
                                       onChange={e => setModalData({...modalData, author: e.target.value})}
                                       className="border p-2 w-full" />
                            </>
                        )}
                        <div className="flex justify-end space-x-2 mt-2">
                            <button type="button" className="px-3 py-1 bg-amber-100 rounded" onClick={closeModal}>Hủy</button>
                            <button type="submit" className="px-3 py-1 bg-amber-800 text-white rounded">Lưu</button>
                        </div>
                    </form>
                </Modal>
            )}
        </PageLayout>
    );
}
