import react from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './Dashboard';
import Myprofile from './My profile';
import ViewCart from './ViewCart';
import ViewMore from './ViewInd';
import Favorites from './Favorites';
import Login from './Login';
import Order from './Order';
import Register from './Register';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path='/Register' element={<Register/>}/>
     <Route path='/Dashboard' element={<Dashboard/>}/>
     <Route path='/myprofile' element={<Myprofile/>}/>
     <Route path='/viewmore/:imagePath/:Model/:Price/:RAM/:ROM/:Camera/:Processor/:Ratings/:id/:description' element={<ViewMore/>}/>
     <Route path='/viewcart' element={<ViewCart/>}/>
     <Route path='/favorites' element={<Favorites/>}/>
     <Route path='/orders' element={<Order/>}/>
    </Routes>
    </BrowserRouter>  
    </div>
  );
}

export default App;
