document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの送信を停止

    // フォームから入力値を取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;

    const messageDiv = document.getElementById('message');

    // ★★★ ここにあなたのGoogle Apps ScriptのURLを貼り付けます ★★★
    const gasUrl = 'https://script.google.com/macros/s/AKfycbzCSAP219hqYBEfmjqVoeUnEThPGrJYPBDk85l-IyL8PEp3bqZVQahtq8NOETam_3C5/exec';
    
    // フォームデータを準備
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('people', people);
    formData.append('time', time);

    // Apps Scriptにデータを送信
    fetch(gasUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('サーバーエラーが発生しました。');
        }
        return response.json(); // 応答をJSONとして解析
    })
    .then(data => {
        // Apps Scriptからの応答内容をチェック
        if (data.result === 'success') {
            // 成功メッセージの表示
            const bookingSummary = `
🌟 予約が完了しました 🌟
お名前: ${name}
メールアドレス: ${email}
人数: ${people}名
希望時間: ${time}～ 上映回
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
