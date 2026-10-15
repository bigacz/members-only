const form = document.getElementById('form');
const errorPanel = document.getElementById('form_error-panel');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const response = await fetch('/register', {
    method: 'POST',
    body: new URLSearchParams(new FormData(form)),
  });

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');

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

  window.location.pathname = '/login';
});

function renderErrors(errors) {
  errorPanel.textContent = '';

  errors.forEach((error) => {
    const errorLi = document.createElement('li');
    errorLi.textContent = error.msg;

    errorPanel.append(errorLi);
  });
}
