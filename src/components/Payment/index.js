import {Link} from 'react-router-dom'

import './index.css'

const Payment = () => (
  <div className="payment-container">
    <img
      src="https://res.cloudinary.com/ddz601a5i/image/upload/v1715937189/check-circle.1_1_ommrja.png"
      alt="hi"
    />
    <h1>Payment Successful</h1>
    <p>
      Thank you for ordering
      <br />
      Your payment is successfully completed.
    </p>
    <Link to="/">
      <button type="button">Go To Home Page</button>
    </Link>
  </div>
)

export default Payment
