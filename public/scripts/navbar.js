const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(response);
    }
  } catch (error) {
    window.location.pathname = '/error';
    console.error(error);
  }
});
