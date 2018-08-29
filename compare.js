//get distance for known pics
function getFaceImageUri(className, idx) {
  return `images/${className}/${className}${idx}.png`;
}

async function fetchImage(uri) {
  return (await fetch(uri)).blob();
}

const threshold = 0.6;
var descriptors = [];
var incoming;

async function getLibraryZ() {
  const img = await faceapi.bufferToImage(
    //await fetchImage(getFaceImageUri(className, i));  // this  6 then 2
    await fetchImage("images/amy/amy1.png")
  )
  descriptors.push(await net.computeFaceDescriptor(img));
}

async function getPicZ() {
  //get distance for pic taken
  const img = await faceapi.bufferToImage(
    //await fetchImage(#incoming file);  // incoming file add code here
    await fetchImage("images/amy/amy1.png")
  )
  incoming = await net.computeFaceDescriptor(img);
}
async function getLibrary() {
      //const imgBuf = await fetchImage(uri)  //commons line 11
      const imgBuf = await fetchImage("images/amy/amy1.png")
      const input = await faceapi.bufferToImage(imgBuf)
      const imgEl = $(`#face1`).get(0)
      imgEl.src = input.src
      descriptors[0] = await faceapi.computeFaceDescriptor(input)
}
async function getPic() {
      //const imgBuf = await fetchImage(uri)  //commons line 11
      const imgBuf = await fetchImage("images/amy/amy2.png")
      const input = await faceapi.bufferToImage(imgBuf)
      const imgEl = $(`#face2`).get(0)
      imgEl.src = input.src
      incoming = await faceapi.computeFaceDescriptor(input)
}
//compare
function updateResult() {
    const distance = faceapi.round(
      faceapi.euclideanDistance(incoming, descriptors[0])
    )
    let text = distance;
    let bgColor = '#ffffff';
    if (distance > threshold) {
      text += ' (no match)';
      bgColor = '#ce7575';
    }
    $('#distance').val(text);
    $('#distance').css('background-color', bgColor);
  }
async function run() {
  await  faceapi.loadFaceRecognitionModel()
  $('#loader').hide()
  await getLibrary()
  await getPic();
  updateResult()
}
