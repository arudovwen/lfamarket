function checkAuth() {
    var admin = JSON.parse(localStorage.getItem("typeAdmin"));
  
    if (!admin && window.location.pathname !=='/lfamarket/admin/login.html') {
        
      window.location.href = "/lfamarket/admin/login.html";
    }
    if (admin && window.location.pathname =='/lfamarket/admin/login.html') {
      window.location.href = "/lfamarket/admin/home.html";
    }
  }
  
    checkAuth();
  
  