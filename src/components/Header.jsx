import { Link } from 'react-router-dom';

const Header = ({user, setUser}) => {
    return (
        <header>
        <div className = "flex">
        <div className = "left-side">
            <a href="/" className = "header-link"><p>wHere?</p></a>
        </div>
        <div className = "right-side">
            {user.name ? 
            <p>Hi, {user.name}! | <a className = "header-link" href="" onClick={(e) => {
                e.preventDefault();
                setUser("");
            }}>Logout</a></p>
            : <p><a className = "header-link" href="" onClick={(e) => {
                e.preventDefault();
                setUser({"_id":{"$oid":"63735476c45a0c96d278035e"},"name":"cam","email":"cam_va@yahoo.co.uk","__v":{"$numberInt":"0"},"contains":"6374f23e0318fa7c71b095ed"});
            }}>Login</a></p>
        }
        </div>
        </div>
        </header>
    )
};

export default Header;