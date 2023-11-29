// JavaScript code goes here
// ...

// Preprocess the text: tokenize and convert to lowercase
function preprocessText(rawText) {
  let tokens = [];
  let token = "";

  for (let i = 0; i < rawText.length; i++) {
    let c = rawText[i];
    
    if (/[a-zA-Z0-9]/.test(c) || /[\u4e00-\u9fa5]/.test(c)) {
      // 如果是英文字母、数字或者中文字符
      if (/[A-Z]/.test(c)) {
        token += c.toLowerCase(); // 将大写字母转为小写
      } else {
        token += c;
      }
    } else if (token !== "") {
      tokens.push(token);
      token = "";
    }
  }

  if (token !== "") {
    tokens.push(token);
  }

  return tokens;
} 

// Create windows from the processed text
function createWindows(processedText, windowSize) {
let windows = [];
for (let i = 0; i <= processedText.length - windowSize; i++) {
    let window = "";
    for (let j = i; j < i + windowSize; j++) {
        window += processedText[j];
        // Only add a space if it's not the last word in the window
        if (j < i + windowSize - 1) {
            window += " ";
        }
    }
    windows.push(window);
}
return windows;
}

function generateHash(input) {
  let hash = 0;
  if (input.length === 0) {
      return hash;
  }
  for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = 13 * (hash << 5) - hash + char;
      hash &= hash;
  }
  return hash;
}

// Hash the windows using a simple hash function (you should replace this with a better hash function)
function hashWindows(windows) {
let hashes = [];
for (let i = 0; i < windows.length; i++) {
    let hash = generateHash(windows[i]);
    hashes.push(hash);
}
return hashes;
}


// Get the fingerprints from the hashes
function getFingerprints(hashes) {
let fingerprints = new Set();
for (let i = 0; i < hashes.length; i++) {
fingerprints.add(hashes[i]);
}
return fingerprints;
}

let percentage = 0;
const sensitivitySelect = document.getElementById('sensitivity');
let sensitivity = 4;
sensitivitySelect.addEventListener('change', function () {
  const selectedValue = sensitivitySelect.value;
  sensitivity = parseInt(selectedValue);
});

// Detect plagiarism by comparing the fingerprints
function detectPlagiarism(fingerprints1, fingerprints2) {
let intersection = new Set([...fingerprints1].filter(x => fingerprints2.has(x)));
let intersectionSize = intersection.size;
let union = new Set([...fingerprints1, ...fingerprints2]);
let unionSize = union.size;
let similarity = intersectionSize / unionSize;
percentage = similarity * 100;
return percentage > sensitivity;
}


function runPlagiarismDetection() {
// Get the input text from the textboxes
let text1 = document.getElementById("text1").value;
let text2 = document.getElementById("text2").value;
//document.getElementById("size1").innerText = text1.length;
//document.getElementById("size2").innerText = text2.length;

// Preprocess the texts
let processedText1 = preprocessText(text1);
let processedText2 = preprocessText(text2);

let windowSize = text1.length < text2.length ? Math.floor(text1.length / 10) : Math.floor(text2.length / 10);
if (windowSize < 1) {
  windowSize = 1;
}
if (windowSize > 100) {
  windowSize = 100;
}

document.getElementById("windowsize").innerText = windowSize;

// Create windows
let windows1 = createWindows(processedText1, windowSize);
let windows2 = createWindows(processedText2, windowSize);

// Hash the windows
let hashes1 = hashWindows(windows1);
let hashes2 = hashWindows(windows2);

// Get the fingerprints
let fingerprints1 = getFingerprints(hashes1);
let fingerprints2 = getFingerprints(hashes2);

// Detect plagiarism
let isPlagiarized = detectPlagiarism(fingerprints1, fingerprints2);
document.getElementById("fg").innerText = Math.floor(percentage) + "%";

// Display the result
document.getElementById("result").innerText = isPlagiarized ? "Yes" : "No";
}