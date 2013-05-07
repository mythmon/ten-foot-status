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
