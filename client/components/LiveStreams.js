import React, { Component } from 'react';
import axios from 'axios';
import config from '../../server/config/default';
import { Link } from 'react-router-dom';
import './LiveStreams.scss';

export default class LiveStreams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      live_streams: []
    };
  }

  componentDidMount() {
    this.getLiveStreams();
  }

  getLiveStreams() {
    axios
      .get(`http://127.0.0.1:${config.node_media_server.http.port}/api/streams`)
      .then(res => {
        let streams = res.data;

        if (typeof streams['live'] !== 'undefined') {
          this.getStreamInfo(streams['live']);
        }
      });
  }

  getStreamInfo(live_streams) {
    console.log('live_streams:', live_streams);
    axios
      .get('/streams/info', {
        params: {
          streams: live_streams
        }
      })
      .then(res => {
        console.log('res:', res);
        this.setState(
          {
            live_streams: res.data
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }

  render() {
    let streams = this.state.live_streams.map((stream, index) => {
      return (
        <div
          className="stream col-xs-12 col-sm-12 col-md-3 col-lg-4"
          key={index}
        >
          <span className="live-label">LIVE</span>
          <Link to={'/stream/' + stream.username}>
            <div className="stream-thumbnail">
              <img src={'/thumbnails/' + stream.stream_key + '.png'} />
            </div>
            <span className="username">
              <Link to={'/stream/' + stream.username}>{stream.username}</Link>
            </span>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <div className="container mt-5">
          <h4>Live Streams</h4>
          <hr className="my-4" />

          <div className="streams row">{streams}</div>
        </div>
      </div>
    );
  }
}
