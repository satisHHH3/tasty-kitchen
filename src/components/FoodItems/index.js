import {Component} from 'react'
import {IoIosStar} from 'react-icons/io'
import {BiRupee} from 'react-icons/bi'

import './index.css'

class FoodItems extends Component {
  state = {
    quantity: 0,
    isCart: false,
  }

  componentDidMount() {
    this.filterItemInList()
  }

  filterItemInList = () => {
    const {data} = this.props
    const {id} = data
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []
    const filterItem = cartList.find(each => each.id === id)
    if (filterItem !== undefined) {
      this.setState({quantity: filterItem.quantity, isCart: true})
    } else {
      this.setState({isCart: false})
    }
  }

  addCartItemsData = data => {
    const {id} = data
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []

    const checkItem = cartList.find(each => each.id === id)
    if (checkItem === undefined) {
      const cartItem = {...data, quantity: 1}
      cartList.push(cartItem)
      this.setState({quantity: 1, isCart: true})
    } else {
      const updateItem = cartList.map(each => {
        if (each.id === id) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      })
      localStorage.setItem('cartData', JSON.stringify(updateItem))
      this.setState({quantity: 1, isCart: true})
    }
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  onClickIncrement = id => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    const filterItem = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    localStorage.setItem('cartData', JSON.stringify(filterItem))
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onClickDecrement = id => {
    const cartList = JSON.parse(localStorage.getItem('cartData'))

    const filterItem = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity > 0) {
          return {...each, quantity: each.quantity - 1}
        }
      }
      return each
    })

    const filterCart = filterItem.filter(each => each.quantity > 0)
    localStorage.setItem('cartData', JSON.stringify(filterCart))
    this.setState(
      prevState => ({quantity: prevState.quantity - 1}),
      this.filterItemInList,
    )
  }

  render() {
    const {data} = this.props
    const {imageUrl, name, cost, id, rating} = data
    const {quantity, isCart} = this.state

    return (
      <li className="food-items-list-container" data-testid="foodItem">
        <img src={imageUrl} alt="img" className="food-item" />
        <div className="restaurant-details-item-text-container">
          <h1 className="item-heading-text">{name}</h1>
          <div className="item-cost-container">
            <BiRupee size={18} />
            <p className="item-cost-text">{cost}</p>
          </div>
          <div className="item-rating-container">
            <IoIosStar size={20} color="gold" />
            <p className="item-rating-text">{rating}</p>
          </div>
          {!isCart && (
            <button
              type="button"
              className="add-button"
              onClick={() => this.addCartItemsData(data)}
            >
              Add
            </button>
          )}
          {isCart && (
            <div className="button-container">
              <button
                type="button"
                onClick={() => this.onClickDecrement(id)}
                data-testid="decrement-count"
              >
                -
              </button>
              <span data-testid="active-count">{quantity}</span>
              <button
                type="button"
                onClick={() => this.onClickIncrement(id)}
                data-testid="increment-count"
              >
                +
              </button>
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItems
