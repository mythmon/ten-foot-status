/* jslint multistr */
var ciData;
var waitCount = 2;

var job_box_template =
'<div class="job {color}">' +
  '<h1>{name}</h1>' +
  '<time date="{timestamp}">{timestampDisp}</time>' +
'</div>';

function ready() {
  console.log('ready ' + waitCount);
  if (--waitCount) return;

  var oneWeekAgo = new Date() - (7 * 24 * 60 * 60 * 1000);
  var jobList = _.filter(ciData.jobs, function(job) {
    if (!job.buildable) return false;
    if (job.lastBuild === null) return false;
    if (job.lastBuild.timestamp < oneWeekAgo) return false;
    return true;
  });

  // Sort by last build time, newest first.
  jobLlist = jobList.sort(function(a, b) {
    if (a.lastBuild.timestamp < b.lastBuild.timestamp) return 1;
    if (a.lastBuild.timestamp > b.lastBuild.timestamp) return -1;
    return 0;
  });

  jobList = jobList.slice(0, 12);

  var $jobs = $('<div class="jobs"/>');
  _.each(jobList, function(job) {
    job.timestamp = new Date(job.lastBuild.timestamp);
    job.timestampDisp = timeAgo(new Date(job.lastBuild.timestamp));
    // &#8203; is a uicode Zero-Width Space.
    job.name = job.name.replace(new RegExp('([\\.\\-_])', 'g'), '$1&#8203;');
    console.log(job.name);

    $jobs.append(job_box_template.format(job));
  });

  $('.loading').remove();
  $('body').append($jobs);
}

function ciDataReceived(data) {
}

$.getJSON('/jenkins/data', function(data) {
  ciData = data;
  ready();
});

$(ready);
