import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'
import ThemeContext from '../../../context'
import './index.css'

const VideoCard = ({videoData}) => {
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = videoData

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        return (
          <Link to={`/videos/${id}`} className="video-card-link">
            <div className="video-card">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-image"
              />
              <div className="video-info">
                <img
                  src={channel.profileImageUrl}
                  alt="channel logo"
                  className="channel-logo"
                />
                <div className="video-details">
                  <p
                    className={
                      isDarkTheme ? 'video-title dark' : 'video-title light'
                    }
                  >
                    {title}
                  </p>
                  <p
                    className={
                      isDarkTheme ? 'channel-name dark' : 'channel-name light'
                    }
                  >
                    {channel.name}
                  </p>
                  <div className="video-stats">
                    <span className={isDarkTheme ? 'stat dark' : 'stat light'}>
                      {viewCount} views
                    </span>
                    <span className={isDarkTheme ? 'stat dark' : 'stat light'}>
                      • {formatDistanceToNow(new Date(publishedAt))} ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default VideoCard
