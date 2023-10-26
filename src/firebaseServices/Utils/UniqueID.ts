function generateTimestampId(): string {
  const timestamp = Date.now();
  return timestamp.toString();
}
function generateUniqueTimestampId(): string {
  const timestamp = Date.now();
  const randomComponent = Math.floor(Math.random() * 1000000); // Adjust the range as needed.
  return `${timestamp}_${randomComponent}`;
}
function generateUniqueId(): string {
  const randomComponent = Math.floor(Math.random() * 1000000);
  return `${randomComponent}`;
}

export { generateTimestampId, generateUniqueTimestampId, generateUniqueId };
