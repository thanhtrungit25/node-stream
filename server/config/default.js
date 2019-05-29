const config = {
  server: {
    secret: 'afsd0s60fsfG3hlXl5235l23h5lldsfxvvA'
  },
  node_media_server: {
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
          hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]'
        }
      ]
    }
  }
};

module.exports = config;
