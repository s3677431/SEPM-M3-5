var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var btnLogin = document.getElementById('btn-login');

btnLogin.onclick = async function(){
    const email = userEmail.value;
    const password = userPassword.value;
    if(email=="" && password==""){
        alert("Please enter email and password")
    }
    else{
    const response = await fetch('/api/manager/signin', {
        method: 'post',
        body: JSON.stringify({email,password}),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        localStorage.setItem("isLoggedIn","true");
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
}
}
