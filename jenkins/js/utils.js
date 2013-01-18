String.prototype.format = function(obj) {
  var args = arguments;
  var str = this;
  // Support either an object, or a series.
  return str.replace(/\{[\w\d_-]+\}/g, function(part) {
    // Strip off {}.
    part = part.slice(1, -1);
    var index = parseInt(part, 10);
    if (isNaN(index)) {
      return obj[part];
    } else {
      return args[index];
    }
  });
};

function formatDate(date) {
  var now = new Date();
  var date_disp;

  date_disp = date.getHours() + ':' + date.getMinutes();
  date_disp += ' - ';

  if (now - date < 24 * 60 * 60 * 1000) {
    date_disp += 'Today';
  } else if (now - date < 48 * 60 * 60 * 1000) {
    date_disp += 'Yesterday';
  } else {
    date_disp += date.getFullYear() + '-';
    var month = date.getMonth() + 1;
    if (month < 10) {
      date_disp += '0';
    }
    date_disp += month + '-' + date.getDate();
  }

  return date_disp;
}

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
