import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Home = ({ user, setCurrentContainer, currentContainer }) => {
    const wardrobeData = {
        "_id": {"$oid": "6374e9561385323811642276"},
        "contains": [{"name":"Passport"}],
        "description": "Stores your clothes",
        "image": "6374c6e7d3d5a8875bb47d9f",
        "name": "wardrobe",
        "parent_id": "6374e6401385323811642274"
      }
    const testBedroomData = {"_id":{"$oid":"6374e6401385323811642274"},
    "contains":[{
        "_id": wardrobeData,
        "contains": [],
        "description": "Stores your clothes",
        "image": "6374c6e7d3d5a8875bb47d9f",
        "name": "wardrobe",
        "parent_id": "6374e6401385323811642274"
      }],
    "description":"Room for sleeping",
    "image":"6374ca55d3d5a8875bb47db7",
    "name":"Bedroom"
    }
    const testHomeData = {"_id":{"$oid":"6374f23e0318fa7c71b095ed"},
    "name":"Home",
    "description":"Holds everything you own",
    "contains":[
    {"_id":testBedroomData,
        "contains":[],
        "description":"Room for sleeping",
        "image":"6374ca55d3d5a8875bb47db7",
        "name":"Bedroom"},
    {"_id": { "$oid": "6374d0e97b1d3fbc15ab984e" },
        "name":"livingroom","description":"Cosy place to relax",
        "contains":[],
        "image":{"$oid":"6374cc43fc54dbe7d04914bf"},
        "parent_id":{"$oid":"6374f23e0318fa7c71b095ed"}}
    ]}
    const testData = {
            "name": "All",
            "_id": { "$oid": "test" },
            "contains": [{
                "_id": testHomeData,
                "name":'Home',
                "description":"Holds everything you own",
                "contains":[]}, 
            {"_id":{"$oid":"6374f23e0318fa7c71b095ed"},
                "name":"Home2",
                "description":"Holds everything you own",
                "contains":[]}
        ]}

    const [id, setId] = useState(testData)
    const [history, setHistory] = useState([])

    useEffect(() => {
        setCurrentContainer(id)
        // console.log(id, "<<id")
    }, [id])

    return (
        <div>
            <ul>
                {history.map((x, index, self) => <a href="" onClick={(e) => {
                    e.preventDefault();
                    setId(x)
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
            <img class="img-thumbnail" alt="temp" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
            <br></br><button onClick={()=> {if(window.confirm(`Are you sure you want to delete ${element.name}?`)) {let newId = {...id};newId.contains.splice(index,1);setId(newId);alert(`${element.name} has been deleted.`)}}}>Delete {element.name}</button>
            </div>)
            }
            <Link to="/add"><p>Add button</p></Link>
            </>
            :
            <p>Please log in to use this app.</p>
            }
        </div>
    )
};

export default Home;