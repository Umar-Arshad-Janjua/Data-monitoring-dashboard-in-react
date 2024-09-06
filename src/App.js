import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import './App.css'; 
import './transition.css'; 

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();  

  useEffect(() => {
  
    if (location.pathname !== '/') {
      navigate('/');
    }
  }, []);  
  
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen /> 
      ) : (
        <>
          <Navbar />
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames="page"
              timeout={300}
            >
              <Routes location={location}>
               
                <Route path="/" element={<Dashboard view="overall" />} />
                
                <Route path="/query" element={<Dashboard view="query" />} />
                
                <Route path="*" element={<Dashboard view="overall" />} />
              </Routes>
            </CSSTransition>
          </TransitionGroup>
        </>
      )}
    </div>
  );
}

export default App;
