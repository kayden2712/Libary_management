import {useState, useEffect} from "react";
import api from "../api/api";
import {updateBook, deleteBook,addBook} from "../api/api";
import Modal from "../components/Modal";
import PageLayout from "../components/PageLayout";

export default function AdminPanel() {
    const [tab, setTab] = useState("books"); // books, categories, areas

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalType, setModalType] = useState(""); // add/edit
    const [modalEntity, setModalEntity] = useState(""); // book/category/area

    // Load data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const booksRes = await api.get("/books");
            setBooks(booksRes.data || []);

            const categoriesRes = await api.get("/categories");
            setCategories(categoriesRes.data || []);

            const areasRes = await api.get("/areas");
            setAreas(areasRes.data || []);
        } catch (err) {
            console.error(err);
        }
    };

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

    const renderTable = () => {
        const baseTable = (headCols, rows) => (
            <div className="overflow-x-auto bg-amber-50/90 rounded-lg p-3 border border-amber-200">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-amber-100">
                            {headCols.map((h,i) => <th key={i} className="border px-2 py-1 text-left">{h}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );

        switch (tab) {
            case "books":
                return baseTable(
                    ["ID","Title","Author","Category","Area","Actions"],
                    books.map((b) => (
                        <tr key={b.id} className="even:bg-amber-50">
                            <td className="border px-2 py-1">{b.id}</td>
                            <td className="border px-2 py-1">{b.title}</td>
                            <td className="border px-2 py-1">{b.author}</td>
                            <td className="border px-2 py-1">{b.category?.categoryName}</td>
                            <td className="border px-2 py-1">{b.area?.areaName}</td>
                            <td className="border px-2 py-1 space-x-2">
                                <button
                                    className="bg-amber-400 px-2 py-1 rounded"
                                    onClick={() => openModal("books", "edit", b)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete("books", b.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                );
            case "categories":
                return baseTable(
                    ["ID","Name","Area","Actions"],
                    categories.map((c) => (
                        <tr key={c.categoryId} className="even:bg-amber-50">
                            <td className="border px-2 py-1">{c.categoryId}</td>
                            <td className="border px-2 py-1">{c.categoryName}</td>
                            <td className="border px-2 py-1">{c.area?.areaName}</td>
                            <td className="border px-2 py-1 space-x-2">
                                <button
                                    className="bg-amber-400 px-2 py-1 rounded"
                                    onClick={() => openModal("categories", "edit", c)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete("categories", c.categoryId)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                );
            case "areas":
                return baseTable(
                    ["ID","Name","Description","Actions"],
                    areas.map((a) => (
                        <tr key={a.areaId} className="even:bg-amber-50">
                            <td className="border px-2 py-1">{a.areaId}</td>
                            <td className="border px-2 py-1">{a.areaName}</td>
                            <td className="border px-2 py-1">{a.description}</td>
                            <td className="border px-2 py-1 space-x-2">
                                <button
                                    className="bg-amber-400 px-2 py-1 rounded"
                                    onClick={() => openModal("areas", "edit", a)}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleDelete("areas", a.areaId)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                );
            default:
                return null;
        }
    };

    return (
        <PageLayout title="Admin Panel">

            {/* Tabs */}
            <div className="flex flex-wrap gap-3 mb-4">
                {["books", "categories", "areas"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`px-4 py-2 rounded ${
                            tab === t ? "bg-amber-800 text-white" : "bg-amber-100"
                        }`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {/* Add button */}
            <div className="mb-4">
                <button
                    className="bg-amber-800 text-white px-4 py-2 rounded"
                    onClick={() => openModal(tab, "add")}
                >
                    Thêm {tab.slice(0, -1)}
                </button>
            </div>

            {/* Table */}
            {renderTable()}

            {/* Modal */}
            {modalOpen && (
                <Modal onClose={closeModal}>
                    <h2 className="text-xl font-bold mb-4">
                        {modalType === "add" ? "Thêm" : "Sửa"} {modalEntity.slice(0, -1)}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-2">
                        {modalEntity === "books" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={modalData?.title || ""}
                                    onChange={(e) =>
                                        setModalData({...modalData, title: e.target.value})
                                    }
                                    className="border p-1 w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Author"
                                    value={modalData?.author || ""}
                                    onChange={(e) =>
                                        setModalData({...modalData, author: e.target.value})
                                    }
                                    className="border p-1 w-full"
                                    required
                                />
                                {/* Category & Area select */}
                            </>
                        )}
                        {modalEntity === "categories" && (
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={modalData?.categoryName || ""}
                                onChange={(e) =>
                                    setModalData({...modalData, categoryName: e.target.value})
                                }
                                className="border p-1 w-full"
                                required
                            />
                        )}
                        {modalEntity === "areas" && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Area Name"
                                    value={modalData?.areaName || ""}
                                    onChange={(e) =>
                                        setModalData({...modalData, areaName: e.target.value})
                                    }
                                    className="border p-1 w-full"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={modalData?.description || ""}
                                    onChange={(e) =>
                                        setModalData({...modalData, description: e.target.value})
                                    }
                                    className="border p-1 w-full"
                                    required
                                />
                            </>
                        )}
                        <div className="flex justify-end space-x-2 mt-2">
                            <button
                                type="button"
                                className="px-3 py-1 bg-amber-100 rounded"
                                onClick={closeModal}
                            >
                                Hủy
                            </button>
                            <button type="submit" className="px-3 py-1 bg-amber-800 text-white rounded">
                                Lưu
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </PageLayout>
    );
}
