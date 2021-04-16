const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
const addAvailability = document.getElementById('add-availability');
addAvailability.onclick =async function(){
    const start_time = startTime.value;
    const end_time = endTime.value;
    const response = await fetch('/api/staff/create-available-slot',{
        method: 'post',
        body: JSON.stringify({start_time,end_time}),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        alert("available slot added successfully");
        document.location.replace('/dashboard');    
    } else {
        alert(response.statusText);
      }
}