//get distance for known pics
function getFaceImageUri(className, idx) {
  return `images/${className}/${className}${idx}.png`;
}

async function fetchImage(uri) {
  return (await fetch(uri)).blob();
}

const threshold = 0.6;
var files = ["images/chris.jpg", "images/pine.jpg", "images/pratt.jpg", "images/renner.jpg", "images/SOA.jpg", "images/ironman.jpg", "images/tatum.jpg", "images/butler.jpg"];
var pics = []
var incoming;

async function getLibrary() {
 
      for (var i = 0; i < files.length; i++) {
        const imgBuf = await fetchImage(files[i])  //commons line 11
        //const imgBuf = await fetchImage("images/chris.jpg")
        const input = await faceapi.bufferToImage(imgBuf)
        //const imgEl = $(`#face1`).get(0)
        //imgEl.src = input.src
        pics[i] = await faceapi.computeFaceDescriptor(input)
     }
}
async function getPic(file) {
      //const imgBuf = await fetchImage(file)  
      //const imgBuf = await fetchImage("rdtnew.jpg")
      //const input = await faceapi.bufferToImage(imgBuf)
      const input = await faceapi.bufferToImage(file)
      //const input = await file.blob()
      //const imgEl = $(`#face2`).get(0)
      //imgEl.src = input.src
      //incoming = await faceapi.computeFaceDescriptor(file)
      incoming = await faceapi.computeFaceDescriptor(input)
}

//compare
function updateResult() {
    var holder = 0;

    var distHold = faceapi.round(
        faceapi.euclideanDistance(incoming, pics[0])
    )

    for (var i = 0; i < files.length; i++) {

      const distance = faceapi.round(
        faceapi.euclideanDistance(incoming, pics[i])
      )
      if (distance < distHold){
       holder =  i;
       distHold = distance;
      }

    }

    let text = distHold;
    let bgColor = '#ffffff';
    if (distance > threshold) {
      text += ' (no match)';
      bgColor = '#ce7575';
    }
    //$('#face1').src = files[holder];
        const imgEl = $(`#face1`).get(0)
        imgEl.src = files[holder]
    $('#distance').val(text);
    $('#distance').css('background-color', bgColor);
  }
async function run() {
  var file = getFile();
  await  faceapi.loadFaceRecognitionModel()
  $('#loader').hide()
  await getLibrary()
  await getPic(file);
  updateResult()
}

function getFile() {
  var reader = new FileReader();
  var inp = document.getElementById("get-file");
  reader.onload = imageIsLoaded;
  // Access and handle the files 
  //document.getElementById("error").innerHTML = reader.readAsDataURL(inp.files[0]);
  reader.readAsDataURL(inp.files[0]);
  document.getElementById("error").innerHTML = inp.files[0];
  return inp.files[0];
  //return document.getElementById("face2").src;
  //for (i = 0; i < inp.files.length; i++) {
    //let file = inp.files[i];
    // do things with file
  //}
}
function imageIsLoaded(e) {
    $('#face2').attr('src', e.target.result);
};
