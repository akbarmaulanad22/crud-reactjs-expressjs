import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Pages/Login';
import MainLayout from './Components/Layout/MainLayout';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route 
          path="/*" 
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;