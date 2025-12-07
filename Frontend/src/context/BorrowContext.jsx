import { createContext, useState, useEffect } from "react";
import api from "../api/api";

export const BorrowContext = createContext();

export function BorrowProvider({ children, user }) {
    const [borrows, setBorrows] = useState([]);

    // Load borrows khi user thay đổi
    useEffect(() => {
        if (!user) return;
        api.get('/borrow', { params: { userId: user.id } })
            .then(res => setBorrows(res.data || []))
            .catch(() => setBorrows([]));
    }, [user]);

    return (
        <BorrowContext.Provider value={{ borrows, setBorrows }}>
            {children}
        </BorrowContext.Provider>
    );
}
