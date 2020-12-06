let numFl = 0 //数値フラグ
let dotFl = 0 //小数点フラグ
let opeFl = 0 //演算子フラグ
let parFl = 0 //括弧フラグ
let firstFl = 0 //初入力フラグ
let equalFl = 0 //演算処理フラグ
let result = '' //計算結果を入れる変数
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
            dotFl = 1;
            firstFl = 1;
            result = '0.'
        }
        else if (dotFl != 1) { //その項で小数点がまだ無いとき
            disp += '.'; //1~9.○○
            document.getElementById('d_box').textContent = disp;
            console.log('.');
            numFl = 0;
            dotFl = 1;
            result += '.';
        }
    }
    else if (firstFl == 1 || value != '0' || value != '00') { //数値が入力された時
        disp += value;
        document.getElementById('d_box').textContent = disp;
        console.log(value);
        numFl = 1;
        opeFl = 0;
        parFl = 0;
        firstFl = 1;
        result += value;
    }
}
//演算子が入力された時
let inputOperator = value => {
    if (numFl == 1 && opeFl == 0) {
        if (equalFl == 1) { //演算後の値を利用する時
            disp = result;
            document.getElementById('d_box').textContent = disp;
            equalFl = 0;
        }
        if (value != '=') { //算術演算子が入力された時
            disp += value;
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            opeFl = 1;
        } else if (value == '=') { //イコールが入力された時
            result = eval(disp);
            disp = (disp + '=' + result);
            document.getElementById('d_box').textContent = disp;
            console.log('=');
            console.log(result);
            opeFl = 0;
            equalFl = 1;
        }
        numFl = 0;
        dotFl = 0;
        firstFl = 0;
        result = '';
    }
}
//括弧が入力された時
let inputParenthesis = value => {
    if (parFl == 0 && equalFl == 0) {
        if (numFl == 0 && opeFl == 1 && value == '(') {
            disp += value;
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            parFl = 1;
        } else if (numFl == 1 && opeFl == 0 && value == ')') {
            disp += value;
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            parFl = 1;
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
    parFl = 0;
    firstFl = 0;
    equalFl = 0;
    result = '';
    disp = '';
    document.getElementById('d_box').textContent = '0';
    console.log(Clear);
}
//←が入力された時
let inputDelete = () => {
    if (equalFl == 0) {
        disp = disp.slice(0, -1);
        document.getElementById('d_box').textContent = disp;
        console.log(Delete);
    }
}