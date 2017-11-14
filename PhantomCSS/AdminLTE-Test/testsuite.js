/*
	Require and initialise PhantomCSS module
	Paths are relative to CasperJs directory
*/
console.log('Starting test suite...');
var fs = require( 'fs' );
var path = fs.absolute( fs.workingDirectory + '/phantomcss.js' );
var phantomcss = require( path );
var server = require('webserver').create();

// var html = fs.read( fs.absolute( fs.workingDirectory + '/AdminLTE-master/index.html' ));

console.log('vars set');


console.log('Beginning tests');
casper.test.begin( 'AdminLTE visual tests', function ( test ) {

	phantomcss.init( {
		rebase: casper.cli.get( "rebase" ),
		// SlimerJS needs explicit knowledge of this Casper, and lots of absolute paths
		casper: casper,
		libraryRoot: fs.absolute( fs.workingDirectory + '' ),
		screenshotRoot: fs.absolute( fs.workingDirectory + '/AdminLTE-Test/screenshots' ),
		failedComparisonsRoot: fs.absolute( fs.workingDirectory + '/AdminLTE-Test/failures' ),
		addLabelToFailedImage: false,
	} );
    
    console.log('phantom initialized');
	casper.on( 'remote.message', function ( msg ) {
		this.echo( msg );
	} );

	casper.on( 'error', function ( err ) {
		this.die( "PhantomJS has errored: " + err );
	} );

	casper.on( 'resource.error', function ( err ) {
		casper.log( 'Resource load error: ' + err, 'warning' );
	} );
	/*
		The test scenario
	*/
    console.log('starting casper');
	casper.start( 'http://localhost:8080' );

	casper.viewport( 1024, 768 );

    console.log('Taking Screenshots...');
	casper.then( function () {
		phantomcss.screenshot( '*', 'full_screen' );
	} );

    casper.then( function () {
        casper.click( 'a[href="#sales-chart"]' );
		phantomcss.screenshot( '.nav-tabs-custom', 'Donut' );
	} );
    
    casper.then( function () {
        casper.click( '.dropdown.messages-menu  .dropdown-toggle' );
		phantomcss.screenshot( '.dropdown.messages-menu .dropdown-menu', 'dropdown_messages_menu' );
	} );
    
    casper.then( function () {
        casper.click( '.sidebar-menu.tree .active.treeview.menu-open a' );
        casper.waitForSelector( '.active.treeview .treeview-menu[style="display: none;"]',
			function success() {
				phantomcss.screenshot( '.sidebar-menu.tree', 'retract_dashboard'  );
			},
			function timeout() {
				casper.test.fail( 'Dashboard should retract' );
			}
		);
		//phantomcss.screenshot( '.sidebar-menu.tree', 'retract_dashboard' );
	} );
    
    console.log('compare screenshots');
	casper.then( function now_check_the_screenshots() {
		// compare screenshots
		phantomcss.compareAll();
	} );
    
    
	/*
	Casper runs tests
	*/
    console.log('run all tests');
	casper.run( function () {
		console.log( '\nTHE END.' );
		// phantomcss.getExitStatus() // pass or fail?
		casper.test.done();
	} );
} );
