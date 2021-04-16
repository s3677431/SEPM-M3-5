const fullName = document.getElementById('fullname');
const Email = document.getElementById('email');
const Phone = document.getElementById('phone');
const Address = document.getElementById('address');
const Password = document.getElementById('password');
const ConfirmPassword = document.getElementById('c-password');
const btnSignup = document.getElementById('btn-signup');

btnSignup.onclick =async function(){
    const fullname = fullName.value; const email = Email.value; const phone = Phone.value;
    const address = Address.value; const password= Password.value;
    const conPassword = ConfirmPassword.value;
    if(password != conPassword){
        alert("Password mismatch")
    }
    else{
        const response = await fetch('/api/manager/signup', {
            method: 'post',
            body: JSON.stringify({fullname,email,phone,address,password}),
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (response.ok) {
            alert("manager added successfully");
            if(localStorage.getItem("isLoggedIn")=="true"){
              document.location.replace('/dashboard');    
            }
            else{
              document.location.replace('/manager-signin');
            }
          } else {
            alert(response.statusText);
          }
    }
}



