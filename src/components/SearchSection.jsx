import { useNavigate } from "react-router-dom";



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
    <div>
    <label htmlFor="search">Search Item:</label>
    <input type="text" id="search" placeholder="Search for an item" value={search} name="search" required onChange={handleChange}/>
    </div>
    <div>
    <input type="submit"/>
    </div>
    </form>
    </>
}

export default SearchSection