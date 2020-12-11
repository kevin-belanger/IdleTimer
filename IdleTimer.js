  
/*
 * IdleTimer by Kevin Bélanger
 * https://github.com/kevin-belanger/IdleTimer
 * 
 * Trigger a callback (like redirection) when users are inactive.
 * 
 * Usage example: redirect to logout.php after 1 minutes of inactivity.
 * idleTimer(60000, 'logout.php'); 
 */
function idleTimer(callbackDelay, callbackURL, options) {
	
	options = options || {};
	
	//Delay that the user have to be inactive to fire the callback. (default 1 min)
	var callbackDelay = callbackDelay || 60000;
	
	//The default callback redirects users to this URL
	callbackURL = callbackURL || 'https://github.com/';
	
	//Default callback (can be override though "options" param)
	options.callback = options.callback || function(){
		document.location.href = callbackURL;
	};
	
	//Array of events that cause timer to be reset to 0. The will be place on "document" elements
	options.eventsType = options.eventsType || ['mousemove', 'click', 'auxclick', 'mousedown'];
	
	//Delay of the interval. By default, the script will check every 1 second if the idle time reachs the callback delay.
	options.intervalDelay = options.intervalDelay || 1000;
	
	//Var used to store timestamp of last user activity.
	var startTimestamp = +new Date;
	
	//Function that resets the idle time
	var resetIdleTime = function(){
		startTimestamp = +new Date;
	}
	
	//Function that adds listners for all specified events to reset idleTime when users is active on the page
	var setEvents = function(){
		
		options.eventsType.forEach(function(type){
			//console.log("Bind " + type + "listner");
			document.addEventListener(type,resetIdleTime, true);
		});
	}
	
	// in case the document is already rendered
	if (document.readyState!='loading') setEvents();
	// otherwise, wait for document to be ready
	else document.addEventListener('DOMContentLoaded', setEvents);
	
	//Set interval to check if the callbackDelay is reach. If so, callback is fire.
	window.setInterval(function(){
	
		if (+new Date - startTimestamp >= callbackDelay){
			options.callback();
			resetIdleTime();
		}
		
	},options.intervalDelay);	
}
