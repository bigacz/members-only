const form = document.getElementById('form');
const errorPanel = document.getElementById('form_error-panel');
const resultPanel = document.getElementById('form_result-panel');

const submitButton = document.getElementById('form_submit');

form.addEventListener('submit', async () => {
  event.preventDefault();

  const response = await fetch('/join', {
    method: 'POST',
    body: new URLSearchParams(new FormData(form)),
  });

  const json = await response.json();

  if (response.status == 200) {
    renderPermissions(json.permission);
  }

  const isJson = response.headers
    .get('content-type')
    ?.includes('application/json');

  if (isJson) {
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

function renderPermissions(permission) {
  const paragraph = document.createElement('p');
  paragraph.textContent = `Granted ${permission}`;

  resultPanel.append(paragraph);

  submitButton.disabled = true;
}
