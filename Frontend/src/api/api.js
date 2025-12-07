import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080',
    withCredentials: true,
});

// interceptor request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        // Chỉ những route này TUYỆT ĐỐI KHÔNG CẦN token
        const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot', '/auth/reset'];
        // Kiểm tra xem URL hiện tại có nằm trong danh sách public cứng không
        const isPublicAuthRoute = publicRoutes.some(route => config.url.includes(route));

        // Nếu không phải public route và có token → attach Authorization
        if (!isPublicAuthRoute && token){
            config.headers['Authorization'] = `Bearer ${token}`;
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
export const getBookById = (id) => api.get(`/books/${id}`, {withCredentials: false});
export const addBook = (payload) => api.post('/books', payload);
export const updateBook = (id, payload) => api.put(`/books/${id}`, payload);
export const deleteBook = (id) => api.delete(`/books/${id}`);

// --- Categories ---
export const getCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const addCategory = (payload) => api.post('/categories', payload);
export const updateCategory = (id, payload) => api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// --- Borrow / Return (Reader & Staff) ---
export const borrowBook = (payload) => api.post('/borrow', payload);
export const returnBook = (payload) => api.post('/return', payload);
export const getBorrowedBooks = (userId) => api.get(`/borrow/user/${userId}`);
export const getAllBorrows = () => api.get('/borrow'); // Staff/Admin

export default api;
