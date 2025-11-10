import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context'
import './index.css'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideos} = value

      if (savedVideos.length === 0) {
        return (
          <>
            <Header />
            <div className="saved-videos-container" data-testid="savedVideos">
              <Sidebar />
              <div
                className={
                  isDarkTheme
                    ? 'saved-videos-content dark'
                    : 'saved-videos-content light'
                }
              >
                <div className="no-saved-videos-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                    alt="no saved videos"
                    className="no-saved-videos-image"
                  />
                  <h1
                    className={
                      isDarkTheme
                        ? 'no-saved-heading dark'
                        : 'no-saved-heading light'
                    }
                  >
                    No saved videos found
                  </h1>
                  <p
                    className={
                      isDarkTheme ? 'no-saved-text dark' : 'no-saved-text light'
                    }
                  >
                    You can save your videos while watching them
                  </p>
                </div>
              </div>
            </div>
          </>
        )
      }

      return (
        <>
          <Header />
          <div className="saved-videos-container" data-testid="savedVideos">
            <Sidebar />
            <div
              className={
                isDarkTheme
                  ? 'saved-videos-content dark'
                  : 'saved-videos-content light'
              }
            >
              <div
                className={
                  isDarkTheme
                    ? 'saved-videos-header dark'
                    : 'saved-videos-header light'
                }
              >
                <div className="saved-videos-icon-container">
                  <div className="saved-videos-icon">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM14 10.97L12.59 12.39L10 9.8L7.41 12.39L6 10.97L8.59 8.38L6 5.79L7.41 4.37L10 6.96L12.59 4.37L14 5.79L11.41 8.38L14 10.97Z"
                        fill="#FF0000"
                      />
                    </svg>
                  </div>
                </div>
                <h1
                  className={
                    isDarkTheme
                      ? 'saved-videos-title dark'
                      : 'saved-videos-title light'
                  }
                >
                  Saved Videos
                </h1>
              </div>
              <ul className="saved-videos-list">
                {savedVideos.map(video => (
                  <li key={video.id} className="saved-video-item">
                    <Link
                      to={`/videos/${video.id}`}
                      className="saved-video-link"
                    >
                      <img
                        src={video.thumbnailUrl}
                        alt="video thumbnail"
                        className="saved-video-thumbnail"
                      />
                      <div className="saved-video-details">
                        <p
                          className={
                            isDarkTheme
                              ? 'saved-video-title dark'
                              : 'saved-video-title light'
                          }
                        >
                          {video.title}
                        </p>
                        <p
                          className={
                            isDarkTheme
                              ? 'saved-channel-name dark'
                              : 'saved-channel-name light'
                          }
                        >
                          {video.channel.name}
                        </p>
                        <div className="saved-video-stats">
                          <span
                            className={
                              isDarkTheme
                                ? 'saved-stat dark'
                                : 'saved-stat light'
                            }
                          >
                            {video.viewCount} views
                          </span>
                          <span
                            className={
                              isDarkTheme
                                ? 'saved-stat dark'
                                : 'saved-stat light'
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
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)

export default SavedVideos
