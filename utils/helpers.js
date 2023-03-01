const formatTime = () => {
  const time = Date.now();
  const timestamp = new Date(time).toLocaleTimeString
  return timestamp
}

module.exports = {
  formatTime
}