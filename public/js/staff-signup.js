const fullName = document.getElementById('fullname');
const Email = document.getElementById('email');
const Phone = document.getElementById('phone');
const Address = document.getElementById('address');
const hrsLimit = document.getElementById('hrs-limit');
const Password = document.getElementById('password');
const ConfirmPassword = document.getElementById('c-password');
const btnSignup = document.getElementById('btn-signup');

btnSignup.onclick =async function(){
    const fullname = fullName.value; const email = Email.value; const phone = Phone.value;
    const address = Address.value; const password= Password.value;
    const conPassword = ConfirmPassword.value;const hours_limit = hrsLimit.value;
    if(password != conPassword){
        alert("Password mismatch")
    }
    else{
        const response = await fetch('/api/staff/signup', {
            method: 'post',
            body: JSON.stringify({fullname,email,phone,hours_limit,address,password}),
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (response.ok) {
            alert("staff added successfully");
            document.location.replace('/dashboard');    
            
          } else {
            alert(response.statusText);
          }
    }
}

