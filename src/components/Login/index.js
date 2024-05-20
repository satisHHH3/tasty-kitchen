import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errText: '', showErr: false}

  onSubmitSuccess = jwt => {
    Cookies.set('jwt_token', jwt, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = err => {
    this.setState({
      showErr: true,
      errText: err,
      username: '',
      password: '',
    })
  }

  onClickSubmit = async e => {
    e.preventDefault()

    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.onSubmitSuccess(data.jwt_token)
      this.setState({showErr: false})
      console.log(data.jwt_token)
    } else {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg)
      console.log(data)
    }
  }

  render() {
    const {username, password, errText, showErr} = this.state
    const jwt = Cookies.get('jwt_token')

    if (jwt !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="cont-1">
          <div className="cont-2">
            <form className="form-container">
              <img
                src="https://res.cloudinary.com/du8de0czr/image/upload/v1706505718/Frame_274_ldqtnx.svg"
                alt="k"
                className="web-logo"
              />
              <h1 className="login-heading">Tasty Kitchens</h1>

              <img
                src="https://res.cloudinary.com/du8de0czr/image/upload/v1706677184/Rectangle_1457_dnklvh.png"
                alt="hu"
                className="img-mob"
              />
              <h1 className="login-text">Login</h1>
              <label htmlFor="userName" className="label">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="input"
                value={username}
                onChange={e => this.setState({username: e.target.value})}
              />
              <label htmlFor="password" className="label">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input"
                value={password}
                onChange={e => this.setState({password: e.target.value})}
              />
              <button
                type="submit"
                className="login-button"
                onClick={this.onClickSubmit}
              >
                Login
              </button>
              {showErr && <p className="err-text">*{errText}</p>}
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/du8de0czr/image/upload/v1706420659/Rectangle_1456_oquflq.png"
          alt="s"
          className="img"
        />
      </div>
    )
  }
}

export default Login
