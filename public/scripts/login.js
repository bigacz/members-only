const form = document.getElementById('form');
const errorPanel = document.getElementById('form_error-panel');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  let response;
  try {
    response = await fetch('/login', {
      method: 'POST',
      body: new URLSearchParams(new FormData(form)),
    });
  } catch (error) {
    console.log(error);
  }

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');

  if (response.status === 401) {
    renderUnauthorized();
  }

  if (response.status === 200) {
    window.location.pathname = '/';
  }

  if (isJson) {
    const json = await response.json();
    if (!response.ok) {
      if (json?.errors) {
        return renderErrors(json.errors);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }
});

function renderErrors(errors) {
  errorPanel.textContent = '';

  errors.forEach((error) => {
    const errorLi = document.createElement('li');
    errorLi.textContent = error.msg;

    errorPanel.append(errorLi);
  });
}

function renderUnauthorized() {
  errorPanel.textContent = '';

  const errorLi = document.createElement('li');
  errorLi.textContent = 'Wrong password or email';

  errorPanel.append(errorLi);
}
