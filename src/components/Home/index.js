import {Component} from 'react'
import Cookies from 'js-cookie'

import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import Restaurants from '../Restaurants'

import './index.css'

class Home extends Component {
  state = {imgData: [], isLoading: false}

  componentDidMount() {
    this.getCarouselData()
  }

  getCarouselData = async () => {
    this.setState({isLoading: true})
    const jwt = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))

      this.setState({imgData: updateData, isLoading: false})
    }
  }

  restaurantsOffersLoader = () => (
    <div className="loader-container" data-testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderOffersContainer = () => {
    const {imgData} = this.state
    return (
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        showStatus={false}
        className="main-slide"
      >
        {imgData.map(each => (
          <div className="slide-img-container" key={each.id}>
            <img src={each.imageUrl} alt="offer" />
          </div>
        ))}
      </Carousel>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="home-bg-container">
          {isLoading
            ? this.restaurantsOffersLoader()
            : this.renderOffersContainer()}
          <Restaurants />
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
