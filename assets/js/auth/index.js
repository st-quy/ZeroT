async function handleSignout() {
  localStorage.clear();
  setTimeout(function () {
    location.href = `${location.origin}/index.html`;
  }, 500);
}

// const profile = JSON.parse(localStorage.getItem('me'))
// if (profile && profile.status !== 'active') {
//   alert("show modal confirm email")
// }
