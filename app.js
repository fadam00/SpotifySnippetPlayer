$(document).ready(function () {
	$('.js-form').on('submit', trackInput);
	$('.js-audio-player').on('timeupdate', printTime);
});

function trackInput (theInput) {

	theInput.preventDefault();
	console.log(theInput);
	$('.js-song-search').empty();
	
	// take track search input, split on spaces and replace with +'s
	var searchInput = $('.js-song-search').val();
	var finalSearch = searchInput.split(" ").join("+");

	// query API with track input
	$.ajax({
		type: "GET",
		url: `https://api.spotify.com/v1/search?type=track&query=${finalSearch}`,
		success: trackSearch,
		error: errorHandler
	})
}

function trackSearch (theTrack) {
	// console.log(theTrack);
	// console.log("attempting to search...")

	var trackId = theTrack.tracks.items[0].id;
	var trackName = theTrack.tracks.items[0].name;
	var trackArtist = theTrack.tracks.items[0].artists[0].name;
	var trackAlbumUrl = theTrack.tracks.items[0].album.images[0].url;
	var trackPlayUrl = theTrack.tracks.items[0].preview_url;

	// console.log(trackArtist);
	// console.log(trackName);
	// console.log(trackAlbumUrl);
	// console.log(trackId);

	$('.js-title').html(trackName);
	$('.js-author').html(trackArtist);
	$('.js-album-image').attr("src", trackAlbumUrl);
	$('.js-audio-player').attr("src", trackPlayUrl);

	$('.btn-play').on('click', playSong);
}

function playSong () {
	// toggle disabled and playing to show pause bars on click
	$('.btn-play').toggleClass('disabled');
	$('.btn-play').toggleClass('playing');
	
	if ($('.btn-play').hasClass('playing')) {
		// actually play the song
		$('.js-audio-player').trigger('play');
	} else {
	// if playing already, then pause
	$('.js-audio-player').trigger('pause');
	}
}

function errorHandler (theError) {
	console.log("failure.")
}

// Define a function to print the player's current time
function printTime () {
  var current = $('.js-audio-player').prop('currentTime');
  console.debug('Current time: ' + current);
  // replaces static progress value with actual time passed
  $('.progress').attr("value", current);
}
// Have printTime be called when the time is updated