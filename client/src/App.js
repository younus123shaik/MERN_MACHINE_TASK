import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allcomponents from './components/Allcomponents';
import { useState, useEffect } from 'react';

function App() {
  const [isauth, setisauth] = useState(false);

  // useEffect to avoid too many re-renders
  useEffect(() => {
    if (localStorage.getItem("cred") !== null) {
      setisauth(true);
    }
  }, [isauth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        {isauth ? (
          <Route path='/*' element={<Allcomponents />} />
        ) : (
          <Route path='/*' element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
