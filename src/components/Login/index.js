import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      this.onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  render() {
    const {username, password, showPassword, showError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div
              className={
                isDarkTheme ? 'login-container dark' : 'login-container light'
              }
            >
              <div
                className={isDarkTheme ? 'login-card dark' : 'login-card light'}
              >
                <img
                  src={
                    isDarkTheme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="website-logo"
                />
                <form className="form-container" onSubmit={this.submitForm}>
                  <div className="input-container">
                    <label
                      htmlFor="username"
                      className={isDarkTheme ? 'label dark' : 'label light'}
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={this.onChangeUsername}
                      className={isDarkTheme ? 'input dark' : 'input light'}
                    />
                  </div>
                  <div className="input-container">
                    <label
                      htmlFor="password"
                      className={isDarkTheme ? 'label dark' : 'label light'}
                    >
                      PASSWORD
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.onChangePassword}
                      className={isDarkTheme ? 'input dark' : 'input light'}
                    />
                  </div>
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={this.onShowPassword}
                      className="checkbox"
                    />
                    <label
                      htmlFor="showPassword"
                      className={
                        isDarkTheme
                          ? 'checkbox-label dark'
                          : 'checkbox-label light'
                      }
                    >
                      Show Password
                    </label>
                  </div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showError && <p className="error-message">*{errorMsg}</p>}
                  <div className="demo-credentials">
                    <p className="demo-title">Demo Credentials:</p>
                    <p className="demo-cred">Naveen / Naveen@2021</p>
                    <p className="demo-cred">rahul / rahul@2021</p>
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
