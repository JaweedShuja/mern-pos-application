import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";


export default class StartSaleNav extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <nav className="navbar navbar-dark bg-light navbar-expand-lg">
                
                <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  {
                      this.props.cat.map((cat) => <li className="navbar-item">
                          <button
                            style={{marginLeft:10}}  
                            // className="btn btn-primary"  
                            className={this.props.selected == cat ? "btn btn-success" : "btn btn-primary"}
                            onClick={() => this.props.show(cat)}

                          >{cat}</button>
                      </li>)
                  }
                    
                </ul>    
                </div> 
            </nav>
            </div>
        );
    }
}