import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {FiSun, FiMoon} from 'react-icons/fi'
import {IoIosLogOut} from 'react-icons/io'
import {CgMenuLeft, CgPlayListAdd} from 'react-icons/cg'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import ThemeContext from '../../context'
import './index.css'

class Header extends Component {
  render() {
    const {location} = this.props
    const {pathname} = location

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme, toggleTheme} = value

          const onLogout = () => {
            const {history} = this.props
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          const websiteLogo = isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

          return (
            <nav
              className={
                isDarkTheme ? 'header-container dark' : 'header-container light'
              }
            >
              {/* Website Logo */}
              <Link to="/" className="logo-link">
                <img
                  src={websiteLogo}
                  alt="website logo"
                  className="website-logo"
                />
              </Link>

              {/* Desktop Actions */}
              <div className="actions-container">
                <button
                  type="button"
                  className="theme-button"
                  data-testid="theme"
                  onClick={toggleTheme}
                >
                  {isDarkTheme ? (
                    <FiSun className="theme-icon" />
                  ) : (
                    <FiMoon className="theme-icon" />
                  )}
                </button>

                {/* Mobile Menu Button - Positioned between theme and logout */}
                <Popup
                  modal
                  trigger={
                    <button type="button" className="menu-button mobile">
                      <CgMenuLeft className="menu-icon" />
                    </button>
                  }
                  className="popup-content mobile-menu-popup"
                >
                  {close => (
                    <div
                      className={
                        isDarkTheme
                          ? 'mobile-menu-container dark'
                          : 'mobile-menu-container light'
                      }
                    >
                      <div className="mobile-menu-content">
                        <div className="mobile-menu-header">
                          <button
                            type="button"
                            className="close-menu-button"
                            onClick={() => close()}
                          >
                            ×
                          </button>
                        </div>
                        <ul className="mobile-nav-list">
                          <li className="mobile-nav-item">
                            <Link
                              to="/"
                              className={`mobile-nav-link ${
                                pathname === '/' ? 'active' : ''
                              }`}
                              onClick={() => close()}
                            >
                              <AiFillHome className="mobile-nav-icon" />
                              <span className="mobile-nav-text">Home</span>
                            </Link>
                          </li>
                          <li className="mobile-nav-item">
                            <Link
                              to="/trending"
                              className={`mobile-nav-link ${
                                pathname === '/trending' ? 'active' : ''
                              }`}
                              onClick={() => close()}
                            >
                              <HiFire className="mobile-nav-icon" />
                              <span className="mobile-nav-text">Trending</span>
                            </Link>
                          </li>
                          <li className="mobile-nav-item">
                            <Link
                              to="/gaming"
                              className={`mobile-nav-link ${
                                pathname === '/gaming' ? 'active' : ''
                              }`}
                              onClick={() => close()}
                            >
                              <SiYoutubegaming className="mobile-nav-icon" />
                              <span className="mobile-nav-text">Gaming</span>
                            </Link>
                          </li>
                          <li className="mobile-nav-item">
                            <Link
                              to="/saved-videos"
                              className={`mobile-nav-link ${
                                pathname === '/saved-videos' ? 'active' : ''
                              }`}
                              onClick={() => close()}
                            >
                              <CgPlayListAdd className="mobile-nav-icon" />
                              <span className="mobile-nav-text">
                                Saved videos
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </Popup>

                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-image desktop"
                />

                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-button desktop">
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div
                      className={
                        isDarkTheme
                          ? 'popup-container dark'
                          : 'popup-container light'
                      }
                    >
                      <p
                        className={
                          isDarkTheme ? 'popup-text dark' : 'popup-text light'
                        }
                      >
                        Are you sure, you want to logout?
                      </p>
                      <div className="popup-buttons">
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button"
                          onClick={onLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>

                {/* Mobile Logout Button */}
                <Popup
                  modal
                  trigger={
                    <button type="button" className="logout-button mobile">
                      <IoIosLogOut className="logout-icon" />
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <div
                      className={
                        isDarkTheme
                          ? 'popup-container dark'
                          : 'popup-container light'
                      }
                    >
                      <p
                        className={
                          isDarkTheme ? 'popup-text dark' : 'popup-text light'
                        }
                      >
                        Are you sure, you want to logout?
                      </p>
                      <div className="popup-buttons">
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button"
                          onClick={onLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </div>
            </nav>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
