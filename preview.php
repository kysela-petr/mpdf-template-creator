<?php
define('PAGES_DIR', __DIR__ . '/build/templates/');

$pages = ['page_01.html', 'page_02.html'];
$content = file_get_contents( PAGES_DIR . $pages[0]);
$content2 = file_get_contents( PAGES_DIR . $pages[1]);

echo '<style>
    body, html {
        background: #555;
    }
    body {
        padding: 29px;
    }
    .page_container {
        width: 794px;
        background: #fff;
        height: 1122px;
        margin: 30px auto;
        box-shadow: 0 0 20px rgba(0,0,0,1);
        position: relative;
    }
        </style>';
echo '<div class="page_container">';
echo $content;
echo '</div>';
echo '<div class="page_container">';
echo $content2;
echo '</div>';
