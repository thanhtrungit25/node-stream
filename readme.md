### NodeStream

#### Install ffmpeg for RTMP to HLS transcoding 
```
#Mac OS
install ffmpeg from homebrew

# check version
$ ffmpeg --version
```

#### Configuration
Change ffmpeg path in node media server configuration to your
own installed path.

Also change secret string. It will be used for session encryption.

```
cd nodeStream && nano /server/config/default.js
const config = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
        port : 3333
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        trans: {
            ffmpeg: '/usr/local/bin/ffmpeg',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        }
    }
};
```

#### Install dependencies, build code and run server
```
$ npm install

# run webpack and watch for changes
$ npm run watch

# run node server with supervisor and for changes
$ npm run start
```
#### Streaming with OBS

Go to Settings > Stream.  Select Custom service and `rtmp://127.0.0.1:1935/live`
in server input. Enter your streaming key issued by NodeStream and click Apply.
Click start streaming to broadcast your stream.

![alt text](https://github.com/thanhtrungit25/node-stream/blob/master/live_streams.png "live streams")
![alt text](https://github.com/thanhtrungit25/node-stream/blob/master/stream.png "stream")

### references
https://github.com/waleedahmad/node-stream