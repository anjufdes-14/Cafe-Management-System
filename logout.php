<?php
session_start();
session_destroy();
header("Location: start.html");
exit;
?>
