<?php
define('PAGES_DIR', __DIR__ . '/build/templates/');
define('_MPDF_TEMP_PATH', __DIR__ . '/temp');
define("_MPDF_TTFONTDATAPATH", __DIR__.'/temp/fonts');

require_once __DIR__ . '/vendor/autoload.php';

$pages = ['page_01.html', 'page_02.html'];
$content = file_get_contents( PAGES_DIR . $pages[0]);
$content2 = file_get_contents( PAGES_DIR . $pages[1]);

$mpdf = new mPDF('utf-8', 'A4', '', '', 16,15,16,15,9,9, 'P');


$mpdf->WriteHTML($content);
$mpdf->AddPage();
$mpdf->WriteHTML($content2);
$mpdf->Output();
