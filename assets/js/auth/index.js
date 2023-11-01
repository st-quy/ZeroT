async function handleSignout() {
  localStorage.clear()
  setTimeout(function () {
    location.href = `${location.origin}/index.html`;
  }, 500)
}