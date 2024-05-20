import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/ddz601a5i/image/upload/v1715940203/erroring_1_nzfqyu.png"
      alt="not"
    />
    <h1>Page Not Found</h1>
    <p>
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button">Home Page</button>
    </Link>
  </div>
)

export default NotFound
