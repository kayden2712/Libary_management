import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { toast } from "react-toastify";

const RegisterForm = ({ onClose, onOpenLogin }) => {
    const navigate = useNavigate();
    const isModal = typeof onClose === "function";

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    // HANDLE INPUT CHANGE
    const handleChange = ({ target: { name, value } }) => {
        if (name === "phoneNumber" && !/^\d*$/.test(value)) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // VALIDATION
    const validate = () => {
        const { username, password, email, phoneNumber } = formData;

        if (!username.trim()) {
            toast.error("Tên đăng nhập không được để trống");
            return false;
        }
        if (password.length < 6) {
            toast.error("Mật khẩu phải có ít nhất 6 ký tự");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp");
            return false;
        }
        if (!email.includes("@")) {
            toast.error("Email không hợp lệ");
            return false;
        }
        if (phoneNumber && !/^(0[3-9])\d{8}$/.test(phoneNumber)) {
            toast.error("Số điện thoại không hợp lệ");
            return false;
        }
        return true;
    };

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (submitting || !validate()) return;

        setSubmitting(true);

        try {
            await registerUser(formData);
            toast.success("Đăng ký thành công!");

            if (isModal) {
                onOpenLogin?.() || onClose?.();
            } else {
                navigate("/login");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Đăng ký thất bại");
        } finally {
            setSubmitting(false);
        }
    };

    // FORM UI
    const content = (
        <div className="max-w-md w-full bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-md font-serif text-amber-900">
            <h2 className="text-2xl font-bold text-center mb-4">Đăng ký tài khoản</h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
                <InputField
                    label="Tên đăng nhập"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="Mật khẩu"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <InputField
                    label="Số điện thoại (tùy chọn)"
                    name="phoneNumber"
                    type="text"
                    maxLength={10}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-2 mt-2 rounded text-white ${
                        submitting
                            ? "bg-amber-600 cursor-not-allowed"
                            : "bg-amber-800 hover:bg-amber-900"
                    }`}
                >
                    {submitting ? "Đang đăng ký..." : "Đăng ký"}
                </button>
            </form>

            <div className="mt-3 text-center">
                <button
                    type="button"
                    className="text-amber-800 hover:underline"
                    onClick={() => (onOpenLogin ? onOpenLogin() : navigate("/login"))}
                >
                    Bạn đã có tài khoản? Đăng nhập
                </button>
            </div>
        </div>
    );

    return isModal ? (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            {content}
        </div>
    ) : (
        <div className="min-h-screen flex items-center justify-center p-4">{content}</div>
    );
};

export default RegisterForm;

// ---------------------------
// COMPONENT INPUT FIELD
// ---------------------------
const InputField = ({ label, name, ...props }) => (
    <div>
        <label className="block text-sm mb-1">{label}</label>
        <input
            id={name}
            name={name}
            {...props}
            className="w-full px-3 py-2 border border-amber-200 rounded bg-white"
            placeholder={label}
        />
    </div>
);
