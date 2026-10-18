const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', async () => {
  try {
    const response = await fetch('/logout', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(response);
    }

    if (response.status == 200) {
      window.location.pathname = '/';
    }
  } catch (error) {
    window.location.pathname = '/error';
    console.error(error);
  }
});
