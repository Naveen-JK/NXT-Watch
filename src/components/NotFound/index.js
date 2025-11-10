import {Link} from 'react-router-dom'
import ThemeContext from '../../context'
import './index.css'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notFoundImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'

      return (
        <div
          className={
            isDarkTheme
              ? 'not-found-container dark'
              : 'not-found-container light'
          }
        >
          <div className="not-found-content">
            <img
              src={notFoundImage}
              alt="not found"
              className="not-found-image"
            />
            <h1
              className={
                isDarkTheme
                  ? 'not-found-heading dark'
                  : 'not-found-heading light'
              }
            >
              Page Not Found
            </h1>
            <p
              className={
                isDarkTheme ? 'not-found-text dark' : 'not-found-text light'
              }
            >
              We are sorry, the page you requested could not be found.
            </p>
            <Link to="/" className="home-link">
              <button type="button" className="go-home-button">
                Go to Home
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default NotFound
