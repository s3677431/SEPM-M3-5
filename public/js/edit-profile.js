const fullName = document.getElementById('fullname');
const Email = document.getElementById('email');
const Phone = document.getElementById('phone');
const Address = document.getElementById('address');
const btnUpdate = document.getElementById('btn-update');

btnUpdate.onclick = async function(){
    const fullname = fullName.value; const email = Email.value;
     const phone = Phone.value;
    const address = Address.value;
   
    const response = await fetch('/api/staff/update-profile', {
            method: 'post',
            body: JSON.stringify({fullname,email,phone,address}),
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (response.ok) {
            alert("profile updated successfully");
            document.location.replace('/dashboard');    
            
          } else {
            alert(response.statusText);
          }
    
}