import {Component} from 'react'
import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
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

class Trending extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    trendingVideos: [],
  }

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
          channel: {
            name: each.channel.name,
            profileImageUrl: each.channel.profile_image_url,
          },
          viewCount: each.view_count,
          publishedAt: each.published_at,
        }))
        this.setState({
          trendingVideos: updatedData,
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
    this.getTrendingVideos()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader />
    </div>
  )

  renderFailureView = () => <FailureView retry={this.retry} />

  renderTrendingVideosView = () => {
    const {trendingVideos} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <div className="trending-videos-container">
              <div
                className={
                  isDarkTheme ? 'trending-header dark' : 'trending-header light'
                }
              >
                <div className="trending-icon-container">
                  <div className="trending-icon">
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
                    isDarkTheme ? 'trending-title dark' : 'trending-title light'
                  }
                >
                  Trending
                </h1>
              </div>
              <ul className="trending-videos-list">
                {trendingVideos.map(video => (
                  <li key={video.id} className="trending-video-item">
                    <Link
                      to={`/videos/${video.id}`}
                      className="trending-video-link"
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt="video thumbnail"
                        className="trending-thumbnail"
                      />
                      <div className="trending-video-details">
                        <p
                          className={
                            isDarkTheme
                              ? 'trending-video-title dark'
                              : 'trending-video-title light'
                          }
                        >
                          {video.title}
                        </p>
                        <p
                          className={
                            isDarkTheme
                              ? 'trending-channel-name dark'
                              : 'trending-channel-name light'
                          }
                        >
                          {video.channel.name}
                        </p>
                        <div className="trending-video-stats">
                          <span
                            className={
                              isDarkTheme
                                ? 'trending-stat dark'
                                : 'trending-stat light'
                            }
                          >
                            {video.viewCount} views
                          </span>
                          <span
                            className={
                              isDarkTheme
                                ? 'trending-stat dark'
                                : 'trending-stat light'
                            }
                          >
                            • {formatDistanceToNow(new Date(video.publishedAt))}{' '}
                            ago
                          </span>
                        </div>
                      </div>
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

  renderTrendingVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTrendingVideosView()
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
              <div className="trending-container" data-testid="trending">
                <Sidebar />
                <div
                  className={
                    isDarkTheme
                      ? 'trending-content dark'
                      : 'trending-content light'
                  }
                >
                  {this.renderTrendingVideos()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Trending
