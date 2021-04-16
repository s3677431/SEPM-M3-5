const btnLogout = document.getElementById('btn-logout');

btnLogout.onclick = function(){
    localStorage.removeItem("isLoggedIn");
    document.location.replace('/logout');
}
