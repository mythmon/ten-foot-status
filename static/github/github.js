d3.json('/github/data', function(error, messages) {
  if (error) return console.warn(error);

  var wrap = d3.select('#wrap');

  var header = wrap.append('header')
    .data([messages[0]])
    .attr('class', function(d) { return d.status; });

  header.append('h1').text('GitHub Status');
  header.append('h2')
    .text(function(d) {
      switch (d.status) {
        case 'good': return 'Battle status fully operational';
        case 'minor': return 'Minor disruption';
        case 'major': return 'Major disruption';
        default: return 'Status unknown: ' + d.status;
      }
    });
  header.append('h3')
    .text(function(d) {
      return formatDate(new Date(d.created_on));
    });

  wrap.append('ul')
    .classed('messages', true)
    .selectAll('li')
      .data(messages)
      .enter()
      .append('li')
        .attr('class', function(d) {
          return 'status ' + d.status;
        })
        .each(function(d) {
          var li = d3.select(this);
          li.append('p').text(d.body);
          li.append('time')
            .attr('datetime', d.created_on)
            .text(formatDate(new Date(d.created_on)));
        });
});
