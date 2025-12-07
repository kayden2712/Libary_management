import {useEffect, useCallback} from "react";

export default function Modal({children, onClose}) {

    // Callback an toàn cho ESC
    const handleClose = useCallback(() => {
        onClose && onClose();
    }, [onClose]);

    // Đóng modal khi bấm ESC
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [handleClose]);

    // Prevent scroll khi modal mở
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    // Ngăn sự kiện click nổi bọt ra backdrop
    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-60 transition-opacity"
                onClick={handleClose}
            />

            {/* Modal content */}
            <div
                role="dialog"
                aria-modal="true"
                className="relative bg-amber-50/95 text-amber-900 font-serif rounded-xl shadow-2xl border border-amber-200 z-20 max-w-lg w-full p-6 mx-4 transform transition-all duration-200 scale-95 animate-fadeIn"
                onClick={stopPropagation}
            >
                <button
                    type="button"
                    aria-label="Close modal"
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-amber-700 hover:text-amber-900 modal-close"
                >
                    ×
                </button>

                {children}
            </div>
        </div>
    );
}
