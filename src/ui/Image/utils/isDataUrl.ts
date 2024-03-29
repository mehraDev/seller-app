function isDataURL(s: string | undefined) {
  if (!s) {
    return false;
  }
  return !!s.match(isDataURL.regex);
}
isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z-]+=[a-z-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i;

export default isDataURL;
