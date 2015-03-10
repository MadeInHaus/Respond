/*
 Respond.js unit tests - based on qUnit
*/

QUnit.config.reorder = false;

window.onload = function() {

	function getNormalizedUrl(filename) {
		var url = window.location.href;
		return url.substr(0, url.lastIndexOf('/') + 1) + (filename || '');
	}

	// ajax doesn’t finish if you queue them while respond is already ajaxing
	function queueRequest(callback) {
		var clearQueue = window.setInterval(function() {
			if (!respond.queue.length) {
				window.clearInterval( clearQueue );
				callback();
			}
		}, 50);
	}

	if (!window.opener) {

		document.documentElement.className = "launcher";
		document.getElementById("launcher").innerHTML = '<p>Tests must run in a popup window. <a href="#" id="suitelink">Open test suite</a></p>';
		document.getElementById("suitelink").onclick = function() {
			window.open(location.href + "?" + Math.random(), 'win', 'width=800,height=600,scrollbars=1,resizable=1');
			return false;
		};

	} else {

		var testElem = document.getElementById("testelem");
		function getWidth(){
			return testElem.offsetWidth;
		}
		function getHeight(){
			return testElem.offsetHeight;
		}
		// A short snippet for detecting versions of IE in JavaScript - author: @padolsey
		var ie = (function() {
			var undef,
				v = 3,
				div = document.createElement('div'),
				all = div.getElementsByTagName('i');
			while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);
			return v > 4 ? v : undef;		
		}());

		window.moveTo(0,0);
		
		/* TESTS HERE */ 
		asyncTest( 'styles within max-height media queries apply properly', function() { 
			window.resizeTo(500, 300);
			setTimeout(function() {
				strictEqual(getHeight(), 75, 'testelem is 75px tall when window is <= 300px tall');
				start();
			}, 900);
		});

		asyncTest( 'styles within min-height media queries apply properly', function() { 
			window.resizeTo(300, 400);
			setTimeout(function() {
				strictEqual(getHeight(), 220, 'testelem is 220px tall when window is >= 300px tall');
				start();
			}, 900);
		});

		asyncTest( 'styles within min-width AND min-height media queries apply properly', function() { 
			window.resizeTo(800, 800);
			setTimeout(function() {
				strictEqual(getHeight(), 270, 'testelem is 270px tall when window is >= 500px wide and >= 400px tall');
				start();
			}, 900);
		});

	}	
};
