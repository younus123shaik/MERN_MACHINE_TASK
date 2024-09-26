import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Allcomponents from './components/Allcomponents';

function App() {



  return (
    <BrowserRouter>
      <Routes>

          <>
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<Allcomponents />} />
          </>
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
