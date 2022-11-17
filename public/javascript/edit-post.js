async function editPost(event){
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_link = document.querySelector('input[name="post-link"]').value.trim();
    console.log('ln 6 ',post_link)
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
            title,
            post_link
        }),
        headers:{
            'Content-Type': 'application/json' 
        }
    });

    //if post request goes through, then load dashboard page. if not, then throw alert.
    if(response.ok){
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editPost);