import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    withCredentials: true,
});

// interceptor request
api.interceptors.request.use(
    (config) => {
        // 1. Tìm token. Ưu tiên lấy từ object 'user' vì log của bạn cho thấy nó nằm ở đó
        let token = null;

        // Thử lấy từ object user
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                token = userObj.token; // Lấy token từ bên trong object
            } catch (e) {
                console.error("Lỗi parse JSON user", e);
            }
        }

        // Nếu không thấy trong user, thử tìm key lẻ (phòng hờ)
        if (!token) {
            token = localStorage.getItem('access_token');
        }

        // Các route không cần token
        const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot'];
        const isPublic = publicRoutes.some(route => config.url.includes(route));

        // 2. Gắn token vào header
        if (token && !isPublic) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// interceptor response
api.interceptors.response.use(
    (res) => res,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// --- Auth ---
export const registerUser = (payload) => api.post('/auth/register', payload);
export const loginUser = (payload) => api.post('/auth/login', payload);
export const forgotPassword = (payload) => api.post('/auth/forgot', payload);

// --- Books ---
export const getBooks = (search = "") => api.get('/books', {params: {search}, withCredentials: false});
export const addBook = (payload) => api.post('/books', payload);
export const updateBook = (id, payload) => api.put(`/books/${id}`, payload);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// --- Categories ---
export const getCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const addCategory = (payload) => api.post('/categories', payload);
export const updateCategory = (id, payload) => api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// --- Borrows / Return (Reader & Staff) ---
export const borrowBook = (payload) => api.post(`/borrows`, payload);
export const returnBook = (id) => api.put(`/borrows/${id}/return`);
export const deleteBorrow = (id) => api.delete(`/borrows/${id}`);
export const getBorrowedBooks = (userId) => api.get(`/borrows/user`, { params: { userId } });
export const getAllBorrows = () => api.get('/borrows');
export default api;
