let numFl = 0 //数値フラグ
let dotFl = 0 //小数点フラグ
let opeFl = 0 //演算子フラグ
let firstFl = 0 //初入力フラグ
let equalFl = 0 //演算処理フラグ
let result = 0 //計算結果を入れる変数
let end //最後に入力した値を入れる変数
let disp = '' //ディスプレイに表示する変数

//数値 or 小数点の入力があった時
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
            end = value;
        }
        else if (dotFl != 1) { //その項で小数点がまだ無いとき
            disp += '.'; //1~9.○○
            document.getElementById('d_box').textContent = disp;
            console.log('.');
            numFl = 0;
            dotFl = 1;
            end = value;
        }
    }
    else if (firstFl == 1 || value != '0' || value != '00') {
        disp += value; //数値
        document.getElementById('d_box').textContent = disp;
        console.log(value);
        numFl = 1;
        opeFl = 0;
        firstFl = 1;
        end = value;
    }
}

//演算子の入力があったとき
let inputOperator = value => {
    end = value;
    if (numFl == 1) {
        if (equalFl == 1) {
            disp = result;
            document.getElementById('d_box').textContent = disp;
            equalFl = 0;
        }
        if (value != '=' && opeFl == 0) {
            opeFl = 1;
            result = disp;
            operator = value;
            disp = (disp + operator);
            document.getElementById('d_box').textContent = disp;
            console.log(operator);
        } else {
            opeFl = 0;
            equalFl = 1;
            result = eval(disp);
            disp = (disp + '=' + result);
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            console.log(value);
        }
        firstFl = 0;
        dotFl = 0;
    }
}

// +/-の入力があったとき
let inputSign = () => {
    let tmp;
    if (equalFl == 1) {
        tmp = result;
        disp = eval(-1 * tmp);
        document.getElementById('d_box').textContent = disp;
    }
    tmp = document.getElementById('d_box').textContent;
    disp = eval(-1 * tmp);
    document.getElementById('d_box').textContent = disp;
}

// cの入力があったとき
let inputClear = () => {
    numFl = 0;
    opeFl = 0;
    firstFl = 0;
    dotFl = 0;
    disp = '';
    result = 0;
    end = 0;
    document.getElementById('d_box').textContent = result;
    console.log(result);
}
let inputDelete = () => {
    let last = disp.sline(-1);
    if (end == '+' || end == '-' || end == '*' || end == '/') {
        disp = disp.replace(last, '');
        document.getElementById('d_box').textContent = disp;
        end = disp.sline(-1);
    }
}