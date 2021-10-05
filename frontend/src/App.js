import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';

import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <div className = "homepage-container">
          <Route path = "/" component={Home} exact/>
          <Route path = "/search/:keyword" component={Home} exact/>
          <Route path = "/product/:id" component={ProductDetails} exact/>
          <Route path = '/login' component = {Login} exact/>
          </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
