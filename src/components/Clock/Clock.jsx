import React, { Component } from 'react';
import './Clock.scss';

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: null,
      d: '0',
      h: '00',
      m: '00',
      s: '00'
    };
    this.timer = null;
  }
    
  componentWillMount() {
    this.hydrateStateWithLocalStorage()

    this.timer = setInterval(() => {
      const currentTime = new Date();
      this.formatTime(currentTime)
    }, 1000)

    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }
  
  hydrateStateWithLocalStorage() {
    let startTime = null
    if (localStorage.hasOwnProperty('startTime')) {
      startTime = new Date(localStorage.getItem('startTime'))
    } else {
      startTime = new Date();
    }
    this.setState({startTime: startTime});
  }

  saveStateToLocalStorage() {
    localStorage.setItem('startTime', this.state.startTime);      
  }

  formatTime(time) {
    let state = {...this.state}
    let s = Math.floor((time - this.state.startTime) / 1000);
    const d = Math.floor(s / 86400)
    state.d = d
    s = s - d * 86400
    const h = Math.floor(s / 3600);
    state.h = h > 9 ? h : `0${h}`; 
    s = s - h * 3600;
    const m = Math.floor(s / 60);
    state.m = m > 9 ? m : `0${m}`;
    s = s - m * 60; 
    state.s = s > 9 ? s : `0${s}`;
    this.setState(state)
  }

  render() {
    return (
      <div className='clock'>
        <div className='time-display'>
        <p>It has been</p>
        <p className='no-days'>{this.state.d} days</p>
          <div className='row'>
            <div className='col-xs-4 col-md-4 block'>
              <span>{this.state.h}</span>
              <p>hours</p>
            </div>
            <div className='col-xs-4 col-md-4'>
              <span>{this.state.m}</span>
              <p>minutes</p>
            </div>
            <div className='col-xs-4 ưcol-md-4'>
              <span>{this.state.s}</span>
              <p>seconds</p>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Clock;