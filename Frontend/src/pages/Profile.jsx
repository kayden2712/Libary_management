import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/api";
import PageLayout from "../components/PageLayout";

export default function Profile() {
    const { user, login } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address || ""
    });
    const [message, setMessage] = useState("");

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleUpdate = async () => {
        try {
            const res = await api.put(`/users/${user.id}`, form);
            login(res.data); // cập nhật user context
            setMessage("Cập nhật hồ sơ thành công!");
        } catch (err) {
            setMessage(err.response?.data?.message || "Cập nhật thất bại");
        }
    };

    return (
        <PageLayout title="Hồ sơ của tôi">
            <div className="max-w-md mx-auto p-6 bg-amber-50/90 rounded-lg border border-amber-200 drop-shadow-inner">
                {message && <p className="text-amber-800 mb-3">{message}</p>}
                <label className="block text-sm mb-1">Tên đăng nhập</label>
                <input name="username" value={form.username} onChange={handleChange} className="border p-2 rounded w-full mb-3" placeholder="Username"/>
                <label className="block text-sm mb-1">Email</label>
                <input name="email" value={form.email} onChange={handleChange} className="border p-2 rounded w-full mb-3" placeholder="Email"/>
                <label className="block text-sm mb-1">Số điện thoại</label>
                <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="border p-2 rounded w-full mb-3" placeholder="Phone Number"/>
                <label className="block text-sm mb-1">Địa chỉ</label>
                <input name="address" value={form.address} onChange={handleChange} className="border p-2 rounded w-full mb-3" placeholder="Address"/>
                <button onClick={handleUpdate} className="bg-amber-800 text-white p-2 rounded w-full">Cập nhật</button>
            </div>
        </PageLayout>
    );
}
