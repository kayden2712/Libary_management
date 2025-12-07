import React from "react";

export default function BookCard({book, onBorrow, onEdit, onDelete}) {
    return (
        <div className="border rounded-lg p-4 flex flex-col bg-amber-50/80 drop-shadow-inner border-amber-200">
            {/* Ảnh sách */}
            <img
                src={book.imageUrl || `/images/default-book.jpg`}
                alt={book.title}
                className="h-48 w-full object-cover rounded transition-transform duration-200 hover:scale-105"
            />

            {/* Thông tin sách */}
            <h3 className="font-semibold mt-3">{book.title}</h3>
            <p className="text-sm text-amber-800">{book.author}</p>
            <div className="mt-2 text-sm text-amber-700">Pages: {book.pages}</div>
            <div className="mt-1 text-sm text-amber-700">Quantity: {book.quantity}</div>

            {/* Nút hành động */}
            <div className="mt-3 flex gap-2 flex-wrap">
                {onBorrow && (
                    <button
                        onClick={() => onBorrow(book.id)}
                        className="bg-amber-800 text-white px-3 py-1 rounded disabled:opacity-60"
                        disabled={book.quantity === 0}
                    >
                        {book.quantity === 0 ? "Hết" : "Mượn"}
                    </button>
                )}
                {onEdit && (
                    <button
                        onClick={() => onEdit(book)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                        Sửa
                    </button>
                )}
                {onDelete && (
                    <button
                        onClick={() => onDelete(book.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Xóa
                    </button>
                )}
            </div>
        </div>
    );
}
