import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context'
import Loader from '../common/Loader'
import FailureView from '../common/FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideos: [],
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        const updatedData = data.videos.map(each => ({
          id: each.id,
          title: each.title,
          thumbnailUrl: each.thumbnail_url,
          viewCount: each.view_count,
        }))
        this.setState({
          gamingVideos: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retry = () => {
    this.getGamingVideos()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader />
    </div>
  )

  renderFailureView = () => <FailureView retry={this.retry} />

  renderGamingVideosView = () => {
    const {gamingVideos} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div className="gaming-videos-container">
              <div
                className={
                  isDarkTheme ? 'gaming-header dark' : 'gaming-header light'
                }
              >
                <div className="gaming-icon-container">
                  <div className="gaming-icon">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM28 22H22V28H18V22H12V18H18V12H22V18H28V22Z"
                        fill="#FF0000"
                      />
                    </svg>
                  </div>
                </div>
                <h1
                  className={
                    isDarkTheme ? 'gaming-title dark' : 'gaming-title light'
                  }
                >
                  Gaming
                </h1>
              </div>
              <ul className="gaming-videos-list">
                {gamingVideos.map(video => (
                  <li key={video.id} className="gaming-video-item">
                    <Link
                      to={`/videos/${video.id}`}
                      className="gaming-video-link"
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt="video thumbnail"
                        className="gaming-thumbnail"
                      />
                      <p
                        className={
                          isDarkTheme
                            ? 'gaming-video-title dark'
                            : 'gaming-video-title light'
                        }
                      >
                        {video.title}
                      </p>
                      <p
                        className={
                          isDarkTheme
                            ? 'gaming-views dark'
                            : 'gaming-views light'
                        }
                      >
                        {video.viewCount} Watching Worldwide
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderGamingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderGamingVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <Header />
              <div className="gaming-container" data-testid="gaming">
                <Sidebar />
                <div
                  className={
                    isDarkTheme ? 'gaming-content dark' : 'gaming-content light'
                  }
                >
                  {this.renderGamingVideos()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
