// ゲームボードのサイズ
const boardWidth = 600;
const boardHeight = 600;

// スネークの初期位置とサイズ
const snakeStartX = 100;
const snakeStartY = 100;
const snakeSize = 20;

// 食べ物の初期位置とサイズ
const foodSize = 20;

// スコアの初期値
let score = 0;

// ゲームボードの作成
const board = document.createElement('canvas');
board.width = boardWidth;
board.height = boardHeight;
document.body.appendChild(board);

// ゲームボードの描画コンテキストの取得
const ctx = board.getContext('2d');

// スネークの初期位置とサイズの設定
let snakeX = snakeStartX;
let snakeY = snakeStartY;
let snakeSpeedX = snakeSize;
let snakeSpeedY = 0;

// 食べ物の初期位置の設定
let foodX = Math.floor(Math.random() * (boardWidth - foodSize));
let foodY = Math.floor(Math.random() * (boardHeight - foodSize));

// ゲームループの開始
setInterval(() => {
  // スネークの移動
  snakeX += snakeSpeedX;
  snakeY += snakeSpeedY;

  // スネークが画面外に出た場合の処理
  if (snakeX < 0 || snakeX + snakeSize > boardWidth || snakeY < 0 || snakeY + snakeSize > boardHeight) {
    gameOver();
  }

  // スネークが食べ物を食べた場合の処理
  if (snakeX < foodX + foodSize && snakeX + snakeSize > foodX && snakeY < foodY + foodSize && snakeY + snakeSize > foodY) {
    score++;
    foodX = Math.floor(Math.random() * (boardWidth - foodSize));
    foodY = Math.floor(Math.random() * (boardHeight - foodSize));
  }

  // スネークの描画
  ctx.clearRect(0, 0, boardWidth, boardHeight);
  ctx.fillStyle = 'green';
  ctx.fillRect(snakeX, snakeY, snakeSize, snakeSize);

  // 食べ物の描画
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, foodSize, foodSize);

  // スコアの表示
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}, 1000 / 10);

// キーボードの入力によるスネークの移動制御
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      snakeSpeedX = -snakeSize;
      snakeSpeedY = 0;
      break;
    case 'ArrowRight':
      snakeSpeedX = snakeSize;
      snakeSpeedY = 0;
      break;
    case 'ArrowUp':
      snakeSpeedX = 0;
      snakeSpeedY = -snakeSize;
      break;
    case 'ArrowDown':
      snakeSpeedX = 0;
      snakeSpeedY = snakeSize;
      break;
  }
});

// ゲームオーバー時の処理
function gameOver() {
  alert(`Game Over! Score: ${score}`);
  location.reload();
}
