/**
 * author: Ekal.Golas
 */

var x = document.getElementById("Message");
document.getElementById('Submit').disabled = true;

if (localStorage.clickcount)
	document.getElementById("result").innerHTML = "You have contacted me "
			+ localStorage.clickcount + " time(s).";
else
	document.getElementById("result").innerHTML = "You have contacted me 0 times.";

function sendMail() {
	var body = "Source = ";
	var radios = document.getElementsByName('Source');

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			body = body + radios[i].value + " %0A";

			// only one radio can be logically checked, don't check the rest
			break;
		}
	}

	body = body + "Name = " + document.getElementById('name').value + " %0A";
	body = body + "Age = " + document.getElementById('age').value + " %0A";
	body = body + "Birthday = " + document.getElementById('bday').value + " %0A";

	var check = document.getElementsByName('Contact');

	for (var i = 0, length = check.length; i < length; i++) {
		if (check[i].checked) {
			body = body + "I wish to be contacted %0A";

			// only one radio can be logically checked, don't check the rest
			break;
		}
	}

	body = body + "Rating = " + document.getElementById('rating').value + " %0A";
	body = body + document.getElementById('Message').value;

	var link = 'mailto:exg140230@utdallas.edu?subject=Contact from website '
			+ '&body=' + body;
	window.location.href = link;
	
	clickCounter();
}

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