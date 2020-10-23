function checkAuth() {
  var user = JSON.parse(localStorage.getItem("typeUser"));

  if (!user && window.location.pathname !=='/login.html') {
      
    window.location.href = "/login.html";
  }
  if (user && window.location.pathname =='/login.html') {
    window.location.href = "/dashboard/home.html";
  }
}

  checkAuth();

