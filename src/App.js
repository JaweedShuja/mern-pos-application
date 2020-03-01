import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './component/navbar.component'
import StartSale from './component/start-sale'
import SaleHistory from './component/sale-history'
import AddProduct from './component/add-product'
import AddCategory from './component/add-category'

export default class App extends Component{
  render(){
    return(
      <Router>
        <div>
            <Navbar />
            <br />
            <Route path="/" exact component={StartSale} />
            <Route path="/history" component={SaleHistory} />
            <Route path="/addproduct" component={AddProduct} />
            <Route path="/addcategory" component={AddCategory} />
        </div>
      </Router>
    );
  }
}