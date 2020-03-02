import React, {Component} from 'react'
import axios from 'axios'

export default class AddProduct extends Component{
    constructor(props){
        super(props)

        this.onChangeProductName = this.onChangeProductName.bind(this);
        this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
        this.onChangeProductCategory = this.onChangeProductCategory.bind(this)

        this.onSubmit = this.onSubmit.bind(this);
        


        this.state = {
            productName:"",
            productPrice:0,
            productCategory:"",
            categories:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/productCategory/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        categories: response.data.map(data => data.productCategoryName),
                        productCategory: response.data[0].productCategoryName
                    })
                }
            })
    }

    onChangeProductName(e){
        this.setState({
            productName:e.target.value
        })
    }

    onChangeProductPrice(e){
        this.setState({
            productPrice:e.target.value
        })
    }

    onChangeProductCategory(e){
        this.setState({
            productCategory:e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const product = {
            productName: this.state.productName,
            productPrice: this.state.productPrice,
            productCategory: this.state.productCategory,
        }

        axios.post('http://localhost:5000/product/add',product)
            .then(res => alert('Added'))

        console.log(product);

        // window.location = "/"
    }

    render(){
        return(
            <div className="container">
                <h3>Add New Product</h3>
                <form onSubmit={this.onSubmit}>

                <div className="form-group">
                        <label>Product Name</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            value={this.state.productName}
                            onChange={this.onChangeProductName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={this.state.productPrice}
                            onChange={this.onChangeProductPrice}
                                />
                    </div>

                    <div className="form-group">
                        <label>Category</label>
                        <select ref="userInput"
                            require
                            className="form-control"
                            value={this.state.productCategory}
                            onChange={this.onChangeProductCategory}>
                                {
                                    this.state.categories.map(function(cat){
                                        return <option
                                        key={cat}
                                        value={cat}
                                        >
                                            {cat}
                                        </option>
                                    })
                                }
                            </select>
                    </div>
                    

                    <div className="form-group">
                        <input type="submit" value="ADD" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}