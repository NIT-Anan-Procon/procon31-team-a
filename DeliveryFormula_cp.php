<?php
    //変数定義
    $formula=$_POST['formula'];
    $now_index=0;

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

    //データの表示(把握)
    while($row=mysqli_fetch_array($result)){
        echo 'index='.$row['index'];
        echo ' , ';
        echo 'formula='.$row['formula'];
        echo '<br>';
        $now_index=$row['index'];
    }

    //500件過ぎたらデータの削除
    if($now_index>=500){
        $delete="DELETE FROM formula WHERE index=1";
        $delete_result=mysqli_query($link,$delete);
        echo 'データを削除しました。';

        //全データのインデックス-1
        while($row=mysqli_fetch_array($result)){
            $replace=$row['index'];
            $minus_index="REPLACE INTO formula (index,formula) VALUES ($replace-1,$formula)";
        }
    }

    //データの追加
    if($formula){
        $data="INSERT INTO formula (index,formula) VALUES ($now_index+1,$formula)";
        $add=mysqli_query($link,$data);
        if($add){
            echo 'INSERTが失敗しました。';
        }
    }

    //mysqlの接続解除
    $link=mysqli_close($link);
?>