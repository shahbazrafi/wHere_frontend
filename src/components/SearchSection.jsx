import { useNavigate } from "react-router-dom";
import {HiSearchCircle} from 'react-icons/hi'
import {motion} from 'framer-motion'

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
    <motion.form onSubmit={handleSubmit} initial={{translateX: -3000}} animate={{translateX: 0}} transition={{duration: 1, delay: 0.3, type:'spring'}} >
    <motion.div className="search">
        <motion.input whileHover={{scale: 1.03}} className="search-field" type="text" id="search" placeholder="Search for an item" value={search} name="search" required onChange={handleChange}/>
        <HiSearchCircle id="search-btn">
            <motion.input type="submit" />
        </HiSearchCircle>
    </motion.div>
    </motion.form>
    </>
}

export default SearchSection