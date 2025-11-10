import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {CgPlayListAdd} from 'react-icons/cg'
import ThemeContext from '../../context'
import './index.css'

class Sidebar extends Component {
  render() {
    const {location} = this.props
    const {pathname} = location

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div
              className={
                isDarkTheme
                  ? 'sidebar-container dark'
                  : 'sidebar-container light'
              }
            >
              <ul className="sidebar-list">
                <li className="sidebar-item">
                  <Link
                    to="/"
                    className={`sidebar-link ${
                      pathname === '/' ? 'active' : ''
                    }`}
                  >
                    <AiFillHome className="sidebar-icon" />
                    <span className="sidebar-text">Home</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    to="/trending"
                    className={`sidebar-link ${
                      pathname === '/trending' ? 'active' : ''
                    }`}
                  >
                    <HiFire className="sidebar-icon" />
                    <span className="sidebar-text">Trending</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    to="/gaming"
                    className={`sidebar-link ${
                      pathname === '/gaming' ? 'active' : ''
                    }`}
                  >
                    <SiYoutubegaming className="sidebar-icon" />
                    <span className="sidebar-text">Gaming</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link
                    to="/saved-videos"
                    className={`sidebar-link ${
                      pathname === '/saved-videos' ? 'active' : ''
                    }`}
                  >
                    <CgPlayListAdd className="sidebar-icon" />
                    <span className="sidebar-text">Saved videos</span>
                  </Link>
                </li>
              </ul>
              <div className="contact-section">
                <p
                  className={
                    isDarkTheme
                      ? 'contact-heading dark'
                      : 'contact-heading light'
                  }
                >
                  CONTACT US
                </p>
                <div className="social-icons">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="social-icon"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linkedin logo"
                    className="social-icon"
                  />
                </div>
                <p
                  className={
                    isDarkTheme ? 'contact-text dark' : 'contact-text light'
                  }
                >
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Sidebar)
