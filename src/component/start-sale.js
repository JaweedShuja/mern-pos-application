import React, {Component} from 'react'
import Nav from './startsalenav'
import Items from './startsaleitems'
import axios from 'axios'

export default class StartSale extends Component{
    constructor(props){
        super(props)

        this.state = {
            categories:[],
            items:[],
            selectedCategory:'pizza',
            filteredItems:[],
        }

        this.show = this.show.bind(this)
    }
    componentDidMount(){
        axios.get('http://localhost:5000/productCategory/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        categories: response.data.map(data => data.productCategoryName),
                        selectedCategory:response.data[0].productCategoryName
                    })
                }
            })

        axios.get('http://localhost:5000/product/')
        .then(response => {
            if(response.data.length > 0){
                this.setState({
                    items : response.data    
                })
            }
        })
        .then(() => {
            const rebels = this.state.items.filter(item => item.productCategory === this.state.selectedCategory);

            console.log(rebels);
            this.setState({
                filteredItems:rebels
            })
        })
        
        

        
    }
    show(name){
        this.setState({
            selectedCategory:name
        })
        console.log(this.state.selectedCategory)
        // var filtered = this.state.items.filter(function(item){
        //     return item.productCategory === this.state.selectedCategory;
        // })
        console.log(this.state.items)
        const rebels = this.state.items.filter(item => item.productCategory === name);
        console.log(rebels)
        this.setState({
            filteredItems:rebels
        })
    }

    render(){
        return(
            <div className="container-flout">
                <div className="col-sm-8">
                    <Nav show={this.show} cat={this.state.categories} selected={this.state.selectedCategory}/>
                    
                    <Items itemList={this.state.filteredItems} selectedCategory={this.state.selectedCategory} />
                </div>
                <div className="col-sm-4">

                </div>
            </div>
        );
    }
}