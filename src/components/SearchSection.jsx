import { useNavigate } from "react-router-dom";
import {HiSearchCircle} from 'react-icons/hi'



const SearchSection = ({search, setSearch}) => {
    const navigate = useNavigate();
    const handleChange = (e) => {
        setSearch(e.target.value)
        console.log(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        navigate(`/search/${search}`)
    }

    return <>
    <form onSubmit={handleSubmit}>
    <div className="search">
        <input className="search-field" type="text" id="search" placeholder="Search for an item" value={search} name="search" required onChange={handleChange}/>
        <HiSearchCircle id="search-btn">
            <input type="submit" />
        </HiSearchCircle>
    </div>
    
    
    
    </form>
    </>
}

export default SearchSection