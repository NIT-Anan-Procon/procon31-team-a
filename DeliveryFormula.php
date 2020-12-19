<?php
    //変数定義
    $formula=$_POST['formula'];
    $now_index=0;
    $send_formula=[];
    $num=0;

    //mysqlに接続
    $link=mysqli_connect("ホスト名","ユーザ名","パスワード");
    if(!$link){
        echo mysqli_error($link);
    }

    //DB取得
    $db_selected=mysqli_select_db($link,'procon31_team_a');
    if(!$db_selected){
        echo 'データベース取得失敗';
    }

    //データの取得
    mysqli_set_charset($link,'uft8');
    $disp="SELECT * FROM formula";
    $result=mysqli_query($link,$disp);
    if(!$result){
        echo 'SELECT文に失敗しました。';
    }

    //データの要素を獲得、最大index把握、
    while($row=mysqli_fetch_array($result)){
        $send_formula[$num++]=$row['formula'];
        $now_index=$row['index'];
    }

    //データの転送
    if($send_formula != null){
        foreach($send_formula as $value){
            echo $value."\n";
        }
    }

    //データの追加
    if($formula && !($formula=='=undefined')){
        $data="INSERT INTO formula (`index`,`formula`) VALUES ('$now_index'+1,'$formula')";
        $add=mysqli_query($link,$data);
        if(!$add){
            echo 'INSERTが失敗しました。';
            echo mysqli_error($link);
        }
    }

    //500件過ぎたらデータの削除
    if($now_index+1>500){
        $delete="DELETE FROM formula WHERE `index`=1";
        $delete_result=mysqli_query($link,$delete);

        //全データのインデックス-1
        $result2=mysqli_query($link,$disp);
        while($row2=mysqli_fetch_array($result2)){
            $replace_index=$row2['index'];
            $minus_index="UPDATE formula set `index`='$replace_index'-1 where `index`='$replace_index'";
            $replace=mysqli_query($link,$minus_index);
            if(!$replace){
                echo 'インデックス-1に失敗しました。';
            }
        }
    }

    //mysqlの接続解除
    $link=mysqli_close($link);
?>