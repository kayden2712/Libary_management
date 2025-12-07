import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { getAllBooks } from "../api";

export default function BookList({ onBorrow }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await getAllBooks();
            setBooks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {books.map((book) => (
                <BookCard key={book.id} book={book} onBorrow={onBorrow} />
            ))}
        </div>
    );
}
