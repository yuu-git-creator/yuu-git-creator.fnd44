'use strict'


// HTMLにある要素をIDを使って取得 (gators.jsと同じやり方)
const textInput = document.getElementById("textInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let todoArray = []; // タスクを溜めておくための配列

// 「追加」ボタンがクリックされたときの処理
addBtn.addEventListener("click", function () {
  const text = textInput.value; // 入力された文字を取得

  // 文字が空でなければ実行
  if (text !== "") {
    todoArray.push(text); // 配列に文字を追加
    textInput.value = ""; // 入力欄を空にする
    addList(); // 画面を更新する処理を実行
  } else {
    alert("入力してください。");
  }
});


// 配列の中身を画面に表示する処理
function addList() {
  taskList.innerHTML = ""; // 二重に表示されないよう、一度中身を空にする

  // 配列の数だけ、繰り返し処理を行う (gators.jsのループ処理と同じ考え方)
  for (let i = 0; i < todoArray.length; i++) {

    // --- 表示するための部品作り ---
    const taskBox = document.createElement("div");
    taskBox.className = "button-group";

    const liTag = document.createElement("li");
    liTag.textContent = todoArray[i];

    // 削除ボタンを作成
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.className = "delete-btn";

    // ボタンに「番号シール」を貼る
    // ボタンの dataset.index という場所に、今の番号(i)を書き込んでおく
    //  <button data-index="0"> 
    deleteBtn.dataset.index = i;

    // 削除ボタンの処理
    deleteBtn.addEventListener("click", function (event) {

      // event.target は「今クリックされたそのボタン」のこと
      // いったん clickedButton という変数に入れて、分かりやすくする
      const clickedButton = event.target;

      // そのボタンのポケットから、中身（番号）を取り出す
      const targetIndex = clickedButton.dataset.index;

      // 読み取った番号(targetIndex)を使って削除を実行
      deleteTask(targetIndex);
    });

    // 作った部品を合体させる
    taskBox.appendChild(liTag);
    taskBox.appendChild(deleteBtn);
    taskList.appendChild(taskBox);
  }
}

// 指定された番号のタスクを消す処理
function deleteTask(index) {
  todoArray.splice(index, 1); // 配列から index番目の要素を1つ削除
  addList(); // 消した後の状態で画面を書き直す
}
