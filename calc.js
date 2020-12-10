let numFl = 1 //数値フラグ
let dotFl = 0 //小数点フラグ
let opeFl = 0 //演算子フラグ
let parCount = 0 //括弧カウント
let minusFl = 0 //マイナスフラグ
let firstFl = 0 //初入力フラグ
let equalFl = 1 //演算処理フラグ
let result = 0 //演算結果を入れる変数
let disp = '' //ディスプレイに表示する変数
let relFl = 0 //文法解放フラグ

//数値 or 小数点が入力された時
let inputNumber = value => {
    if ((disp.slice(disp.length - 1, disp.length) !== ')') || relFl == 1) {
        if (equalFl == 1) { //演算後の入力をする時
            inputClear();
            equalFl = 0;
        }
        if (value == '.') { //小数点が入力されたとき
            if ((firstFl == 0 && minusFl == 0) && relFl == 0) { //その項の最初の入力が小数点だった時
                disp += '0.'; //0.○○
                document.getElementById('display').textContent = disp;
                console.log('0.');
                numFl = 0;
                opeFl = 0;
                dotFl = 1;
                firstFl = 1;
                result = '0.'
            }else if ((dotFl != 1 && minusFl == 0) || relFl == 1) { //その項で小数点がまだ無いとき
                disp += '.'; //1~9.○○
                document.getElementById('display').textContent = disp;
                console.log('.');
                numFl = 0;
                opeFl = 0;
                dotFl = 1;
                result += '.';
            }
        } else if (((firstFl == 1 || (firstFl == 0 && value != '0' && value != '00') || (firstFl == 0 && opeFl == 1 && value != '00')) && minusFl == 0) || relFl == 1) { //数値が入力された時
            disp += value;
            document.getElementById('display').textContent = disp;
            console.log(value);
            numFl = 1;
            opeFl = 0;
            result += String(value);
            if (firstFl == 0)
                result = value;
            firstFl = 1;
        }
    }
}
//演算子が入力された時
let inputOperator = value => {
    if (equalFl == 1) { //演算後の値を利用する時
        let tmp = result;
        inputClear();
        result = tmp;
        disp = result;
        document.getElementById('display').textContent = disp;
        console.log(result);
        equalFl = 0;
    }
    if ((numFl == 1 && opeFl == 0) || relFl == 1) {
        if (value != '=') { //算術演算子が入力された時
            disp += value;
            document.getElementById('display').textContent = disp;
            console.log(value);
            numFl = 0;
            opeFl = 1;
            result = 0;
        } else if (value == '=' && String(eval(disp)) !== 'NaN') { //イコールが入力された時
            result = eval(disp);
            result = changeWord(result);
            disp = (disp + '=' + result);
            document.getElementById('display').textContent = disp;
            document.getElementById('log').textContent += disp+' ';
            console.log('=');
            console.log(result);
            numFl = 1;
            opeFl = 0;
            equalFl = 1;
        }
        dotFl = 0;
        minusFl = 0;
        firstFl = 0;
    }
}
//括弧が入力された時
let inputBrackets = value => {
    if (equalFl == 0) {
        if ((numFl == 0 && opeFl == 1 && value == '(') || relFl == 1) { //開き括弧が入力された時
            disp += value;
            document.getElementById('display').textContent = disp;
            console.log(value);
            parCount++;
        } else if (numFl == 1 && opeFl == 0 && parCount != 0 && value == ')') { //閉じ括弧が入力された時
            disp += value;
            document.getElementById('display').textContent = disp;
            console.log(value);
            parCount--;
        }
    }
}
//+/-が入力された時
let inputSign = () => {
    if ((equalFl == 0 && String(result).length == 1) && relFl == 0)
        changeSign();
    else if ((equalFl == 0 && String(result).slice(String(result).length - 1, String(result).length) !== '.')&& relFl == 0)
        changeSign();
}
let changeSign = () => {
    if (result > 0) { //数値が正の時
        disp = disp.slice(0, disp.length - String(result).length);
        result = eval(-1 * result);
        disp += '(' + result + ')';
        minusFl = 1;
    } else if (result < 0) { //数値が負の時
        disp = disp.slice(0, disp.length - (String(result).length + 2));
        result = eval(-1 * result);
        disp += result;
        minusFl = 0;
    }
    document.getElementById('display').textContent = disp;
    console.log(result);
}
//cが入力された時
let inputClear = () => {
    numFl = 1;
    dotFl = 0;
    opeFl = 0;
    parCount = 0;
    minusFl = 0;
    firstFl = 0;
    equalFl = 1;
    result = 0;
    disp = '';
    relFl = 0;
    document.getElementById('display').textContent = '0';
    console.log('Clear');
}
//←が入力された時(文法が自由になる)
let inputDelete = () => {
    if (equalFl == 0) {
        disp = disp.slice(0, -1);
        document.getElementById('display').textContent = disp;
        console.log('Delete');
        relFl = 1;
        if (disp.length == 0)
            inputClear();
    }
}
//演算結果チェック
let changeWord = result => {
    if (String(result) === 'Infinity')
        return '*Infinity(仕様です)*'
    return result;
}