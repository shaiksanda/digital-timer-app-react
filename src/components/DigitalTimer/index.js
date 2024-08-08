// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {count: 25 * 60, isStarted: false, intervalId: null, timerLimit: 25}

  componentWillUnmount() {
    const {intervalId} = this.state
    if (intervalId) {
      clearInterval(intervalId)
    }
  }

  tick = () => {
    const {count, intervalId} = this.state

    if (count > 0) {
      this.setState({count: count - 1})
    } else {
      clearInterval(intervalId)
      this.setState({isStarted: false, intervalId: null})
    }
  }

  formatTime = () => {
    const {count} = this.state
    const minutes = Math.floor(count / 60)
    const seconds = count % 60
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
  }

  handleReset = () => {
    const {intervalId} = this.state
    if (intervalId) {
      clearInterval(intervalId)
    }
    this.setState({
      isStarted: false,
      count: 25 * 60,
      intervalId: null,
    })
  }

  handleMinus = () => {
    const {timerLimit, isStarted} = this.state
    if (!isStarted && timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
        count: (prevState.timerLimit - 1) * 60, // Update count based on new timer limit
      }))
    }
  }

  handlePlus = () => {
    const {isStarted} = this.state
    if (!isStarted) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit + 1,
        count: (prevState.timerLimit + 1) * 60, // Update count based on new timer limit
      }))
    }
  }

  handleStart = () => {
    const {isStarted, intervalId} = this.state

    if (isStarted) {
      clearInterval(intervalId)
      this.setState({isStarted: false, intervalId: null})
    } else {
      const newIntervalId = setInterval(this.tick, 1000)
      this.setState({isStarted: true, intervalId: newIntervalId})
    }
  }

  render() {
    const {isStarted, timerLimit} = this.state
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-app-card">
          <div className="image-container">
            <div className="text-container">
              <h1 className="heading">{this.formatTime()}</h1>
              <p className="timer-text-1">{isStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="timer-text-card-container">
            <div className="start-reset-container">
              <div className="buttons-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.handleStart}
                >
                  <img
                    src={
                      isStarted
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isStarted ? 'pause icon' : 'play icon'}
                    className="icon"
                  />
                  <p className="timer-text">{isStarted ? 'Pause' : 'Start'}</p>
                </button>
              </div>
              <div className="buttons-container">
                <button
                  type="button"
                  className="button"
                  onClick={this.handleReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icon"
                  />
                </button>
                <p className="timer-text">Reset</p>
              </div>
            </div>
            <div>
              <p className="timer-text" style={{textAlign: 'center'}}>
                Set Timer Limit
              </p>
            </div>
            <div className="update-buttons-container">
              <button
                type="button"
                onClick={this.handleMinus}
                disabled={isStarted}
              >
                -
              </button>
              <p className="timer">{timerLimit}</p>
              <button
                type="button"
                onClick={this.handlePlus}
                disabled={isStarted}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
