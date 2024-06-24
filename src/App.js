import {Routes, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
//Components
import MyNavbar from './components/Navbar';


//Pages
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import ListingPage from './pages/List';

function App() {
  return (
    <div>
    <MyNavbar/>
      <Routes>
  <Route path='/' element={<h1>Hi this is home</h1>} />
  <Route path='/login' element={<LoginPage/>} />
  <Route path='/register' element={<RegisterPage/>} />
  <Route path='/book/list' element={<ListingPage/>} />


  </Routes>
    </div>


  );
}

export default App;
