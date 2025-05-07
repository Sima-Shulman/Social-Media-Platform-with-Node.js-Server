import React, { useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "../../services/UserContext";
import Info from "./Info";
import Todos from "../todos/Todos";
import Posts from "../posts/Posts";
import Albums from "../albums/Albums";
import NotFound from "../NotFound";
import styles from "./Home.module.css";

const Home = () => {
    const knownRoutes = ["/info", "/todos", "/posts", "/albums", "/home", "/login"];
    const { currentUser, setCurrentUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("currentUser"));
        if (storedUser && storedUser.username) {
            setCurrentUser(storedUser);
        } else {
            navigate("/login");
        }
    }, [setCurrentUser]);

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser({ username: "", id: "" });
        navigate("/login");
    };

    return (
        <div className={styles.homeContainer}>
            <nav className={styles.navBar}>
                <button onClick={() => navigate(`/users/${currentUser?.id}/home/info`)}>🛈 Info </button>
                <button onClick={() => navigate(`/users/${currentUser?.id}/home/todos`)}>✅ Todos</button>
                <button onClick={() => navigate(`/users/${currentUser?.id}/home/posts`)}> 📰 Posts</button>
                <button onClick={() => navigate(`/users/${currentUser?.id}/home/albums`)}> 📸 Albums</button>
                <button onClick={handleLogout}>🔒 Logout</button>
            </nav>

            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h2>Hi, {currentUser.username}</h2>
                </header>
                <Routes>
                    <Route path="info" element={<Info />} />
                    <Route path="todos" element={<Todos />} />
                    <Route path="posts/*" element={<Posts />} />
                    <Route path="albums/*" element={<Albums />} />
                    <Route path="/NotFound" element={<NotFound />} />
                    <Route
                        path="*"
                        element={
                            knownRoutes.some((route) =>
                                window.location.pathname.endsWith(route)
                            ) ? null : <Navigate to="/NotFound" replace />
                        }
                    />
                </Routes>
            </main>
        </div>
    );
};

export default Home;
