document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const people = document.getElementById('people').value;
  const time = document.getElementById('time').value;
  const messageDiv = document.getElementById('message');

  const gasUrl = 'https://script.google.com/macros/s/AKfycbwJxiE_LZ8-cszNgMF9n5OBKGHJioMKSodwlUdmiGBAjCgklsnOgDwh515UeYvviQqB/exec';

  const payload = { name, email, people, time };

  fetch(gasUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'  // ← 修正ポイント
    },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(data => {
    if (data.result === 'success') {
      const bookingSummary = `
🌟 予約が完了しました 🌟
お名前: ${name}
メールアドレス: ${email}
人数: ${people}名
希望時間: ${time}
---
※予約情報は自動で記録されました。

メモを取るかスクリーンショットを撮ってください。
`;
      alert(bookingSummary);
      messageDiv.innerHTML = `<pre>${bookingSummary}</pre><button onclick="copyToClipboard()">内容をコピー</button>`;
      messageDiv.className = 'message success';
      messageDiv.classList.remove('hidden');
      this.reset();
    } else {
      messageDiv.textContent = data.message || '予約の送信に失敗しました。';
      messageDiv.className = 'message error';
      messageDiv.classList.remove('hidden');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    messageDiv.textContent = '通信エラーが発生しました。';
    messageDiv.className = 'message error';
    messageDiv.classList.remove('hidden');
  });
});
