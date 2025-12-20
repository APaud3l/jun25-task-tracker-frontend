import { Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar(){
    const { isAuthenticated, role, logout } = useAuth();

    // const handleFakeLogin = () => {
    //     login({ userId: '123', role: 'user', token: 'abcd' });
    // };

    return(
        <header>
            <h1>Task Tracker</h1>
            <nav>
                {
                !isAuthenticated ? (
                    <button onClick={handleFakeLogin} type="button">Fake Login</button>
                ): (
                    <>
                    <span>Logged in, ({role})</span>
                    <button type="button" onClick={logout}>Logout</button>
                    </>
                )  
                }
                <Link to="/">Home</Link> {" "}
                <Link to="/tasks">Tasks</Link> {" "}
                <Link to="/login">Login</Link> {" "}
                <Link to="/register">Register</Link> {" "}
            </nav>
        </header>
    )
}