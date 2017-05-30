var config = require('./config');
var fs = require('fs');
var path_processed = config.processed;
var exec = require('child_process').exec;
var bluebird = require('bluebird');
var fields  = config.fields;
var moment = require('moment');
exports.combine_spark_output = dir => {
  var files = fs.readdirSync(path_processed + dir).filter(f => { return f.match(/csv$/) });
  return new Promise(function(resolve, reject) {
    bluebird.each(files, f => {
      console.log(f)
        return process_file(f, dir);
    }).then(resolve);
  });
};

function process_file(f, dir) {
  return new Promise((resolve, reject) => {
    var records = {};
    var data = fs.readFileSync(path_processed + dir + '/' + f, 'utf8');
    var lines = data.split(/\n/);
    lines.forEach(l => {
      var vals = l.split(/,/).reduce((h, val, index) => {
        h[fields[index++]] = val;
        return h
      }, {})

      if (vals.week) {
        if (!records[vals.week]) {
          records[vals.week] = [];
        }
        records[vals.week].push(vals);
      }
    });

    Object.keys(records).forEach(week => {
      var year = records[week][0].year;
      var date = moment(year + '-01-01').add(week -1, 'weeks').format('YYYY-MM-DD');
      bluebird.each(records[week], r => {
        return create_or_append(config.temp + date + '.csv', r)
      }).then(resolve);
    });
  })
}

function create_or_append(path, d) {
  return new Promise((resolve, reject)  => {
    fs.exists(path, exists => {
      if (exists) {
        fs.appendFileSync(path, [d.origin, d.destination,d.count] + '\n')
      } else {
        fs.writeFileSync(path, 'orig, dest, cnt' + '\n')
        fs.appendFileSync(path, [d.origin, d.destination, d.count] + '\n')
      }
      resolve();
    });
  })
}
