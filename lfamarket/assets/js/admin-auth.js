function checkAuth() {
    var admin = JSON.parse(localStorage.getItem("typeAdmin"));
  
    if (!admin && window.location.pathname !=='/admin/login.html') {
        
      window.location.href = "/admin/login.html";
    }
    if (admin && window.location.pathname =='/admin/login.html') {
      window.location.href = "/admin/home.html";
    }
  }
  
    checkAuth();
  
  