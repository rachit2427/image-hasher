<?php

function base_url ($append = '') {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ? 'https' : 'http';
    $base_url = "{$protocol}://{$_SERVER['SERVER_NAME']}:{$_SERVER['SERVER_PORT']}/";

    return rtrim($base_url, '/') . '/' . ltrim($append, '/');
}

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <title>Image Hasher by Rachit Dua</title>
        <meta name="description" content="Image Hasher created by Rachit Dua">

        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="<?= base_url('/static/img/favicons/favicon.ico') ?>">
        <link rel="icon" type="image/png" sizes="32x32" href="<?= base_url('/static/img/favicons/favicon-32x32.png') ?>">
        <link rel="icon" type="image/png" sizes="16x16" href="<?= base_url('/static/img/favicons/favicon-16x16.png') ?>">
        <link rel="apple-touch-icon" sizes="180x180" href="<?= base_url('/static/img/favicons/apple-touch-icon.png') ?>">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">

        <!-- CSS -->
        <link rel="stylesheet" type="text/css" href="<?= base_url('/static/css/main.css') ?>">

    </head>
    <body>
        <div id="react-root"></div>

        <!-- JS -->
        <script src="<?= base_url('/static/js/build/image-hasher.js') ?>" type="application/javascript"></script>
    </body>
</html>
