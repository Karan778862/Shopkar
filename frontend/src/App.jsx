import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Home from "./pages/user/Home";  // ✅ Public Home Page
import { useSelector } from "react-redux";
import SingleProduct from '@/pages/user/SingleProduct'

const App = () => {
    const { user, isAuthenticated } = useSelector((state) => state.user || { user: null, isAuthenticated: false });

    return (
        <Router>
            <Routes>
                {/* 🔥 Public Home Page (Login Required for Add to Cart & Order) */}
                <Route path="/" element={<Home />} />
                <Route path='/product/:id' element={<SingleProduct key={window.location.pathname}/>}/> 

                {/* ✅ Auth Routes (Login/Register) */}
                <Route path="/auth/*" element={<AuthRoutes />} />

                {/* ✅ User Routes (Sirf Logged-in Users Ja Sakte Hain) */}
                <Route path="/user/*" element={user ? <UserRoutes /> : <Navigate to="/auth/login" />} />

                {/* ✅ Admin Routes (Sirf Admin Ja Sakta Hai) */}
                <Route path="/admin/*" element={user?.role === "admin" ? <AdminRoutes /> : <Navigate to="/auth/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
