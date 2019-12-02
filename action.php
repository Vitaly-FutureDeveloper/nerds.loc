<?php

$range = $_POST['range'];
$grid = $_POST['grid'];
$features = $_POST['features'];


echo ("Вертушок, цена: " . $range . "<br>");
echo ("Выбраная сетка: " . $grid . "<br>");
echo ("Выбраные особенности: ");
    foreach ($features as $i){
        echo ($i . ", ");
    }


?>