import React, {Component} from 'react'

export default class StartSaleItems extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{margin:5}}>
                <div className="row">

                
                {this.props.itemList.map((item) =>
                    
                     <div className="card col-sm-3" style={{margin:5}}>
                    <img className="card-img-top" src="https://www.gstatic.com/webp/gallery/1.jpg" alt="Card image cap"/>

                    <div className="card-body">
                        <h5 className="card-title">{item.productName}</h5>
                        <p className="card-text">Rs: {item.productPrice}</p>
                        <a href="#" className="btn btn-success" onClick={() => this.props.addSale(item)}>Select</a>
                    </div>
                    </div>)}
                </div>
            </div>
        )
    }
}