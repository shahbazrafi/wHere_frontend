import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api.js'
import {BsPlusSquareFill} from 'react-icons/bs'


const Home = ({ user, setCurrentContainer, currentContainer }) => {
    const [id, setId] = useState('6374f23e0318fa7c71b095ed')
    const [history, setHistory] = useState([])

    useEffect(() => {
        if (id === null) {}
        else api.fetchContainer(id).then(data => {
            console.log(data, '<<<data in home')
            setCurrentContainer(data)
        })
    }, [id])

    return (
        <div>
            <ul>
                {history.map((x, index, self) => <a href="" onClick={(e) => {
                    e.preventDefault();
                    setId(null)
                    setCurrentContainer(x)
                    setHistory((previousHistory) => previousHistory.slice(0, index))
                }}><li key={x.index}>{x.name}</li></a>)}
            </ul>
            
            {user.name ? 
            <>
            <h1>{currentContainer.name}</h1>
            {currentContainer.contains.map((element, index) => <div key={element.name}>
                {element.hasOwnProperty('contains') ?
                    <a href="" onClick={(e) => {
                    e.preventDefault();
                    setHistory((previousHistory) => [...previousHistory, currentContainer])
                    setId(element._id)
                }}><p>{element.name}</p></a>: <p>{element.name}</p>}
            <img class="img-thumbnail" alt="temp" src={`data:image/png;base64,${element.image}`}></img>
            <br></br><button onClick={()=> {if(window.confirm(`Are you sure you want to delete ${element.name}?`)) {let newId = {...id};newId.contains.splice(index,1);setId(newId);alert(`${element.name} has been deleted.`)}}}>Delete {element.name}</button>
            </div>)
            }
                    <Link to="/add"><BsPlusSquareFill /></Link>
            </>
            :
            <p>Please log in to use this app.</p>
            }
        </div>
    )
};
export default Home;