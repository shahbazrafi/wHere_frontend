import './App.css';
import './image.css';
import Header from './components/Header';
import Home from './components/Home';
import { useState } from 'react';

function App() {


  //fetchUsers();
  //fetchImages();
  
  const [user, setUser] = useState({"_id":{"$oid":"63735476c45a0c96d278035e"},"name":"cam","email":"cam_va@yahoo.co.uk","__v":{"$numberInt":"0"},"contains":"6374f23e0318fa7c71b095ed"});
  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Home user={user} />
    </div>
  );
}

export default App;
