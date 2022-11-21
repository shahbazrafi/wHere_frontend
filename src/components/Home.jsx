import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts.jsx';
import { Link } from 'react-router-dom';
import * as api from '../api.js'
import {BsPlusSquareFill} from 'react-icons/bs'
import Card from './Card.jsx';

const Home = ({ currentContainer, setCurrentContainer, id, setId, history, setHistory }) => {
    
    const [isLoading, setIsLoading] = useState(true),
        {user, setUser} = useContext(UserContext)

    useEffect(() => {
        setIsLoading(true)
        api.fetchContainer(id).then(data => {
            console.log(data, '<<<data in home')
            setCurrentContainer(data)
            setIsLoading(false)
        })
    }, [id])

    if (isLoading) return <p>Loading</p>

    return (
    <div>
    <ul className="history-list">
        {history.map((x, index) => <a className="history-item" key={x._id} href="" onClick={(e) => {
            e.preventDefault();
            setId(x._id)
            setHistory((previousHistory) => previousHistory.slice(0, index))
        }}><li key={x.index}>{x.name}</li></a>)}
    </ul>

    
    <h1>{currentContainer.name}</h1>
        <div className='card-field'>
            {currentContainer.contains.map((element, index) => {
                console.log(currentContainer.length)
                let { name, image, description, _id, contains, parent_id} = element;
                return <Card  name={name} image={image} description={description} _id={_id} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} contains={contains} currentContainer={currentContainer} index={index} parent_id={parent_id}/>
            }
            
        )}
        {currentContainer.contains.length===0 ? <p>Please add an item.</p> : null}
        </div>
        <div className='addIcon-cont'>
            <Link to="/add" ><BsPlusSquareFill className="addIcon" /></Link>
        </div>
    </div>
    )
};
export default Home;