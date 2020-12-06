let numFl = 1 //数値フラグ
let dotFl = 0 //小数点フラグ
let opeFl = 0 //演算子フラグ
let parCount = 0 //括弧カウント
let firstFl = 0 //初入力フラグ
let equalFl = 1 //演算処理フラグ
let result = 0 //計算結果を入れる変数
let disp = '' //ディスプレイに表示する変数

//数値 or 小数点が入力された時
let inputNumber = value => {
    if (equalFl == 1) { //演算後の入力をする時
        inputClear();
        equalFl = 0;
    }
    if (value == '.') { //小数点が入力されたとき
        if (firstFl == 0) { //その項の最初の入力が小数点だった時
            disp += '0.'; //0.○○
            document.getElementById('d_box').textContent = disp;
            console.log('0.');
            numFl = 0;
            opeFl = 0;
            dotFl = 1;
            firstFl = 1;
            result = '0.'
        }
        else if (dotFl != 1) { //その項で小数点がまだ無いとき
            disp += '.'; //1~9.○○
            document.getElementById('d_box').textContent = disp;
            console.log('.');
            numFl = 0;
            opeFl = 0;
            dotFl = 1;
            result += '.';
        }
    } else if (firstFl == 1 || value != '00') { //数値が入力された時
        disp += value;
        document.getElementById('d_box').textContent = disp;
        console.log(value);
        numFl = 1;
        opeFl = 0;
        firstFl = 1;
        result += value;
    }
}
//演算子が入力された時
let inputOperator = value => {
    if (equalFl == 1) { //演算後の値を利用する時
        disp = String(result);
        document.getElementById('d_box').textContent = disp;
        equalFl = 0;
    }
    if (numFl == 1 && opeFl == 0) {
        if (value != '=') { //算術演算子が入力された時
            disp += value;
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            numFl = 0;
            opeFl = 1;
        } else if (value == '=') { //イコールが入力された時
            result = eval(disp);
            disp = (disp + '=' + result);
            document.getElementById('d_box').textContent = disp;
            console.log('=');
            console.log(result);
            numFl = 1;
            opeFl = 0;
            equalFl = 1;
        }
        dotFl = 0;
        firstFl = 0;
        result = 0;
    }
}
//括弧が入力された時
let inputParenthesis = value => {
    if (equalFl == 0) {
        if (numFl == 0 && opeFl == 1 && value == '(') { //開き括弧が入力された時
            disp += value;
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            parCount++;
        } else if (numFl == 1 && opeFl == 0 && parCount != 0 && value == ')') { //閉じ括弧が入力された時
            disp += value;
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            parCount--;
        }
    }
}
//+/-が入力された時
let inputSign = () => {
    if (result > 0) { //数値が正の時
        disp = disp.slice(0, disp.length - String(result).length);
        result = eval(-1 * result);
        disp += '(' + result + ')';
    } else if (result < 0) { //数値が負の時
        disp = disp.slice(0, disp.length - (String(result).length+2));
        result = eval(-1 * result);
        disp += result;
    }
    document.getElementById('d_box').textContent = disp;
    console.log(result);
}
//cが入力された時
let inputClear = () => {
    numFl = 0;
    dotFl = 0;
    opeFl = 0;
    firstFl = 0;
    equalFl = 0;
    result = '';
    disp = '';
    document.getElementById('d_box').textContent = '0';
    console.log('Clear');
}
//←が入力された時
let inputDelete = () => {
    if (equalFl == 0) {
        disp = disp.slice(0, -1);
        document.getElementById('d_box').textContent = disp;
        console.log('Delete');
    }
}