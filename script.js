document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // フォームの送信を停止

    // フォームから入力値を取得
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const people = document.getElementById('people').value;
    const time = document.getElementById('time').value;

    const messageDiv = document.getElementById('message');

    // ★★★ ここにあなたのGoogle Apps ScriptのURLを貼り付けます ★★★
    const gasUrl = 'https://script.google.com/macros/s/AKfycbytGkKbb3oNWeRxDiUUmzzqK-8wuRzgdH-IfsPqygIcDlU0imargIi5YwY5uinXtgNd/exec';

    // 予約内容の確認メッセージを準備
    const bookingSummary = `
🌟 予約が完了しました 🌟
お名前: ${name}
メールアドレス: ${email}
人数: ${people}名
希望時間: ${time}～ 上映回
---
※予約情報はメモするか、スクリーンショットを保存してください。
`;
    
    // 1. ポップアップで即座に予約内容を表示
    alert(bookingSummary);

    // 2. 予約内容をHTMLに表示
    messageDiv.innerHTML = `<pre>${bookingSummary}</pre><button onclick="copyToClipboard()">内容をコピー</button>`;
    messageDiv.className = 'message success';
    messageDiv.classList.remove('hidden');

    // 3. フォームをリセット
    this.reset();
    
    // 4. その後、Apps Scriptに非同期でデータを送信する
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('people', people);
    formData.append('time', time);

    fetch(gasUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            console.error('サーバーへの送信中にエラーが発生しました。', response.statusText);
        }
        return response.text();
    })
    .then(data => {
        console.log('サーバーからの応答:', data);
    })
    .catch(error => {
        console.error('予約データの送信に失敗しました:', error);
    });
});

// 予約内容をクリップボードにコピーする関数
function copyToClipboard() {
    const messageDiv = document.getElementById('message');
    const textToCopy = messageDiv.querySelector('pre').textContent;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('予約内容がクリップボードにコピーされました！');
    }).catch(err => {
        console.error('コピーに失敗しました', err);
        alert('コピーに失敗しました。手動でコピーしてください。');
    });
}
