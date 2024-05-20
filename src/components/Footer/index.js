import {Component} from 'react'

import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-logo-container">
          <img
            src="https://res.cloudinary.com/du8de0czr/image/upload/v1706505718/Frame_274_ldqtnx.svg"
            alt="website-footer-logo"
            className="hat-img"
          />
          <h1 className="login-heading">Tasty Kitchens</h1>
        </div>
        <p>
          The only thing we are serious about is food.
          <br />
          Contact us on
        </p>
        <div className="footer-icon-container">
          <FaPinterestSquare
            color="#fff"
            size={25}
            data-testid="pintrest-social-icon"
          />
          <FaInstagram
            color="#fff"
            size={25}
            data-testid="instagram-social-icon"
          />
          <FaTwitterSquare
            color="#fff"
            size={25}
            data-testid="twitter-social-icon"
          />
          <FaFacebookSquare
            color="#fff"
            size={25}
            data-testid="facebook-social-icon"
          />
        </div>
      </div>
    )
  }
}

export default Footer
