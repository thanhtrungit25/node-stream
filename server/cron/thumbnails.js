const CronJob = require('cron').CronJob,
  request = require('request'),
  helpers = require('../helpers/helpers'),
  config = require('../config/default'),
  port = config.node_media_server.http.port;

// This cron job will execute every 5 seconds
const job = new CronJob(
  '*/5 * * * * *',
  function() {
    request.get('http://127.0.0.1:' + port + '/api/streams', function(
      err,
      response,
      body
    ) {
      let streams = JSON.parse(body);
      if (typeof (streams['live'] !== 'undefined')) {
        let live_streams = streams['live'];
        for (let stream_id in live_streams) {
          if (!live_streams.hasOwnProperty(stream_id)) continue;
          helpers.generateStreamThumbnail(stream_id);
        }
      }
    });
  },
  null,
  true
);

module.exports = job;
