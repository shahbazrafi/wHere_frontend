import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import * as api from "../api"


const Search = ({addEvent, setHistory, setId, setCurrentContainer, currentContainer}) => {
    const {search_query} = useParams()
    const [searchResult, setSearchResult] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        api.getSearch(search_query).then(data => {
            setSearchResult(data)
        })
        setIsLoading(false)
    }, [search_query])

    if (isLoading) return <p>Loading...</p>

    return <>
    <Link className="back-link" to="/" ><p className="history-item">Back</p></Link>
    <h1>"{search_query}" items:</h1>
    <div className='card-field'>
    
        {isLoading ? <p>Loading...</p> :
        
        searchResult.map((element) => {
            return <div className="card-cont">
            <p>{element.parent_name}:</p>
            <div className="card">
            <p className="card-name">{element.name}</p>
            <p className="card-desc">{element.description}</p>
            <img alt="" className="card-image" src={`data:image/png;base64,${element.img}`}></img>
            </div>
            </div>
        })}
    </div>
    </>
}

export default Search