import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tarea from './components/Tarea';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Tarea/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
