import style from './HomeHeader.module.css'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase';
import useData from '../use-data';

const HomeHeader = () => {
    const [showLogout, setShowLogout] = useState(false)
    const navigate = useNavigate()
    const [key, setKey] = useState()
    const { profiles } = useData(key, 'subscription')
    const { profiles: employeesProfiles } = useData(key, 'employees')
    let countSub = 0;
    let countEmployees = 0;
    console.log(profiles);
    profiles.map(profile => countSub++)
    employeesProfiles.map(profile => countEmployees++)
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setKey(user.uid)
                setShowLogout(true)

            } else {
                setShowLogout(false)

            }
        });

    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/home");
        }).catch((error) => {

        });
    }


    return (
        <>
            <header className={style.header}>
                <div className={style.count}>
                    <Link to="/home" className={style.logo}>B | H</Link>
                    <div>Angajati: {countEmployees}</div>
                    <div>Abonamente: {countSub}</div>

                </div>
                <nav className={style.navigation}>
                    <ul className={style.content}>
                        <li>
                            <Link to="/hiring">Hiring</Link>
                            <Link to='/about'>About</Link>
                            <Link to='/cars'>Cars</Link>
                            <Link to='/subscription'>Subscription</Link>
                            <Link to='/contact'>Contact</Link>
                            {showLogout ? <Link to='/profile'>Profile</Link> : ''}
                            {showLogout ? <Link onClick={handleLogout}>Logout</Link> : <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                    <div className={style.menuBtn}>
                        <ul>
                            <li>
                                <Link to='/home'> Menu</Link>
                                <ul >
                                    <li><Link to="/hiring">Hiring</Link></li>
                                    <li><Link to='/about'>About</Link></li>
                                    <li><Link to='/cars'>Cars</Link></li>
                                    <li><Link to='/subscription'>Subscription</Link></li>
                                    <li><Link to='/contact'>Contact</Link></li>
                                    {showLogout ? <li> <Link to='/profile'>Profile</Link></li> : ''}
                                    {showLogout ? <Link onClick={handleLogout}>Logout</Link> : <Link to='/login'>Login</Link>}
                                </ul>
                            </li>
                        </ul>
                    </div>

                </nav>
            </header>

            <Outlet />
        </>
    )
}

export default HomeHeader