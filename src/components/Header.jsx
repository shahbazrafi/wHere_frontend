import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts';
import { motion } from 'framer-motion'
import logo_img from '../imgs/letters.gif'

const Header = ({addEvent}) => {
    const {user, setUser} = useContext(UserContext)

    return (
        <header>
        <motion.div layout className='logo' >
            <a href="/" className = "header-link"><img src={logo_img} alt='wHere logo' /></a>
        </motion.div>
        <motion.div  className='profile'>
            {user.name ? 
            <motion.p whileHover={{scale: 1.2, translateX: -100}}>Hi, {user.name}! | <motion.a className = "header-link" href="" onClick={(e) => {
                e.preventDefault();
                addEvent(user.name, new Date(), 'Home', 'Logged ', 'out')
                setUser("");
            }}>Logout</motion.a></motion.p>
            : <motion.p><motion.a className = "header-link" href="" onClick={(e) => {
                e.preventDefault();
            }}>Login</motion.a></motion.p>
        }</motion.div>
        </header>
    )
};

export default Header;