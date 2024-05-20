import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoIosStar} from 'react-icons/io'
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import {HiMenuAlt2} from 'react-icons/hi'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Restaurants extends Component {
  state = {
    restaurantsList: [],
    activePage: 1,
    selectInput: 'Highest',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  componentDidUpdate(prevProps, prevState) {
    const {activePage, selectInput} = this.state
    if (
      prevState.activePage !== activePage ||
      prevState.selectInput !== selectInput
    ) {
      this.getRestaurantsData()
    }
  }

  getRestaurantsData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activePage, selectInput} = this.state
    const offset = (activePage - 1) * 9
    const jwt = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort_by_rating=${selectInput}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.restaurants.map(each => ({
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imageUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsList: updateData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  onClickNxtPage = () => {
    this.setState(prevState => ({
      activePage:
        prevState.activePage < 4
          ? prevState.activePage + 1
          : prevState.activePage,
    }))
  }

  onClickPrevPage = () => {
    this.setState(prevState => ({
      activePage:
        prevState.activePage > 1
          ? prevState.activePage - 1
          : prevState.activePage,
    }))
  }

  onChangeSelectInput = e => {
    this.setState({selectInput: e.target.value})
  }

  renderRestaurantsView = () => {
    const {restaurantsList, activePage, selectInput} = this.state
    return (
      <div className="food-items-container">
        <div className="head-and-filter-container">
          <div>
            <h1>Popular restaurants</h1>
            <p>
              Select Your Favourite Restaurant Special Dish And Make Your Day
              Happy...
            </p>
          </div>
          <div className="select-container">
            <HiMenuAlt2 />
            <select value={selectInput} onChange={this.onChangeSelectInput}>
              {sortByOptions.map(option => (
                <option key={option.id} value={option.value}>
                  {option.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ul>
          {restaurantsList.map(each => (
            <Link
              className="link-item"
              to={`/restaurant/${each.id}`}
              key={each.id}
            >
              <li data-testid="restaurant-item">
                <img src={each.imageUrl} alt="restaurant" />
                <div>
                  <h1>{each.name}</h1>
                  <p className="cuisine-text">{each.cuisine}</p>
                  <div className="rating-container">
                    <IoIosStar size={18} color="gold" />
                    <p className="reviews-text">
                      <span className="rating-text">
                        {' '}
                        {each.userRating.rating}
                      </span>
                      {` (${each.userRating.totalReviews} ratings)`}
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <div className="pagintation-container">
          <button
            type="button"
            onClick={this.onClickPrevPage}
            data-testid="pagination-left-button"
            aria-label="page"
          >
            <FaAngleLeft size={12} />
          </button>
          <span data-testid="active-page-number">{activePage}</span>
          <button
            type="button"
            onClick={this.onClickNxtPage}
            aria-label="page"
            data-testid="pagination-right-button"
          >
            <FaAngleRight size={12} />
          </button>
        </div>
      </div>
    )
  }

  restaurantsListLoader = () => (
    <div className="loader-container" data-testid="restaurants-list-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantsContainerView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.restaurantsListLoader()
      case apiStatusConstants.success:
        return this.renderRestaurantsView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderRestaurantsContainerView()}</>
  }
}

export default Restaurants
