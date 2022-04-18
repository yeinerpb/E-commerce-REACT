import { HashRouter,Routes,Route } from 'react-router-dom';
import { Home, Products,Purchases } from './pages';
import './App.css';
import { LoadingScreen, NavBar } from './components';
import { useSelector } from 'react-redux';

function App() {

  const isLoading = useSelector( state=> state.isLoading)

  return (
    <div className="App">
      <HashRouter>
        { isLoading && <LoadingScreen/> }
        <NavBar/>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/products/:id' element = {<Products/>}/>
          <Route path='/purchases' element = {<Purchases/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
