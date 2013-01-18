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
