import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../api.js'
import {BsPlusSquareFill} from 'react-icons/bs'
import Card from './Card.jsx';

const Home = ({ user, setCurrentContainer, currentContainer }) => {
    const [id, setId] = useState('6374f23e0318fa7c71b095ed')
    const [history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
            <ul>
                {history.map((x, index, self) => <a href="" onClick={(e) => {
                    e.preventDefault();
                    setId(x._id)
                    setHistory((previousHistory) => previousHistory.slice(0, index))
                }}><li key={x.index}>{x.name}</li></a>)}
            </ul>
            
            {user.name ? 
            <>
            <h1>{currentContainer.name}</h1>
                    {currentContainer.contains.map((element, index) => {
                        console.log(currentContainer.length)
                        let { name, image, description, _id, contains} = element;
                        return <Card  name={name} image={image} description={description} _id={_id} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} contains={contains} currentContainer={currentContainer} index={index}/>
                    }
                )}
        
                <Link to="/add"><BsPlusSquareFill /></Link>
            </>
            :
            <p>Please log in to use this app.</p>
            }
        </div>
    )
};
export default Home;