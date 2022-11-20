import { Link, useParams } from "react-router-dom"

const Search = ({}) => {
    const {search_query} = useParams()

    return <>
    <Link to="/" ><p>Back</p></Link>
    <h1>"{search_query}" items:</h1>
    </>
}

export default Search