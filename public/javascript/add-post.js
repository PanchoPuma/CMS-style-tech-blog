async function newFormHandler(event) {

    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_textarea = document.querySelector('input[name="post_textarea"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_textarea
      }),

      headers: {
        'Content-Type': 'application/json'
      }

    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  
  document.querySelector('.new-post').addEventListener('submit', newFormHandler);
