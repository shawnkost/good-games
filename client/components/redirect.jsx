export default function Redirect() {
  const url = new URL(window.location);
  url.hash = '#';
  window.location.replace(url);
  return null;
}
