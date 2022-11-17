async function newPostHandler(event){
    event.preventDefault();
    //get data from specific html elements. and then use that data in fetch request.
    const title = document.querySelector('input[name="post-title"]').value;
    const post_link = document.getElementById('post-link').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            post_link: post_link
        }),
        headers:{
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