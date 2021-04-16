const startTime = document.getElementById('start-time');
const endTime = document.getElementById('end-time');
const statusDdn = document.getElementById('status-ddn');
const addShift = document.getElementById('add-shift');

addShift.onclick =async function(){
    const status = statusDdn.options[statusDdn.selectedIndex].value;
    const start_time = startTime.value;
    const end_time = endTime.value;
    const response = await fetch('/api/manager/create-shift',{
        method: 'post',
        body: JSON.stringify({start_time,end_time,status}),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        alert("shift added successfully");
        document.location.replace('/dashboard');    
    } else {
        alert(response.statusText);
      }
}