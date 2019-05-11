module.exports = {
  truncate: function (string, length) {
    if (string.length > length && string.length > 0) {
      let new_str = string + " ";
      new_str = string.substr(0, length);
      new_str = string.substr(0, new_str.lastIndexOf(' '));
      new_str = (new_str.length > 0) ? new_str : string.substr(0, length);
      return new_str + '...';
    }
    return string
  },
  formatDate: function (date, format) {
    return moment(date).format(format);
  },
}