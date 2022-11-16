async function newPostHandler(event){
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const post_url = document.querySelector('input[name="post-url"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_link
        }),
        header:{
            'Content-Type': 'application/json'
        }
    });
    //if post goes through, then load dashboard, if not, then throw alert
    if(response.ok){
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);