import { Link, useParams } from "react-router-dom"

const Search = ({}) => {
    const {search_query} = useParams()
    return <>
    <Link to="/" ><p>Back</p></Link>
    <h1>test {search_query}</h1>
    </>
}

export default Search