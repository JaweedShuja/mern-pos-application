import React, {Component} from 'react'
import axios from 'axios';

export default class SaleHistory extends Component{
    constructor(props){
        super(props)

        this.state = {
            histories:[],
            productHistory:[],
        }
        this.showHistory = this.showHistory.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/history/')
            .then(response => {
                this.setState({
                    histories:response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    showHistory(id){
        // alert(id)

        for (var i = 0; i < this.state.histories.length; i++){
            if(this.state.histories[i]._id == id){
                this.setState({
                    productHistory: this.state.histories[i].productHistory
                })
            }
        }
        
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <table className="table">

                            <thead className="thead-light">
                                <tr>
                                    <th>#</th>
                                    <th>Customer Name</th>
                                    <th>Total Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.histories.map((data, index) => 
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{data.customerName}</td>
                                        <td>{data.totalAmount}</td>
                                        <td>
                                            {/* <a href="#"  onClick={() = {this.showHistory()}}>See History</a> */}
                                            <button className="btn btn-primary" onClick={() => this.showHistory(data._id)}>Show History</button>
                                        </td>
                                    </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-6">
                    <table className="table">

                        <thead className="thead-light">
                            <tr>
                                <th>Product Name</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.productHistory.map((data, index) => 
                                <tr>
                                    <td>{data.productName}</td>
                                    <td>{data.qty}</td>
                                    <td>{data.productPrice}</td>
                                    <td>
                                       { data.qty * data.productPrice} 
                                    </td>
                                </tr>
                                )}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}