import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";
import {Navigate} from "react-router-dom";

function PrivateRoute({ children, roles }) {
  const auth = useContext(AuthContext) || {};
  const { user, loading } = auth;

  // Nếu có trạng thái loading, hiển thị tạm
  if (loading) return <div>Loading...</div>;

  // Chưa đăng nhập
  if (!user) return <Navigate to="/login" replace />;

  // Sai quyền
  if (roles && (!user.role || !roles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
