import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ElementUpload from './components/ElementUpload';
import Search from './components/Search'
import SearchSection from './components/SearchSection';
import Edit from './components/Edit';

function App() {
  const [currentContainer, setCurrentContainer] = useState({ "name": "All", "contains": [] })
  const [id, setId] = useState('6374f23e0318fa7c71b095ed')
  const [history, setHistory] = useState([])
  const [user, setUser] = useState({"_id":{"$oid":"63735476c45a0c96d278035e"},"name":"cam","email":"cam_va@yahoo.co.uk","__v":{"$numberInt":"0"},"contains":"6374f23e0318fa7c71b095ed"});
  const [search, setSearch] = useState("")
  return (
    <BrowserRouter>
      <div className="App">
        <Header user={user} setUser={setUser} />
        {user.name ?
        <Routes>
          <Route path='/' element={<><SearchSection search={search} setSearch={setSearch}/><Home user={user} currentContainer={currentContainer} setCurrentContainer={setCurrentContainer} id={id} setId={setId} history={history} setHistory={setHistory}/></>} />
          <Route path='/add' element={<ElementUpload user={user} currentContainer={currentContainer}/>} />
          <Route path='/search/:search_query' element={<Search />}></Route>
          <Route path='/edit/:id' element={<Edit />}></Route>
        </Routes>
        : <p>Please log in to use this app.</p>}
      </div>
      
    </BrowserRouter>
  );
}

export default App;
