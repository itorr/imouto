<?php

header('Content-type: application/json;charset=utf-8');

print_r($sql->getData('SELECT * FROM imouto_stats LIMIT 0,100'));

exit();