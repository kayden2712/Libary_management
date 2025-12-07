import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Modal from "./Modal";

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
    <nav className="bg-white border-b shadow-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold">Library</Link>

        <div className="flex items-center gap-4">
          <Link to="/books" className="text-amber-900 hover:text-amber-700">Sách</Link>

          {!user && (
            <>
              <button type="button" onClick={() => { console.log('open login modal'); setLoginOpen(true); }} className="text-amber-800 hover:text-amber-700">Đăng nhập</button>
              <button type="button"
                onClick={() => { console.log('open register modal'); setRegisterOpen(true); }}
                className="rounded bg-amber-800 px-3 py-1.5 text-white hover:bg-amber-900"
              >
                Đăng ký
              </button>
            </>
          )}

          {user && (
            <>
              <Link to="/profile" className="text-amber-800 hover:text-amber-700">Hồ sơ</Link>
              {user.role === 'READER' && (
                <Link to="/borrow" className="text-amber-800 hover:text-amber-700">Mượn sách</Link>
              )}
              {user.role === 'ADMIN' && (
                <>
                  <Link to="/admin-panel" className="text-amber-800 hover:text-amber-700">Admin Panel</Link>
                  <Link to="/users" className="text-amber-800 hover:text-amber-700">Người dùng</Link>
                  <Link to="/borrow" className="text-amber-800 hover:text-amber-700">Mượn sách</Link>
                  <Link to="/admin/borrow-history" className="text-amber-800 hover:text-amber-700">Thống kê</Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
    {loginOpen && (
      <Modal onClose={() => setLoginOpen(false)}>
        <LoginForm onClose={() => setLoginOpen(false)} onOpenRegister={() => { setLoginOpen(false); setRegisterOpen(true); }} />
      </Modal>
    )}
    {registerOpen && (
      <Modal onClose={() => setRegisterOpen(false)}>
        <RegisterForm onClose={() => setRegisterOpen(false)} onOpenLogin={() => { setRegisterOpen(false); setLoginOpen(true); }} />
      </Modal>
    )}
    </>
  );
}