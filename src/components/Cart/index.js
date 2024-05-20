import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import Header from '../Header'
import Footer from '../Footer'
import Payment from '../Payment'

import './index.css'

const cartStatusConstants = {
  initial: 'INITIAL',
  cartItems: 'SUCCESS',
  cartEmpty: 'FAILURE',
  payment: 'PAYMENT',
}

class Cart extends Component {
  constructor(props) {
    super(props)
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []
    this.state = {
      cartData: [],
      cartStatus: cartStatusConstants.initial,
      isCartItems: cartList.length > 0,
    }
  }

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []

    if (cartList.length === 0) {
      this.setState({cartStatus: cartStatusConstants.cartEmpty})
    } else {
      this.setState({
        cartData: cartList,
        cartStatus: cartStatusConstants.cartItems,
      })
    }
  }

  decrementCartQuantity = id => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []
    const isInCart = cartList.map(each => {
      if (each.id === id) {
        if (each.quantity > 0) {
          return {...each, quantity: each.quantity - 1}
        }
      }
      return each
    })

    const filterCartItem = isInCart.filter(each => each.quantity > 0)
    localStorage.setItem('cartData', JSON.stringify(filterCartItem))

    this.getCartData()
  }

  incrementCartQuantity = id => {
    const cartList = JSON.parse(localStorage.getItem('cartData')) || []
    const isInCart = cartList.map(each => {
      if (each.id === id) {
        return {...each, quantity: each.quantity + 1}
      }
      return each
    })
    localStorage.setItem('cartData', JSON.stringify(isInCart))

    this.getCartData()
  }

  emptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/ddz601a5i/image/upload/v1715937240/cooking_1_ttzfb2.png"
        alt="empty cart"
      />
      <h1>No Orders Yet!</h1>
      <p>Your cart is empty. Add something from the menu.</p>
      <Link to="/">
        <button type="button">Order Now</button>
      </Link>
    </div>
  )

  onClickPlaceOrder = () => {
    localStorage.removeItem('cartData')
    this.setState({cartStatus: cartStatusConstants.payment})
  }

  cartItemView = () => {
    const {cartData} = this.state
    const priceList = cartData.map(each => each.quantity * each.cost)
    const totalCost =
      priceList.length > 0 ? priceList.reduce((a, b) => a + b) : 0

    return (
      <div>
        <table className="">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map(each => (
              <tr key={each.id} data-testid="cartItem">
                <td>
                  <div className="cart-img-container">
                    <img src={each.imageUrl} alt="img" />
                    <p>{each.name}</p>
                  </div>
                </td>
                <td>
                  <div className="quantity-container">
                    <button
                      type="button"
                      onClick={() => this.decrementCartQuantity(each.id)}
                    >
                      -
                    </button>
                    <span>{each.quantity}</span>
                    <button
                      type="button"
                      onClick={() => this.incrementCartQuantity(each.id)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <div className="price-container">
                    <BiRupee size={15} />
                    <p>{each.cost * each.quantity}</p>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="3">
                <hr />
                <div className="total-cost-container">
                  <h1>Order Total:</h1>
                  <div>
                    <span data-testid="total-price">
                      <BiRupee size={14} />
                      {totalCost}
                    </span>
                    <button
                      type="button"
                      className="order-button"
                      onClick={this.onClickPlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ul className="cart-list-container">
          {cartData.map(each => (
            <li key={each.id} data-testid="cartItem">
              <img src={each.imageUrl} alt="img" />
              <div className="item-name-cost-cont">
                <p className="item-name">{each.name}</p>
                <div className="quantity-sm-container">
                  <button
                    type="button"
                    onClick={() => this.decrementCartQuantity(each.id)}
                    data-testid="decrement-quantity"
                  >
                    -
                  </button>
                  <span data-testid="item-quantity">{each.quantity}</span>
                  <button
                    type="button"
                    onClick={() => this.incrementCartQuantity(each.id)}
                    data-testid="increment-quantity"
                  >
                    +
                  </button>
                </div>
                <div className="price-container">
                  <BiRupee size={15} />
                  <p>{each.cost * each.quantity}</p>
                </div>
              </div>
            </li>
          ))}
          <hr />
          <div className="total-cost-container">
            <h1>Order Total:</h1>
            <div>
              <span data-testid="total-price">
                <BiRupee size={14} />
                {totalCost}
              </span>
              <button
                type="button"
                className="order-button"
                onClick={this.onClickPlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </ul>
      </div>
    )
  }

  renderCartContainer = () => {
    const {cartStatus} = this.state
    switch (cartStatus) {
      case cartStatusConstants.cartItems:
        return this.cartItemView()
      case cartStatusConstants.cartEmpty:
        return this.emptyCartView()
      case cartStatusConstants.payment:
        return <Payment />
      default:
        return null
    }
  }

  render() {
    const {isCartItems} = this.state
    return (
      <>
        <Header />
        <div className="cart-container">{this.renderCartContainer()}</div>
        {isCartItems && <Footer />}
      </>
    )
  }
}

export default Cart
