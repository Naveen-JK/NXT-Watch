import ThemeContext from '../../../context'
import './index.css'

const FailureView = ({retry}) => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const failureImage = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'

      return (
        <div className="failure-view-container">
          <img
            src={failureImage}
            alt="failure view"
            className="failure-image"
          />
          <h1
            className={
              isDarkTheme ? 'failure-heading dark' : 'failure-heading light'
            }
          >
            Oops! Something Went Wrong
          </h1>
          <p
            className={isDarkTheme ? 'failure-text dark' : 'failure-text light'}
          >
            We are having some trouble to complete your request. Please try
            again.
          </p>
          <button type="button" className="retry-button" onClick={retry}>
            Retry
          </button>
        </div>
      )
    }}
  </ThemeContext.Consumer>
)

export default FailureView
