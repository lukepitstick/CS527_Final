# Copy site over to hosting directory
$AdminSource = 'AdminLTE-master\*'
$AdminDest = 'C:\xampp\htdocs\AdminLTE-master\'
Copy-Item $AdminSource $AdminDest -force

# run tests
casperjs test AdminLTE-Test\testsuite.js --verbose  | Out-String -Stream