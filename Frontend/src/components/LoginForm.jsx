import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser} from "../api";
import {AuthContext} from "../context/AuthContext";
import ForgotPasswordModal from "./ForgotPasswordModal";

export default function LoginForm({onClose, onOpenRegister}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [forgotOpen, setForgotOpen] = useState(false);

    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const isModal = typeof onClose === "function";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const {data} = await loginUser({username, password});

            if (data?.token) {
                // Lưu token vào localStorage
                localStorage.setItem("access_token", data.token);

                // Lưu user vào context
                login({
                    username: data.username,
                    role: data.role,
                    token: data.token,
                    id: data.id, // nếu backend trả userId
                });

                // Điều hướng theo role
                switch (data.role) {
                    case "ADMIN":
                        navigate("/admin-panel", {replace: true});
                        break;
                    case "STAFF":
                        navigate("/staff", {replace: true});
                        break;
                    case "READER":
                        navigate("/reader", {replace: true});
                        break;
                    default:
                        navigate("/", {replace: true});
                }

                if (isModal) onClose();
            }
        } catch (err) {
            console.error(err?.response);
            setError(err?.response?.data?.message || err?.message || "Đăng nhập thất bại");
        } finally {
            setSubmitting(false);
        }
    };

    const content = (
        <div
            className="max-w-md w-full bg-amber-50/90 border border-amber-200 rounded-lg p-6 drop-shadow-inner font-serif text-amber-900">
            <h2 className="text-2xl font-semibold text-center mb-4">Đăng nhập</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Tên đăng nhập</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập username"
                        required
                        className="mt-1 w-full border border-amber-200 rounded px-3 py-2 bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm mb-1">Mật khẩu</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                        className="mt-1 w-full border border-amber-200 rounded px-3 py-2 bg-white"
                    />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-amber-800 text-white px-4 py-2 rounded disabled:opacity-60"
                    >
                        {submitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            className="text-sm text-amber-800 hover:underline"
                            onClick={() =>
                                onOpenRegister ? onOpenRegister() : navigate("/register")
                            }
                        >
                            Đăng ký
                        </button>

                        <button
                            type="button"
                            className="text-sm text-amber-800 hover:underline"
                            onClick={() => setForgotOpen(true)}
                        >
                            Quên mật khẩu?
                        </button>
                    </div>
                </div>
            </form>

            {forgotOpen && <ForgotPasswordModal onClose={() => setForgotOpen(false)}/>}
        </div>
    );

    return isModal ? (
        <div>{content}</div>
    ) : (
        <div className="min-h-screen flex items-center justify-center">{content}</div>
    );
}
