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
    messageDiv.textContent = bookingSummary;
    messageDiv.className = 'message success';

    // Apps Scriptにデータを送信
    fetch(gasUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // HTTPステータスが200 OKでない場合、エラーをコンソールに表示
        if (!response.ok) {
            console.error('サーバーへの送信中にエラーが発生しました。', response.statusText);
        }
        return response.text();
    })
    .then(data => {
        // サーバーからの応答内容をコンソールに表示
        console.log('サーバーからの応答:', data);
    })
    .catch(error => {
        // ネットワークエラーなどが発生した場合、コンソールにログを記録
        console.error('予約データの送信に失敗しました:', error);
    });
});
