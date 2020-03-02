import React, {Component} from 'react'

export default class StartSaleTable extends Component{
    constructor(props){
        super(props)
        this.state = {
            totalAmount:0,
        }
    }
   
    render(){
        return(
            <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
      <th scope="col">QTY</th>
      <th scope="col">Total</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

      {this.props.items.map((item,index) => <tr>
      <th scope="row">{item.key}</th>
      <td style={{fontSize:10}}>{item.productName}</td>
      <td style={{fontSize:12}}>{item.productPrice}</td>
      <td style={{fontSize:12}}>{item.qty}</td>
      <td style={{fontSize:12}}>{parseInt(item.qty) * parseInt(item.productPrice)}</td>
      <td><a onClick={() => this.props.plus(item.key)} href="#">+</a> | <a href="#" onClick={() => this.props.remove(item)} style={{fontSize:10}}>Remove</a> | <a href="#" onClick={() => this.props.minus(item.key)}>-</a></td>
    </tr>)}
    
    <tr>
      
      <td colSpan="4">Total Amount</td>
      <td>{this.props.total}</td>
    </tr>
   
  </tbody>
</table>    
        )
    }
}