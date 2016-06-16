/**
 * Created by ryan on 6/15/16.
 */

// Create the audio context
var audioContext = new AudioContext();
var context = new AudioContext(),
    oscillator = context.createOscillator();

/* Connect the oscillator to our speakers
 oscillator.connect(context.destination);
 // Start the oscillator now
 oscillator.start(context.currentTime);
 // Stop the oscillator 3 seconds from now
 oscillator.stop(context.currentTime + 3);*/

var request = new XMLHttpRequest();
request.open('GET', 'assets/audio/schoenertag.mp3', true);
request.responseType = 'arraybuffer';
request.onload = function () {
    var undecodedAudio = request.response;

    context.decodeAudioData(undecodedAudio, function (buffer) {
        // Create the AudioBufferSourceNode
        var sourceBuffer = context.createBufferSource();

        // Tell the AudioBufferSourceNode to use this AudioBuffer.
        sourceBuffer.buffer = buffer;

        sourceBuffer.connect(context.destination);
        sourceBuffer.start(context.currentTime);
        sourceBuffer.stop(context.currentTime + 5);
    });
};
request.send();

