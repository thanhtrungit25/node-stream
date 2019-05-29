import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Navbar from './Navbar';
import LiveStreams from './LiveStreams';
import VideoPlayer from './VideoPlayer';
import Settings from './Settings';

const customHistory = createBrowserHistory();

export default class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoJsOptions: {
        autoplay: true,
        controls: true,
        sources: [
          {
            src: 'http://127.0.0.1:8888/live/lorde/index.m3u8',
            type: 'application/x-mpegURL'
          }
        ]
      }
    };
  }

  render() {
    return (
      <Router history={customHistory}>
        <div>
          <Navbar />
          <Route exact path="/" render={props => <LiveStreams {...props} />} />
          <Route
            exact
            path="/stream/:username"
            render={props => <VideoPlayer {...props} />}
          />
          <Route
            exact
            path="/settings"
            render={props => <Settings {...props} />}
          />
        </div>
      </Router>
    );
  }
}
