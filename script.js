document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの送信を停止

    // フォームから入力値を取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;

    const messageDiv = document.getElementById('message');

    // ★★★ あなたのGoogle Apps ScriptのURLを貼り付けます ★★★
    const gasUrl = 'https://script.google.com/macros/s/AKfycbwhHbMbzGY4l_C-fsTF3MLjfTR44ro7Q5pytyFr8m8RpMtmmxD0riJ-fDdw5XsVguWM/exec';

    // フォームデータをJSON形式に変換
    const payload = {
        name: name,
        email: email,
        people: people,
        time: time
    };

    // Apps Scriptにデータを送信
    fetch(gasUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'  // ★★★ ここにヘッダーを追加 ★★★
        },
        body: JSON.stringify(payload)  // ★★★ JSON形式の文字列を送信 ★★★
    })
    .then(response => {
        console.log('受け取った応答:', response);
        if (!response.ok) {
            throw new Error('サーバーエラーが発生しました。');
        }
        return response.json(); // 応答をJSONとして解析
    })
    .then(data => {
        console.log('JSONデータ:', data);
        // Apps Scriptからの応答内容をチェック
        if (data.result === 'success') {
            // 成功メッセージの表示
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
        } else if (data.result === 'error') {
            // エラーメッセージの表示
            messageDiv.textContent = data.message || '予約の送信に失敗しました。時間をおいて再度お試しください。';
            messageDiv.className = 'message error';
            messageDiv.classList.remove('hidden');
        }
    })
    .catch(error => {
        // ネットワークエラーなどの表示
        messageDiv.textContent = '通信エラーが発生しました。時間をおいて再度お試しください。';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        console.error('Error:', error);
    });
});
