
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Register from './Register';
import Login from './Login';
import Home from './Home';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Register />} />
                <Route path='/home' element={<Home />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
