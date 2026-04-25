import { Outlet, Link } from "react-router-dom"

const Header = () => {
    return (
        <>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/create_post">Create New Post</Link>
        </nav>
        <Outlet />
        </>
    )
}

export default Header;