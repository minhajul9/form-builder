import { useContext } from 'react';
import { FaGoogle, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
const Navbar = () => {

    const {user, googleSignIn, logOut} = useContext(AuthContext)

    // console.log(user);
    const navItem = <>
        <li><Link>Products</Link></li>
        <li><Link>Template</Link></li>
        <li><Link>Integrations</Link></li>
        <li><Link>Resources</Link></li>
        <li><Link>Pricing</Link></li>
    </>

    const handleGoogleLogin = () =>{
        googleSignIn()
        .then(result =>{
            // console.log(result);
        })
    }

    const handleLogOut = () =>{
        logOut()
        .then()
        .catch(result => {
            console.log(result);
        })
    }

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
                 {
                    user ? 
                    <>
                    <img className='w-16 rounded-full' src={user.photoURL}></img> 
                    <button onClick={handleLogOut} className='btn btn-ghost text-xs'>Log Out</button>
                    </>
                    : <button onClick={handleGoogleLogin}><FaGoogle></FaGoogle></button>
                 }
            </div>
        </div>
    );
};

export default Navbar;