/**
 * author: Ekal.Golas
 */

// Get the element with textarea
var x = document.getElementById("Message");

// Set send button as disabled
document.getElementById('Submit').disabled = true;

// Set information from HTML5 storage API
if (localStorage.clickcount)
	document.getElementById("result").innerHTML = "You have contacted me "
			+ localStorage.clickcount + " time(s).";
else
	document.getElementById("result").innerHTML = "You have contacted me 0 times.";

// Function to send a mail
function sendMail() {
	// Initialize variable for mail body
	var body = "Source = ";
	
	// Get selected value of radio button
	var radios = document.getElementsByName('Source');
	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			body = body + radios[i].value + " %0A";

			// only one radio can be logically checked, don't check the rest
			break;
		}
	}

	// Get input values and add them to mail body
	body = body + "Name = " + document.getElementById('name').value + " %0A";
	body = body + "Age = " + document.getElementById('age').value + " %0A";
	body = body + "Birthday = " + document.getElementById('bday').value + " %0A";

	// Get checkbox value if selected
	var check = document.getElementsByName('Contact');
	for (var i = 0, length = check.length; i < length; i++) {
		if (check[i].checked) {
			body = body + "I wish to be contacted %0A";

			// only one radio can be logically checked, don't check the rest
			break;
		}
	}

	// Get rating and textarea content and add them all to body
	body = body + "Rating = " + document.getElementById('rating').value + " %0A";
	body = body + document.getElementById('Message').value;

	// Compose link to send mail and open that link
	var link = 'mailto:exg140230@utdallas.edu?subject=Contact from website '
			+ '&body=' + body;
	window.location.href = link;
	
	// Increment the click counter
	clickCounter();
}

// HTML5 geo location API functions
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		x.value = x.value + "\nGeolocation is not supported by sender.";
	}
}

function showPosition(position) {
	x.value = x.value + "\nLatitude: " + position.coords.latitude
			+ "\n Longitude: " + position.coords.longitude;
}

// HTML5 drag and drop API functions
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	document.getElementById('Submit').disabled = false;
}

// HTML5 local storage API function
function clickCounter() {
	if (typeof (Storage) !== "undefined") {
		if (localStorage.clickcount) {
			localStorage.clickcount = Number(localStorage.clickcount) + 1;
		} else {
			localStorage.clickcount = 1;
		}
		document.getElementById("result").innerHTML = "You have contacted me "
				+ localStorage.clickcount + " time(s).";
	} else {
		document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
	}
}

jQuery(document).ready(function($) {
	// open-close submenu on mobile
	$('.Header #menu').on('click', function(event) {
		if ($(event.target).is('.Header #menu'))
			$(this).children('ul').toggleClass('is-visible');
	});
});