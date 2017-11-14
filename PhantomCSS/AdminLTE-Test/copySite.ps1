# Copy site over to hosting directory
$AdminSource = 'AdminLTE-master\*'
$AdminDest = 'C:\xampp\htdocs\AdminLTE-master\'
Copy-Item $AdminSource $AdminDest -force
