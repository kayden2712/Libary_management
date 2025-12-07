import {useState, useEffect, useContext} from "react";
import api, {getBooks} from "../api/api";
import BookCard from "../components/BookCard";
import {AuthContext} from "../context/AuthContext";
import PageLayout from "../components/PageLayout";

export default function Home() {
    const {user} = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    // Load books (tất cả hoặc theo search)
    const fetchBooks = async (q = "") => {
        try {
            const res = getBooks(q);
            setBooks(res.data || []);
        } catch (err) {
            console.error(err)
            setBooks([]);
        }
    };

    // Load books lần đầu
    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearch = () => {
        fetchBooks(search);
    };

    const handleBorrow = async (bookId) => {
        if (!user || user.role !== "READER") {
            alert("Bạn cần đăng nhập Reader để mượn sách");
            return;
        }
        try {
            await api.post("/borrow", {bookId, userId: user.id});
            alert("Mượn sách thành công!");

            //Giảm số lượng sách ngay trên UI
            setBooks(books.map(b => b.id === bookId ? {...b, quantity: b.quantity - 1} : b));
        } catch (err) {
            alert(err.response?.data?.message || "Lỗi khi mượn sách");
        }
    };

    return (
        <div className="vintage-bg min-h-screen text-amber-900">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <img
                    src="/images/banner.jpg"
                    alt="Library banner"
                    className="w-full h-96 object-cover filter sepia opacity-90"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-50/30 to-yellow-100/70 mix-blend-multiply"/>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-3xl text-center p-6">
                        <h1 className="text-5xl md:text-6xl font-serif font-bold drop-shadow-lg">Thư Viện Cổ Điển</h1>
                        <p className="mt-4 text-lg md:text-xl">Nơi cất giữ những câu chuyện vượt thời gian — đọc, mượn,
                            và khám phá.</p>
                        <div className="mt-6 flex justify-center">
                            <input
                                className="w-72 md:w-96 px-4 py-2 rounded-l border-t border-b border-l border-amber-300 bg-amber-50/60 placeholder:italic"
                                placeholder="Tìm sách, tác giả, chủ đề..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <button
                                className="bg-amber-800 text-white px-4 py-2 rounded-r font-semibold"
                                onClick={handleSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sách nổi bật / kết quả tìm kiếm */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <h2 className="text-3xl font-serif font-semibold mb-6">Kho sách</h2>
                {books.length === 0 ? (
                    <p className="text-amber-700">Không tìm thấy sách.</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {books.map(book => (
                            <BookCard
                                key={book.id}
                                book={book}
                                onBorrow={user?.role === "READER" ? () => handleBorrow(book.id) : null}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* CTA */}
            <section className="bg-amber-900/10 border-t border-amber-200">
                <div className="max-w-4xl mx-auto px-6 py-10 text-center">
                    <h3 className="text-2xl font-serif font-semibold">Tham gia cộng đồng độc giả</h3>
                    <p className="mt-3">Đăng ký để mượn sách, nhận thông báo sự kiện và cập nhật sổ sách mới nhất.</p>
                    <div className="mt-5">
                        <button className="bg-amber-800 text-white px-5 py-2 rounded font-semibold mr-3">Đăng ký
                        </button>
                        <button className="border border-amber-800 px-5 py-2 rounded font-semibold">Tìm hiểu thêm
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
