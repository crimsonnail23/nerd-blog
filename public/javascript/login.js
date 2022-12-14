async function signupFormHandler(event){
    event.preventDefault();
    //get data from specific html elements. and then use that data in fetch request.
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    //if all three fields have stuff written in it, then continue to the fetch request.
    if(username && email && password){
         const response= await fetch('/api/users',{
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers:{
                'Content-Type': 'application/json'
            }
         });
         if (response.ok){
            console.log('success');
            //following code should clear the form.
            document.querySelector('#username-signup').value=''
            document.querySelector('#email-signup').value=''
            document.querySelector('#password-signup').value=''
        } else {
            alert(response.statusText);
        } 
    }
}

async function loginFormHandler(event) {
    event.preventDefault();
    //get data from specific html elements. and then use that data in fetch request.
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //only run fetch request if email and password have something written in it.
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  }

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);