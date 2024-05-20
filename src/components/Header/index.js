import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {MdMenu} from 'react-icons/md'
import Cookies from 'js-cookie'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

class Header extends Component {
  state = {showNav: false}

  onClickMdMenu = () => {
    this.setState({showNav: true})
  }

  onClickClose = () => {
    this.setState({showNav: false})
  }

  onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {showNav} = this.state

    return (
      <>
        <div className="header-container">
          <div className="header-logo-container">
            <img
              src="https://res.cloudinary.com/du8de0czr/image/upload/v1706505718/Frame_274_ldqtnx.svg"
              alt="website logo"
              className="header-logo"
            />
            <h1 className="login-heading">Tasty Kitchens</h1>
          </div>
          <ul>
            <Link className="nav-link" to="/">
              <li>Home</li>
            </Link>

            <Link className="nav-link" to="/cart">
              <li>Cart</li>
            </Link>

            <li>
              <button type="button" onClick={this.onClickLogOut}>
                Logout
              </button>
            </li>
          </ul>
          <button
            type="button"
            className="menu-icon-button"
            onClick={this.onClickMdMenu}
            aria-label="Close"
          >
            <MdMenu size={22} />
          </button>
        </div>
        {showNav && (
          <div className="header-sm-container">
            <ul>
              <Link className="nav-link" to="/">
                <li>Home</li>
              </Link>

              <Link className="nav-link" to="/cart">
                <li>Cart</li>
              </Link>

              <li>
                <button type="button" onClick={this.onClickLogOut}>
                  Logout
                </button>
              </li>
            </ul>
            <button
              type="button"
              className="menu-icon-button"
              onClick={this.onClickClose}
              aria-label="Close"
            >
              <IoIosCloseCircle size={24} />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
