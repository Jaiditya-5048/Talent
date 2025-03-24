function convert(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toUTCString();
}

const unixTimestamp = 1742542480; // Example timestamp
const utcDateString = convert(unixTimestamp)
console.log("hello")