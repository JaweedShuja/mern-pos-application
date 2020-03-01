import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">POINT OF SALE</Link>
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="navbar-item">
                        <Link to="/" className="nav-link">Start Sale</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/create" className="nav-link">Sale History</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Add Product</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/user" className="nav-link">Add Category</Link>
                    </li>
                </ul>    
                </div> 
            </nav>
        );
    }
}