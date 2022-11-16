import ImageGallery from './ImageGallery';
import ImageUpload from './ImageUpload';
import { useState } from 'react';


const Home = ({user}) => {
    const [elements, setElements] = useState([{"_id":{"$oid":"6374f23e0318fa7c71b095ed"},
    "name":"Home",
    "description":"Holds everything you own",
    "contains":[{"_id":{"$oid":"6374e6401385323811642274"},
        "contains":[],
        "description":"Room for sleeping",
        "image":"6374ca55d3d5a8875bb47db7",
        "name":"Bedroom"},
        {"_id":{"$oid":"6374d0e97b1d3fbc15ab984e"},
        "name":"livingroom","description":"Cosy place to relax",
        "contains":[{"$oid":"6374f3680318fa7c71b095ee"},{"$oid":"6374fbb70318fa7c71b095fc"}],"image":{"$oid":"6374cc43fc54dbe7d04914bf"},"parent_id":{"$oid":"6374f23e0318fa7c71b095ed"}}
    ]}, 
    {"_id":{"$oid":"6374f23e0318fa7c71b095ed"},
    "name":"Home",
    "description":"Holds everything you own",
    "contains":[{"_id":{"$oid":"6374e6401385323811642274"},
        "contains":[],
        "description":"Room for sleeping",
        "image":"6374ca55d3d5a8875bb47db7",
        "name":"Bedroom2"},
        {"_id":{"$oid":"6374d0e97b1d3fbc15ab984e"},
        "name":"livingroom","description":"Cosy place to relax",
        "contains":[{"$oid":"6374f3680318fa7c71b095ee"},{"$oid":"6374fbb70318fa7c71b095fc"}],"image":{"$oid":"6374cc43fc54dbe7d04914bf"},"parent_id":{"$oid":"6374f23e0318fa7c71b095ed"}}
    ]}
])

    const [view, setView] = useState(elements)
    // https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80

    const [history, setHistory] = useState([{"name":"All", "contains": elements}])

    return (
        <div>
            <ul>
                {history.map((x, index) => <li key={x.name}><a href="" onClick={(e) => {
                    e.preventDefault();
                    setView(x.contains);
                    setHistory((previousHistory) => previousHistory.slice(0, index+1))
                }}>{x.name}</a></li>)}
            </ul>
            
            {user.name ? 
            <>
            <h1>{history[history.length-1].name}</h1>
            {view.map(element => <><p key={element.name}><a href="" onClick={(e) => {
                e.preventDefault();
                setHistory((previousHistory) => [...previousHistory, element])
                setView(element.contains);
                
                }}>{element.name}</a></p>
                <img class="img-thumbnail" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img></>)}
            </>
            :
            <p>Please log in to use this app.</p>
            }
        </div>
    )
};

export default Home;