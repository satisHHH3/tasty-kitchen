import {Redirect, Route} from 'react-router-dom/cjs/react-router-dom.min'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwt = Cookies.get('jwt_token')

  if (jwt !== undefined) {
    return <Route {...props} />
  }
  return <Redirect to="/login" />
}

export default ProtectedRoute
