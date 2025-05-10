import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from "../services/UserContext";
import Login from './user/Login';
import Register from './user/Register';
import Home from './Home/Home';
import NotFound from './NotFound';


function Main() {
    return (
        <>
            <UserProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                        <Route path="/users/:id/home/*" element={<Home />}></Route>
                        <Route path="/NotFound" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/NotFound" replace />} />
                    </Routes >
                </Router>
            </UserProvider>
        </>
    )
}
export default Main;
