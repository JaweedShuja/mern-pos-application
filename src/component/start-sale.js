import React, {Component} from 'react'
import Nav from './startsalenav'
import Items from './startsaleitems'
import Table from './startsaletable'
import axios from 'axios'

export default class StartSale extends Component{
    constructor(props){
        super(props)

        this.state = {
            categories:[],
            items:[],
            selectedCategory:'pizza',
            filteredItems:[],
            selectedItems:[],
            totalAmount:0,
            customerName:"Walk In Customer"
        }

        this.show = this.show.bind(this)
        this.addSale = this.addSale.bind(this)
        this.plus = this.plus.bind(this)
        this.minus = this.minus.bind(this)
        this.remove = this.remove.bind(this)
        this.confirm = this.confirm.bind(this)
        this.clear = this.clear.bind(this)
        this.onChangeCustomerName = this.onChangeCustomerName.bind(this)
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
        console.log(this.state.items)
        const rebels = this.state.items.filter(item => item.productCategory === name);
        console.log(rebels)
        this.setState({
            filteredItems:rebels
        })
    }
    addSale(item){
        console.log(item)

        // this.setState(prevState => {
        //     selectedItems:[...prevState.selectedItems, item]
        // })
        var newItem = {
            "key":(this.state.selectedItems.length + 1),
            "productName":item.productName,
            "productPrice":item.productPrice,
            "qty":1,
        }

        this.setState({ 
            selectedItems: this.state.selectedItems.concat([newItem])
          })

          this.setState({
              totalAmount : this.state.totalAmount + (parseInt(item.productPrice) * 1)
          })
    }

    plus(key){
        this.setState(prevState => {
            const updatedItems = prevState.selectedItems.map(item => {
              if(item.key === key){
                item.qty = parseInt(item.qty) + 1
                this.setState({
                    totalAmount : this.state.totalAmount + item.productPrice
                })
              }
              return item
            })
            return{
                selectedItems:updatedItems
            }
          })
    }

    minus(key){
        this.setState(prevState => {
            const updatedItems = prevState.selectedItems.map(item => {
              if(item.key === key){
                  if(item.qty != 1){
                item.qty = parseInt(item.qty) - 1
                this.setState({
                    totalAmount : this.state.totalAmount - item.productPrice
                })
            }
              }
              return item
            })
            return{
                selectedItems:updatedItems
            }
        })
    }

    remove(item){
        const _items = this.state.selectedItems.filter(_item => _item !== item)
        this.setState({
            selectedItems:_items
        })

        this.setState({
            totalAmount : this.state.totalAmount - (parseInt(item.productPrice) * parseInt(item.qty))
        })
    }

    onChangeCustomerName(e){
        this.setState({
            customerName:e.target.value,
        })
    }

    confirm(selectedItems, totalAmount){
        

        const history = {
            customerName: this.state.customerName,
            totalAmount: totalAmount,
            productHistory: selectedItems,
        }

        axios.post('http://localhost:5000/history/add',history)
            .then(res => alert('Order Confirmed'))
            .catch(err => console.log(err))

        this.setState({
            selectedItems:[],
            totalAmount:0,
        })    


    }
    clear(){
        this.setState({
            selectedItems:[],
            totalAmount:0,
        })
    }

    render(){
        return(
            <div className="container-flout">
                <div className="row">

                
                <div className="col-sm-8">
                    <Nav show={this.show} cat={this.state.categories} selected={this.state.selectedCategory}/>
                    
                    <Items itemList={this.state.filteredItems} selectedCategory={this.state.selectedCategory} addSale={this.addSale}/>
                </div>
                <div className="col-sm-4">
                <input type="text" className="form-control"  placeholder="Customer Name" onChange={this.onChangeCustomerName}/>
                    <Table  items={this.state.selectedItems} total={this.state.totalAmount} plus={this.plus} minus={this.minus} remove={this.remove} />
                    <button onClick={() => this.confirm(this.state.selectedItems,this.state.totalAmount)} type="button" className="btn btn-success">Confirm</button>
                    <button onClick={() => this.clear()} style={{marginLeft:10}} type="buttonName" class="btn btn-danger">Clear</button>
                </div>  
                </div>
            </div>
        );
    }
}