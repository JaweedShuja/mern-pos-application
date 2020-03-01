import React, {Component} from 'react'
import axios from 'axios'

export default class AddCategory extends Component{
    constructor(props){
        super(props)

        this.onChangeProductCategoryName = this.onChangeProductCategoryName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            productCategoryName:"",
        }
    }
    onChangeProductCategoryName(e){
        this.setState({
            productCategoryName:e.target.value
        })
    }
    onSubmit(e){
        e.preventDefault();

        const Category = {
            productCategoryName: this.state.productCategoryName,
        }

        axios.post('http://localhost:5000/productCategory/add',Category)
            .then((res) => {
                console.log(res.data)
            })
            .catch(err => alert(err))

        console.log(Category);

        this.setState({
            productCategoryName:''
        })
    }
    render(){
        return(
            <div className="container">
                <h3>Add New Category</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Category Name</label>
                        <input
                            type="text"
                            require
                            className="form-control"
                            value={this.state.productCategoryName}
                            onChange={this.onChangeProductCategoryName}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}