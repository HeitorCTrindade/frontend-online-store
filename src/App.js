import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import ProductDescription from './Components/ProductDescription';
import ShoppingCart from './Components/ShoppingCart';
import ShoppingEnd from './Components/ShoppingEnd';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route exact path="/shopping-cart" component={ ShoppingCart } />
            <Route
              exact
              path="/shopping-cart/:id"
              component={ ProductDescription }
            />
            <Route exact path="/checkout" component={ ShoppingEnd } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
