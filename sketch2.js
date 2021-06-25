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
  button = createButton("Accept")
  button.addClass("btnclass")
  button.mousePressed(startStream)

  awrd = createDiv("")
  awrd.addClass("awrd")

  machAns = createDiv("")
  machAns.addClass("rAns")

  machAns2 = createP("")
  machAns2.parent(machAns)
  machAns2.addClass("spanAns")


  bk = createButton("Back")
  bk.addClass("back")
  bk.hide()
  bk.mousePressed(moveBG)


  k1 = "music"
  rq = floor(random() * dict.knotalist[1].question.length)
  k2 = "inscriptions"
  k3 = "ragamala"
  k4 = "jharokha"

  answerbtn = createButton("Know more")

  answerbtn.hide()
  answerbtn.id("ansB")
}
//check orientation rather than platform
function startStream() {

  if (navigator.platform == "iPhone" || navigator.platform == "Linux armv8l") {
    vid = createCapture(VIDEO, constraints)
  } else {

    vid = createCapture(VIDEO);
  }

  vid.position(0, 0)
  button.remove()

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
  // Classify again!
  classifyVideo();
  answerbtn.show()
}

function draw() {

  addFrm()

}

function addFrm() {
  if (conf > 0.8) {
    if (label == "Music") {
      cArr(k1, 0)
    }
    if (label == "Inscriptions") {
      cArr(k2, 1)
    }
    if (label == "Ragamala") {
      cArr(k3, 2)
    }
    if (label == "Jharokha") {
      cArr(k4, 3)
    }
   

  }
}


function giveanswer() {
  answerbtn.hide()
  machAns.show()
  machAns2.html(answerfinal)

  //when you click generate answer, the generated answer will synthesis as audio

  confArr = []
  if (machAns2 != "") {
    bk.show()
  }
}

function cArr(k, i) {
  awrd.html(k);
  answerbtn.mousePressed(giveanswer)
  answerfinal = k

}

function moveBG() {
  //if you click back button the audio will stop

  machAns.hide()
  bk.hide()
}

