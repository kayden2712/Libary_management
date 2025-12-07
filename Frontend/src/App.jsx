import {Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider, AuthContext} from "./context/AuthContext";
import {useContext} from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Borrow from "./pages/Borrow";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import StaffPanel from "./pages/StaffPanel";
import ReaderDashboard from "./pages/ReaderDashboard";
import BorrowHistory from "./pages/BorrowHistory";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";


// ======================
// PRIVATE ROUTE
// ======================
function PrivateRoute({children, roles}) {
    const {user} = useContext(AuthContext);

    if (!user) return <Navigate to="/login"/>;

    if (roles && !roles.includes(user.role)) return <Navigate to="/"/>;

    return children;
}

export default function App() {
    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">

                <Navbar/>

                <div className="flex-grow">
                    <Routes>

                        {/* PUBLIC */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<LoginForm/>}/>
                        <Route path="/register" element={<RegisterForm/>}/>
                        <Route path="/books" element={<Books/>}/>

                        {/* PROFILE - tất cả các role */}
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute roles={["ADMIN", "STAFF", "READER"]}>
                                    <Profile/>
                                </PrivateRoute>
                            }
                        />

                        {/* DASHBOARD THEO ROLE */}
                        <Route
                            path="/admin/dashboard"
                            element={
                                <PrivateRoute roles={["ADMIN"]}>
                                    <AdminPanel/>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/staff/dashboard"
                            element={
                                <PrivateRoute roles={["STAFF"]}>
                                    <StaffPanel/>
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/reader/dashboard"
                            element={
                                <PrivateRoute roles={["READER"]}>
                                    <ReaderDashboard/>
                                </PrivateRoute>
                            }
                        />

                        {/* BORROW – Reader + Admin */}
                        <Route
                            path="/borrow"
                            element={
                                <PrivateRoute roles={["READER", "ADMIN"]}>
                                    <Borrow/>
                                </PrivateRoute>
                            }
                        />

                        {/* USERS – Admin only */}
                        <Route
                            path="/users"
                            element={
                                <PrivateRoute roles={["ADMIN"]}>
                                    <Users/>
                                </PrivateRoute>
                            }
                        />

                        {/* BORROW HISTORY – Admin only */}
                        <Route
                            path="/admin/borrow-history"
                            element={
                                <PrivateRoute roles={["ADMIN"]}>
                                    <BorrowHistory/>
                                </PrivateRoute>
                            }
                        />

                        {/* FALLBACK */}
                        <Route path="*" element={<Navigate to="/"/>}/>

                    </Routes>
                </div>

                <Footer/>
            </div>
        </AuthProvider>
    );
}
