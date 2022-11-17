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
                "name":"Home",
                "description":"Holds everything you own",
                "contains":[]}
        ]}
    const [id, setId] = useState(testData)
    const [view, setView] = useState(null)

    useEffect(() => {
        setCurrentContainer(id)
        // console.log(currentContainer)
        // 
    }, [id])

    useEffect(() => {
        setView(currentContainer.contains)
    }, [currentContainer])

    // https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80

    const [history, setHistory] = useState([])
    
    if (view===null) return <p>loading</p>

    return (
        <div>
            <ul>
                {history.map((x, index, self) => <li key={x.name}><a href="" onClick={(e) => {
                    e.preventDefault();
                    setHistory((previousHistory) => previousHistory.slice(0, index))
                    console.log(history, '<<history', index, '<<<index', history.length, '<<<<<<<<<<<<<<<len')
                    setCurrentContainer(x)
                }}>{x.name}</a></li>)}
            </ul>
            
            {user.name ? 
            <>
            <h1>{currentContainer.name}</h1>
                    {view.map(element => <>
                        {element.hasOwnProperty('contains') ?
                            <p key={element.name}><a href="" onClick={(e) => {
                            e.preventDefault();
                            
                            setHistory((previousHistory) => [...previousHistory, currentContainer])
                            setId(element._id)
                            console.log(element._id)
                }}>{element.name}</a></p>: <p>{element.name}</p>}
                <img class="img-thumbnail" alt="temp" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
                </>)
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