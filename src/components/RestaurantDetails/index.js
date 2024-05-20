import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoIosStar} from 'react-icons/io'
import {BiRupee} from 'react-icons/bi'

import Header from '../Header'
import Footer from '../Footer'
import FoodItems from '../FoodItems'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    dataList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwt = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updateData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          foodType: each.food_type,
          id: each.id,
          imageUrl: each.image_url,
          name: each.name,
          rating: each.rating,
        })),
      }
      this.setState({
        dataList: updateData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRestaurantDetailsView = () => {
    const {dataList} = this.state

    return (
      <div>
        <div className="rest-det-head-container">
          <img src={dataList.imageUrl} alt="restaurant" />
          <div className="rest-det-content-card">
            <h1 className="restaurant-head">{dataList.name}</h1>
            <p className="rest-cuisine-text">{dataList.cuisine}</p>
            <p className="rest-location-text">{dataList.location}</p>
            <div className="rest-review-rating-container">
              <div className="rating-container">
                <div>
                  <IoIosStar size={20} className="star-icon" /> <span>4.5</span>
                </div>
                <p>{dataList.reviewsCount}+ Rating</p>
              </div>
              <div className="vertical-line">{}</div>
              <div>
                <div className="cost-container">
                  <BiRupee size={15} color="#fff" />
                  <span>{dataList.costForTwo}</span>
                </div>
                <p className="cost-text">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="rest-det-item-container">
          {dataList.foodItems &&
            dataList.foodItems.map(each => (
              <FoodItems key={each.id} data={each} />
            ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantsContainerView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantDetailsView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="rest-det-bg-container">
          <Header />
          {this.renderRestaurantsContainerView()}
        </div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
