const $sendBtn = document.querySelector('#sendBtn');
const $msg = document.querySelector('#msg');
$sendBtn.addEventListener('click', (event) => {
  let msg = $msg.value;
  addToDiscussion('self', msg);
  $sendBtn(msg);

  $msg.value = '';
  $msg.focus();
});

function addToDiscussion(writer, msg) {
  const $discussion = document.querySelector('.discussion');
  let contents =
    "<li class='" +
    writer +
    "'>" +
    "<div class='message'>" +
    '<p>' +
    msg +
    '</p>' +
    '</div></li>';
  $discussion.prepend(contents);
}

async function send(mag) {
  try {
    const response = await fetch('../ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: mag }),
    });

    const prediction = await response.json();
    addToDiscussion('other', prediction.response.content);
  } catch (err) {
    console.error('Error fetching data:', err);
    alert('Error occured');
  } finally {
  }
}
