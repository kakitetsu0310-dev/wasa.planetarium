document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの送信を一旦停止

    // フォームから入力値を取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;

    const messageDiv = document.getElementById('message');

    // Apps ScriptのURL
    const gasUrl = 'https://script.google.com/macros/s/AKfycbwUmCeZtA0Re5RawYrl17tjJ1Yau2_yy5i6ImKl4oqmJUwUMe9gQ1OVpXRd_yOZ1Vd_bg/exec';

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
            throw new Error('ネットワークエラー');
        }
        return response.json(); // .text()から.json()に変更
    })
    .then(data => {
        // 成功メッセージの表示
        const bookingSummary = `
🌟 予約が完了しました 🌟
お名前: ${name}
メールアドレス: ${email}
人数: ${people}名
希望時間: ${time}～ 上映回
---
※予約情報は自動で記録されました。
`;
        messageDiv.textContent = bookingSummary;
        messageDiv.className = 'message success';
        messageDiv.classList.remove('hidden');

        // フォームをリセット
        this.reset();
    })
    .catch(error => {
        // エラーメッセージの表示
        messageDiv.textContent = '予約の送信に失敗しました。時間をおいて再度お試しください。';
        messageDiv.className = 'message error';
        messageDiv.classList.remove('hidden');
        console.error('Error:', error);
    });
});
