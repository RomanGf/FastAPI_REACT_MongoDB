import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './component/Login';
import { RequiredToken } from './component/Auth';
import { Profile } from './component/Profile';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route 
        path='/profile' 
        element={
          <RequiredToken>
            <Profile />
          </RequiredToken>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
