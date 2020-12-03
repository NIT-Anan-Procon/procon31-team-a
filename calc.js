let numFl = 0 //数値フラグ
let opeFl = 0 //演算子フラグ
let dotFl = 0 //小数点フラグ
let firstFl = 0 //初入力フラグ
let equalFl = 0 //演算処理フラグ
let disp = '' //ディスプレイに表示する変数
let result = 0 //計算結果を入れる変数
let operator //演算子を入れる変数
let end //最後に入力した値を入れる変数

//数字 or . の入力があったとき
let inputNumber = value => {
 end = value;
 if (equalFl == 1) {
  inputClear();
  equalFl = 0;
 }
    if(value=='.'){
        if (firstFl == 0) {
         disp = result + value;
            document.getElementById('d_box').textContent = disp;
            firstFl=1;
            dotFl=1;
        }
        else if(dotFl!=1){
            disp += value;
            document.getElementById('d_box').textContent = disp;
            dotFl=1;
        }
    }
    else if(firstFl==1 || value!='0' || value!='00'){
        numFl = 1;
        opeFl = 0;
        disp += value;
        document.getElementById('d_box').textContent = disp;
        console.log(value);
        firstFl = 1;
    }
}

//演算子 or = の入力があったとき
let inputOperator = value => {
 end = value;
  if (numFl == 1) {
    if (equalFl == 1) {
        disp = result;
        document.getElementById('d_box').textContent = disp;
        equalFl = 0;
    }
        if (value != '='&&opeFl==0) {
            opeFl=1;
            result=disp;
            operator=value;
            disp=(disp+operator);
            document.getElementById('d_box').textContent = disp;
            console.log(operator);
        }else{
            opeFl = 0;
            equalFl = 1;
            result = eval(disp);
            disp = (disp + '='+ result);
            document.getElementById('d_box').textContent = disp;
            console.log(value);
            console.log(value);
        }
        dotFl=0;
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
    disp=eval(-1 * tmp);
    document.getElementById('d_box').textContent = disp;
}

// cの入力があったとき
let inputClear = () =>{
    numFl=0;
    opeFl=0;
    firstFl=0;
    dotFl=0;
    disp='';
 result = 0;
 end = 0;
    document.getElementById('d_box').textContent = result;
    console.log(result)
}
let inputDelete = () => {
 let last = disp.sline(-1);
 if (end == '+' || end == '-' || end == '*' || end == '/') {
  disp = disp.replace(last, '');
  document.getElementById('d_box').textContent = disp;
  end = disp.sline(-1);

}
}

document.getElementById('d_box').textContent = result;