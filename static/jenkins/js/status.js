d3.json('/jenkins/data', function(error, ciData) {
  if (error) return console.warn(error);

  var oneWeekAgo = new Date() - (7 * 24 * 60 * 60 * 1000);
  // Discard unbuildable jobs, or jobs with no data.
  jobList = ciData.jobs.filter(function(job) {
    return job.buildable && job.lastBuild !== null;
  });

  // Sort by last build time, newest first.
  jobList.sort(function(a, b) {
    return b.lastBuild.timestamp - a.lastBuild.timestamp;
  });

  jobList = jobList.slice(0, 12);

  var divs = d3.select('body')
    .append('div')
    .classed('jobs', true)
    .selectAll('div')
      .data(jobList)
      .enter()
      .append('div')
      .attr('class', function(d) { return 'job ' + d.color; });

  divs.append('h1')
    .text(function(d) {
      // u200B is a zero width space. It is used here as an optional line break.
      return d.name.replace(/([\.\-_])/g, '$1\u200B');
    });
  divs.append('time')
    .attr('date', function(d) { return d.lastBuild.timestamp; })
    .text(function(d) {
      return timeAgo(new Date(d.lastBuild.timestamp));
    });

  d3.select('.loading').remove();
});


function timeAgo(date) {
  var now = new Date();
  var diff = now - date;

  // These would be displayed as "0 minutes"
  if (diff < 60 * 1000) {
    return "Just now";
  }
  var minutes = diff / 1000 / 60;
  if (minutes < 50) {
    minutes = Math.round(minutes);
    if (minutes == 1) {
      return '1 minute ago';
    } else {
      return minutes + ' minutes ago';
    }
  }
  var hours = minutes / 60;
  if (hours < 22) {
    hours = Math.round(hours);
    if (hours === 1) {
      return '1 hour ago';
    } else {
      return hours + ' hours ago';
    }
  }
  var days = Math.round(hours / 24);
  if (days == 1) {
    return '1 day ago';
  } else {
    return days + ' days ago';
  }
}
