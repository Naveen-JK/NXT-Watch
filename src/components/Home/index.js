import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context'
import VideoCard from '../common/VideoCard'
import Loader from '../common/Loader'
import FailureView from '../common/FailureView'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videosList: [],
    searchInput: '',
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
          videosList: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchVideos = () => {
    this.getVideos()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getVideos()
    }
  }

  onCloseBanner = () => {
    this.setState({showBanner: false})
  }

  retry = () => {
    this.getVideos()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader />
    </div>
  )

  renderVideosView = () => {
    const {videosList} = this.state

    if (videosList.length === 0) {
      return (
        <ThemeContext.Consumer>
          {value => {
            const {isDarkTheme} = value

            return (
              <div className="no-videos-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                  alt="no videos"
                  className="no-videos-image"
                />
                <h1
                  className={
                    isDarkTheme
                      ? 'no-videos-heading dark'
                      : 'no-videos-heading light'
                  }
                >
                  No Search results found
                </h1>
                <p
                  className={
                    isDarkTheme ? 'no-videos-text dark' : 'no-videos-text light'
                  }
                >
                  Try different key words or remove search filter
                </p>
                <button
                  type="button"
                  className="retry-button"
                  onClick={this.retry}
                >
                  Retry
                </button>
              </div>
            )
          }}
        </ThemeContext.Consumer>
      )
    }

    return (
      <ul className="videos-list">
        {videosList.map(each => (
          <VideoCard key={each.id} videoData={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => <FailureView retry={this.retry} />

  renderHomeVideos = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideosView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, showBanner} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <>
              <Header />
              <div className="home-container" data-testid="home">
                <Sidebar />
                <div
                  className={
                    isDarkTheme ? 'home-content dark' : 'home-content light'
                  }
                >
                  {showBanner && (
                    <div className="banner-container" data-testid="banner">
                      <div className="banner-content">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="banner-logo"
                        />
                        <p className="banner-text">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button type="button" className="get-it-now-button">
                          GET IT NOW
                        </button>
                      </div>
                      <button
                        type="button"
                        className="close-button"
                        data-testid="close"
                        onClick={this.onCloseBanner}
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <div className="search-container">
                    <input
                      type="search"
                      placeholder="Search"
                      value={searchInput}
                      onChange={this.onChangeSearchInput}
                      onKeyDown={this.onEnterSearchInput}
                      className={
                        isDarkTheme ? 'search-input dark' : 'search-input light'
                      }
                    />
                    <button
                      type="button"
                      className={
                        isDarkTheme
                          ? 'search-button dark'
                          : 'search-button light'
                      }
                      data-testid="searchButton"
                      onClick={this.onSearchVideos}
                    >
                      <BsSearch className="search-icon" />
                    </button>
                  </div>
                  {this.renderHomeVideos()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
