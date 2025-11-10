import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import ReactPlayer from 'react-player'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
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

class VideoItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    videoDetails: {},
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
        const updatedData = {
          id: data.video_details.id,
          title: data.video_details.title,
          videoUrl: data.video_details.video_url,
          thumbnailUrl: data.video_details.thumbnail_url,
          channel: {
            name: data.video_details.channel.name,
            profileImageUrl: data.video_details.channel.profile_image_url,
            subscriberCount: data.video_details.channel.subscriber_count,
          },
          viewCount: data.video_details.view_count,
          publishedAt: data.video_details.published_at,
          description: data.video_details.description,
        }
        this.setState({
          videoDetails: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onLikeVideo = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onDislikeVideo = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader />
    </div>
  )

  renderFailureView = () => <FailureView retry={this.getVideoDetails} />

  renderVideoDetailsView = () => {
    const {videoDetails, isLiked, isDisliked} = this.state

    return (
      <ThemeContext.Consumer>
        {value => {
          const {
            isDarkTheme,
            savedVideos,
            addVideoToSavedVideos,
            removeVideoFromSavedVideos,
          } = value

          const isSaved = savedVideos.some(each => each.id === videoDetails.id)

          const onToggleSave = () => {
            if (isSaved) {
              removeVideoFromSavedVideos(videoDetails.id)
            } else {
              addVideoToSavedVideos(videoDetails)
            }
          }

          const likeColor = isLiked ? '#2563eb' : '#64748b'
          const dislikeColor = isDisliked ? '#2563eb' : '#64748b'
          const saveColor = isSaved ? '#2563eb' : '#64748b'
          const saveText = isSaved ? 'Saved' : 'Save'

          return (
            <div className="video-details-container">
              <div className="video-player-container">
                <ReactPlayer
                  url={videoDetails.videoUrl}
                  controls
                  width="100%"
                  height="100%"
                  className="react-player"
                />
              </div>
              <div className="video-info-container">
                <h1
                  className={
                    isDarkTheme ? 'video-title dark' : 'video-title light'
                  }
                >
                  {videoDetails.title}
                </h1>
                <div className="video-stats-container">
                  <div className="video-stats">
                    <span
                      className={
                        isDarkTheme ? 'video-stat dark' : 'video-stat light'
                      }
                    >
                      {videoDetails.viewCount} views
                    </span>
                    <span
                      className={
                        isDarkTheme ? 'video-stat dark' : 'video-stat light'
                      }
                    >
                      •{' '}
                      {formatDistanceToNow(new Date(videoDetails.publishedAt))}{' '}
                      ago
                    </span>
                  </div>
                  <div className="video-buttons-container">
                    <button
                      type="button"
                      className="video-button"
                      onClick={this.onLikeVideo}
                      style={{color: likeColor}}
                    >
                      <BiLike className="button-icon" />
                      <span>Like</span>
                    </button>
                    <button
                      type="button"
                      className="video-button"
                      onClick={this.onDislikeVideo}
                      style={{color: dislikeColor}}
                    >
                      <BiDislike className="button-icon" />
                      <span>Dislike</span>
                    </button>
                    <button
                      type="button"
                      className="video-button"
                      onClick={onToggleSave}
                      style={{color: saveColor}}
                    >
                      <MdPlaylistAdd className="button-icon" />
                      <span>{saveText}</span>
                    </button>
                  </div>
                </div>
                <hr
                  className={isDarkTheme ? 'divider dark' : 'divider light'}
                />
                <div className="channel-info-container">
                  <img
                    src={videoDetails.channel.profileImageUrl}
                    alt="channel logo"
                    className="channel-logo"
                  />
                  <div className="channel-details">
                    <p
                      className={
                        isDarkTheme ? 'channel-name dark' : 'channel-name light'
                      }
                    >
                      {videoDetails.channel.name}
                    </p>
                    <p
                      className={
                        isDarkTheme
                          ? 'channel-subscribers dark'
                          : 'channel-subscribers light'
                      }
                    >
                      {videoDetails.channel.subscriberCount} subscribers
                    </p>
                    <p
                      className={
                        isDarkTheme
                          ? 'video-description dark'
                          : 'video-description light'
                      }
                    >
                      {videoDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderVideoDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoDetailsView()
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
              <div
                className="video-item-details-container"
                data-testid="videoItemDetails"
              >
                <Sidebar />
                <div
                  className={
                    isDarkTheme
                      ? 'video-details-content dark'
                      : 'video-details-content light'
                  }
                >
                  {this.renderVideoDetails()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
