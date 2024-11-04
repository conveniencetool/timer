let timer;
let isRunning = false;
let timeRemaining;
let workTime = 25 * 60; // デフォルトの作業時間（秒）
let breakTime = 5 * 60; // デフォルトの休憩時間（秒）

// スタートボタンのイベントリスナー
document.getElementById('startBtn').addEventListener('click', function() {
    if (!isRunning) {
        isRunning = true;
        timeRemaining = workTime;
        startTimer();
    }
});

// リセットボタンのイベントリスナー
document.getElementById('resetBtn').addEventListener('click', function() {
    resetTimer();
});

// タイマーのスタート関数
function startTimer() {
    timer = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("作業時間が終了しました！休憩に入ります。");
            timeRemaining = breakTime; // 休憩時間に切り替え
            startTimer(); // 休憩タイマーをスタート
        } else {
            timeRemaining--;
            updateDisplay();
        }
    }, 1000);
}

// タイマー表示の更新
function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timerDisplay').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// タイマーのリセット関数
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = workTime;
    updateDisplay();
}

// 作業時間と休憩時間の設定を更新
document.getElementById('workTime').addEventListener('change', function() {
    workTime = this.value * 60; // 入力された分を秒に変換
    resetTimer();
});

document.getElementById('breakTime').addEventListener('change', function() {
    breakTime = this.value * 60; // 入力された分を秒に変換
});
