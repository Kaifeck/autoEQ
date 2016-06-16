/**
 * Created by ryan on 6/15/16.
 */
var sixtyBand
var oneSeventyBand;
var threeTenBand;
var fourFiftyBand;
var sixHundredBand;
var oneKayBand;
var twoKayBand;
var fourKayBand;
var sixKayBand;
var tenKayBand;
var mGain;
$(document).ready(function() {
    //create analyser to see the things we are changing
    context = new AudioContext();
    /*var sourceNode = context.createOscillator();
     sourceNode.type = 'sine';
     sourceNode.value = 310.0;
     sourceNode.start(context.currentTime);*/

    var mediaElement = document.getElementById('player');
    var sourceNode = context.createMediaElementSource(mediaElement);
    // EQ Properties
    //
    var shelfGainDb = -40.0;
    var peakingGainDb = 0.0;
    var globalQ = 4;
    var frequencies = [60.0, 170.0, 310.0, 450.0, 600.0, 1000.0, 2000.0, 4000.0, 6000.0, 10000.0];

    function bandGenerator(frequency, type) {
        var returnBand = context.createBiquadFilter();
        returnBand.type = type;
        returnBand.frequency.value = frequency;
        returnBand.gain.value = shelfGainDb;
        return returnBand;
    }

    function peakingGenerator(frequency, type, qFactor) {
        var returnPeaking = context.createBiquadFilter();
        returnPeaking.type = type;
        returnPeaking.frequency.value = frequency;
        returnPeaking.gain.value = peakingGainDb;
        returnPeaking.Q.value = qFactor;
        return returnPeaking;
    }

    //shelf filters that need seperate gain nodes
    //hBand = bandGenerator(frequencies[0], 'lowshelf');
    //lBand = bandGenerator(frequencies[9], 'highshelf');

    //peaking filters
    sixtyBand = peakingGenerator(frequencies[1], 'peaking', globalQ);
    oneSeventyBand = peakingGenerator(frequencies[1], 'peaking', globalQ);
    threeTenBand = peakingGenerator(frequencies[2], 'peaking', globalQ);
    fourFiftyBand = peakingGenerator(frequencies[3], 'peaking', globalQ);
    sixHundredBand = peakingGenerator(frequencies[4], 'peaking', globalQ);
    oneKayBand = peakingGenerator(frequencies[5], 'peaking', globalQ);
    twoKayBand = peakingGenerator(frequencies[6], 'peaking', globalQ);
    fourKayBand = peakingGenerator(frequencies[7], 'peaking', globalQ);
    sixKayBand = peakingGenerator(frequencies[8], 'peaking', globalQ);
    tenKayBand = peakingGenerator(frequencies[9], 'peaking', globalQ);

    //shelf Connections
    //sourceNode.connect(lBand);
    //sourceNode.connect(hBand);
    //Peaking filters are chained serially
    sourceNode.connect(sixtyBand);
    sixtyBand.connect(oneSeventyBand);
    oneSeventyBand.connect(threeTenBand);
    threeTenBand.connect(fourFiftyBand);
    fourFiftyBand.connect(sixHundredBand);
    sixHundredBand.connect(oneKayBand);
    oneKayBand.connect(twoKayBand);
    twoKayBand.connect(fourKayBand);
    fourKayBand.connect(sixKayBand);
    sixKayBand.connect(tenKayBand);
    //Gain nodes
    mGain = context.createGain();
    //Connect shelf bans to gain nodes
    tenKayBand.connect(mGain);

    //VISUAL START
    var analyser = context.createAnalyser();
    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);
    var dataArray = new Uint8Array(bufferLength);

    var canvas = document.querySelector('canvas');
    var canvasCtx = canvas.getContext('2d');
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);


    function draw(){
        var drawVisual = requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        canvasCtx.fillStyle = 'rgb(0, 0, 0)';
        canvasCtx.fillRect(0,0, WIDTH, HEIGHT);
        var barWidth = (WIDTH/ bufferLength) * 2.5;
        var barHeight;
        var x = 0;
        for(var i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i]/2;

            canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

            x += barWidth + 1;
        }
    }
    //VISUAL END
    //connect all to source
    var sum = context.createGain();
    //lGain.connect(sum);
    //hGain.connect(sum);
    mGain.connect(sum);
    sum.connect(analyser);
    sum.connect(context.destination);
    draw();
});
// Input
//
function changeGain(string,type)
{
    var value = parseFloat(string) / 40.0;

    switch(type)
    {
        case 'sixty': sixtyBand.gain.value = value; break;
        case 'oneSeventy': oneSeventyBand.gain.value = value; break;
        case 'threeTen': threeTenBand.gain.value = value; break;
        case 'fourFifty': fourFiftyBand.gain.value = value; break;
        case 'sixHundred': sixHundredBand.gain.value = value; break;
        case 'oneKay': oneKayBand.gain.value = value; break;
        case 'twoKay': twoKayBand.gain.value = value; break;
        case 'fourKay': fourKayBand.gain.value = value; break;
        case 'sixKay': sixKayBand.gain.value = value; break;
        case 'tenKay': tenKayBand.gain.value = value; break;
    }
}
