import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Navbar = () => {



    const navItem = <>
        <li><Link>Products</Link></li>
        <li><Link>Template</Link></li>
        <li><Link>Integrations</Link></li>
        <li><Link>Resources</Link></li>
        <li><Link>Pricing</Link></li>
    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItem}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl">Form Builder</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end text-2xl">
                 <FaUserCircle></FaUserCircle>
            </div>
        </div>
    );
};

export default Navbar;