import { MdDeleteForever } from 'react-icons/md'
import { AiFillEdit } from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import * as api from "../api"
import { UserContext } from '../contexts';
import { useContext, useState } from 'react';
import {motion } from 'framer-motion'
import Carousel from './Carousel';

const Card = ({element, addEvent, setHistory, setId, setCurrentContainer, currentContainer, index, screenWidth}) => {
    const navigate = useNavigate(),
        { contains, name, parent_id, _id, image, description } = element,
        { user } = useContext(UserContext),
        [isExpanded, setIsExpanded] = useState(false)

    return isExpanded ?  
        <div className='nested-carousel'>
            <div className="carousel-image">
                <img className="card-image" alt="temp" src={`data:image/png;base64,${image}`} />
            </div>
            <div className='new-carousel' >
                <Carousel currentContainer={element} show={screenWidth > 1655 ? 4 : screenWidth > 1200 ? 3 : 2} screenWidth={screenWidth} addEvent={addEvent} setHistory={setHistory} setId={setId} setCurrentContainer={setCurrentContainer} />
            </div>
        </div>
    : <motion.div className="card-cont" key={_id} whileHover={{ scale: 1.1, zIndex: 50 }}>
        <motion.div className="card" onClick={(e) => {
        if (contains) {
            if (screenWidth > 700) {
                setIsExpanded(true)
            } else {
                e.preventDefault();
                setHistory((previousHistory) => [...previousHistory, currentContainer])
                setId(_id)
            }
        }
    }}>          
        <p className="card-name">{name}</p>
        <p className="card-desc">{description}</p>
        <img className="card-image" alt="temp" src={`data:image/png;base64,${image}`}></img>
    </motion.div>
        <br></br>
        {!contains ? 
        <motion.div className='deleteButton'><MdDeleteForever className="deleteIcon" onClick={()=> {
            if(window.confirm(`Are you sure you want to delete ${name}?`)) {
                api.deleteItem(parent_id, _id).then(() => {
                    let newCurrentContainer = {...currentContainer};
                    newCurrentContainer.contains.splice(index,1);
                    setCurrentContainer(newCurrentContainer);
                    addEvent(user.name, new Date(), currentContainer.name, 'deleted', name )
                    alert(`${name} has been deleted.`)
                })
                
            }
            }}/></motion.div>
        : <motion.div className='deleteButton' whileHover={{scale: 2, zIndex: 50}} ><MdDeleteForever className="deleteIcon" onClick={()=> {
            if(window.confirm(`Are you sure you want to delete ${name} container?`)) {
                api.deleteContainer(_id).then(() => {
                    api.fetchContainerById(parent_id).then((data) => {
                        setCurrentContainer(data)
                        alert(`${name} has been deleted.`);
                        
                    })
                })
            }
            }}/></motion.div> }
        {contains ? <span className='containslength'>{contains.length}</span>: null}
        {contains ? <motion.div className='editButton' whileHover={{scale: 2, zIndex: 50}}><AiFillEdit className="editIcon" onClick={()=> {
            navigate(`/edit/container/${_id}`)}}/></motion.div>
            : <motion.div className='editButton' whileHover={{scale: 2, zIndex: 50}}><AiFillEdit className="editIcon" onClick={()=> {
                navigate(`/edit/item/${index}`)}}/></motion.div>}
        
        
    </motion.div>
        
}


export default Card