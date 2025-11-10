import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ThemeContext from './context'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideos: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addVideoToSavedVideos = videoDetails => {
    const {savedVideos} = this.state
    const videoIndex = savedVideos.findIndex(
      each => each.id === videoDetails.id,
    )

    if (videoIndex === -1) {
      this.setState({savedVideos: [...savedVideos, videoDetails]})
    } else {
      const updatedVideos = savedVideos.filter(
        each => each.id !== videoDetails.id,
      )
      this.setState({savedVideos: updatedVideos})
    }
  }

  removeVideoFromSavedVideos = videoId => {
    const {savedVideos} = this.state
    const updatedVideos = savedVideos.filter(each => each.id !== videoId)
    this.setState({savedVideos: updatedVideos})
  }

  render() {
    const {isDarkTheme, savedVideos} = this.state

    return (
      <ThemeContext.Provider
        value={{
          isDarkTheme,
          toggleTheme: this.toggleTheme,
          savedVideos,
          addVideoToSavedVideos: this.addVideoToSavedVideos,
          removeVideoFromSavedVideos: this.removeVideoFromSavedVideos,
        }}
      >
        <div
          className={isDarkTheme ? 'app-container dark' : 'app-container light'}
        >
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </ThemeContext.Provider>
    )
  }
}

export default App
