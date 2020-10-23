function checkAuth() {
  var user = JSON.parse(localStorage.getItem("typeUser"));

  if (!user && window.location.pathname !=='/lfamarket/login.html') {
      
    window.location.href = "/lfamarket/login.html";
  }
  if (user && window.location.pathname =='/lfamarket/login.html') {
    window.location.href = "/lfamarket/dashboard/home.html";
  }
}

  checkAuth();

