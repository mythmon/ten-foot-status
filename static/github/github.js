/* jslint multistr */
var messages;
var waitCount = 2;

var status_template =
'<li class="status {status}">' +
  '<p>{body}</p>' +
  '<time datetime={created_on}>{created_on_disp}</time>' +
'</li>';

var header_template =
'<header class={status}>' +
  '<h1>GitHub Status</h1>' +
  '<h2>{status_disp}</h2>' +
  '<h3>As of {created_on_disp}</h3>' +
'</header>';

function ready() {
  if (--waitCount) return;

  var $messagesFragment = $('<ul/>', {'class': 'messages'});
  _.each(messages, function(msg) {
    msg.created_on_disp = formatDate(new Date(msg.created_on));
    $messagesFragment.append($(status_template.format(msg)));
  });

  var latest = messages[0];
  if (latest.status === 'good') {
    latest.status_disp = 'Battle stations fully operational';
  } else if (latest.status === 'minor') {
    latest.status_disp = 'Minor disruption';
  } else if (latest.status === 'major') {
    latest.status_disp = 'Major disruption';
  } else {
    latest.status_disp = 'Unknown';
  }

  $('#wrap')
    .html(header_template.format(latest))
    .append($messagesFragment);
}

$.getJSON('https://status.github.com/api/messages.json?callback=?', {}, function(msgs) {
    messages = msgs;
    ready();
  });

$(ready);
