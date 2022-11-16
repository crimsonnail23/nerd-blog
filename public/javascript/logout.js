async function logout(){
    const response = await fetch('api/users/logout',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        }
    });
    //if logout was successful then go to home page.
    if(response.ok){
        document.location.replace('/');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('#logout').addEventListener('click', logout);