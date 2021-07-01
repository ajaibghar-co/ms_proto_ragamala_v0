// Classifier Variable
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/U7b1I0N-1/';

//details for hte classifier
let label = "";
let conf;
let confArr = [];
// let confArr2;
//make a variable for a changing div
let awrd;
//keywords for the different knots
let k1;
let k2;
let k3;
let k4;
let k5;

//basic requirements
let button; //accept button
let answerbtn;
let intro;
let constraints;
let machAns;
let machAns2;
let answerfinal;
let diff;
let bk;
let mlanswers;
let researchresponse
//video variable
let vid;

//dictionary for the qna
let dict;


function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  dict = loadJSON("dict.json")
}

function setup() {
  // createCanvas(200, 200);
  // background(200)
  noCanvas()
  constraints = {
    video: {
      facingMode: {
        exact: "environment"
      }
    },
    audio: false
  };

  textFont('Rajdhani')
  button = select(".btnclass")
  button.mousePressed(startStream)

  mlanswers = select("#mlanswers")
  mlanswers.hide()
  awrd = select("#awrd")

  answerbtn = select("#ansB")

  researchresponse = select("#researchresponse")
  researchresponse.hide()
  machAns = select("#rAns")
  bk = select("#back")
  bk.mousePressed(moveBG)

  k1 = "music"
  k2 = "inscriptions"
  k3 = "ragamala"
  k4 = "jharokha"

  a1 = dict.trigger.one.desc
  a2 = dict.trigger.two.desc
  a3 = dict.trigger.three.desc
  a4 = dict.trigger.four.desc
 
}
function startStream() {
  //check orientation rather than platform
  if (displayWidth < displayHeight) {
    vid = createCapture(VIDEO, constraints)
  } else {
    vid = createCapture(VIDEO);
  }
  vid.position(0, 0)

  button.remove()
  select("#accept").remove()
  classifyVideo()
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(vid, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  conf = results[0].confidence
  addFrm()
  // Classify again!
  classifyVideo();
}

function addFrm() {
  if (conf > 0.95 && machAns.elt.innerHTML == "") {
    console.log(label)
    mlanswers.show()
    mlanswers.style("display","flex")
    if (label == "Music") {
      cArr(k1, a1)
    }
    if (label == "Inscriptions") {
      cArr(k2, a2)
    }
    if (label == "Ragamala") {
      cArr(k3, a3)
    }
    if (label == "Jharokha") {
      cArr(k4, a4)
    }
  } 

}


function giveanswer() {
  mlanswers.hide()
  researchresponse.show()
  researchresponse.style("display","flex")
  machAns.html(answerfinal)

  //when you click generate answer, the generated answer will synthesis as audio

  confArr = []
  if (machAns2 != "") {
    bk.show()
  }
}

function cArr(k, i) {
  awrd.html(k);
  answerbtn.mousePressed(giveanswer)
  answerfinal = i

}

function moveBG() {
  //if you click back button the audio will stop
  machAns.elt.innerHTML = ""
  researchresponse.hide()
  mlanswers.show()
  mlanswers.style("display","flex")
  bk.hide()
}

