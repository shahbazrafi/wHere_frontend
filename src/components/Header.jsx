import { Link } from 'react-router-dom';

const Header = ({user, setUser}) => {
    return (
        <header>
        <div className='logo'>
            <a href="/" className = "header-link"><p>wHere?</p></a>
        </div>
        <div className='profile'>
            {user.name ? 
            <p>Hi, {user.name}! | <a className = "header-link" href="" onClick={(e) => {
                e.preventDefault();
                setUser("");
            }}>Logout</a></p>
            : <p><a className = "header-link" href="" onClick={(e) => {
                e.preventDefault();
            }}>Login</a></p>
        }</div>
        </header>
    )
};

export default Header;