let dotFl = 0 //小数点フラグ
let parCount = 0 //括弧カウント
let equalFl = 1 //演算処理フラグ
let result = '' //演算結果を入れる変数
let disp = '' //ディスプレイに表示する変数
let relFl = 0 //文法解放フラグ
let log = '' //計算履歴
let textarea = '' //テキストエリア

//数値 or 小数点が入力された時
let inputNumber = value => {
    document.getElementById('error').textContent = '';
    if (equalFl == 1) { //演算後の入力をする時
        inputClear();
        equalFl = 0;
    }
    if (value === '.' && (dotFl == 0 || relFl == 1)) { //小数点が入力されたとき
        disp += '.'; //1~9.○○
        document.getElementById('formula').textContent = disp;
        console.log('.');
        dotFl = 1;
    } else if (value !== '.') { //数値が入力された時
        disp += value;
        document.getElementById('formula').textContent = disp;
        console.log(value);
    }
}
//演算子が入力された時
let inputOperator = value => {
    document.getElementById('error').textContent = '';
    if (equalFl == 1) { //演算後の値を利用する時
        let tmp = result;
        inputClear();
        result = tmp;
        disp = result;
        document.getElementById('formula').textContent = disp;
        console.log(result);
        equalFl = 0;
    }
    if (value !== '=') { //算術演算子が入力された時
        disp += value;
        document.getElementById('formula').textContent = disp;
        console.log(value);
        dotFl = 0;
    } else { //イコールが入力された時
        try {
            result = eval(disp);
            document.getElementById('formula').textContent = disp;
            document.getElementById('result').textContent = result;
            log += disp + '=' + result + '\n';
            textarea = document.getElementById('log');
            textarea.value = log;
            console.log('=');
            console.log(result);
            console.log('log ← "' + disp + '=' + result + '"');
            equalFl = 1;
        } catch (e) {
            document.getElementById('error').textContent = '* 文法エラー *';
            console.log('* 文法エラー *')
            console.error(e.message);
        }
    }
}
//括弧が入力された時
let inputBrackets = value => {
    document.getElementById('error').textContent = '';
    if (equalFl == 1) { //演算後の入力をする時
        inputClear();
        equalFl = 0;
    }
    if (value === '(' || relFl == 1) { //開き括弧が入力された時
        disp += value;
        document.getElementById('formula').textContent = disp;
        console.log(value);
        parCount++;
    } else if (parCount > 0) { //閉じ括弧が入力された時
        disp += ')';
        document.getElementById('formula').textContent = disp;
        console.log(value);
        parCount--;
    }
}
//cが入力された時
let inputClear = () => {
    dotFl = 0;
    parCount = 0;
    equalFl = 1;
    result = '';
    disp = '';
    relFl = 0;
    document.getElementById('formula').textContent = '';
    document.getElementById('result').textContent = '';
    document.getElementById('error').textContent = '';
    console.log('Clear');
}
//←が入力された時(文法が自由になる)
let inputDelete = () => {
    document.getElementById('error').textContent = '';
    if (equalFl == 0) {
        disp = disp.slice(0, -1);
        document.getElementById('formula').textContent = disp;
        console.log('Delete');
        relFl = 1;
        if (disp.length == 0)
            inputClear();
    }
}