document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの送信を一旦停止

    // フォームから入力値を取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;

    const messageDiv = document.getElementById('message');

    // ★★★ ここにあなたのGoogle Apps ScriptのURLを貼り付けます ★★★
    const gasUrl = 'https://script.google.com/macros/s/AKfycbxnOqXYizivK58MVPxMgEcITSNuFuntgYyXi41HAGsswCzystjXw36FCWtlllbEvPBZ/exec';

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
            throw new Error('ネットワークエラーまたはサーバーエラー');
        }
        return response.json();
    })
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
`;
            messageDiv.textContent = bookingSummary;
            messageDiv.className = 'message success';
        } else {
            throw new Error(data.message || '不明なエラー');
        }
    })
    .catch(error => {
        messageDiv.textContent = '予約の送信に失敗しました。時間をおいて再度お試しください。';
        messageDiv.className = 'message error';
        console.error('Error:', error);
    });
});
