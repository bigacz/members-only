const deleteButtons = document.querySelectorAll(`button[data-message-id]`);

deleteButtons.forEach((button) => {
  button.addEventListener('click', async (event) => {
    const formData = new FormData();

    const messageId = event.target.getAttribute('data-message-id');

    formData.append('messageId', messageId);

    const response = await fetch('/message', {
      method: 'DELETE',
      body: new URLSearchParams(formData),
    });

    if (!response.ok) {
      return (window.location.pathname = '/error');
    }

    window.location.reload();
  });
});
