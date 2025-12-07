import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { getBooks } from '../api/api'; // Import API
import { toast } from 'react-toastify';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            const response = await getBooks(); // Gọi API thật
            setBooks(response.data);
        } catch (error) {
            console.error("Failed to fetch books", error);
            toast.error("Không thể tải danh sách sách");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    if (loading) return <div className="text-center p-10">Đang tải sách...</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
};

export default BookList;
