
function changeLanguage(select) {
let selectedOption = select.options[select.selectedIndex].value;
window.location.href = selectedOption;
}

function addDarkmodeWidget() {
    const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: true, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
    }
    
    const darkmode = new Darkmode(options);
    darkmode.showWidget();
}
window.addEventListener('load', addDarkmodeWidget);

function printPage() {
    window.print();
  }

function inputDemoText() {
    // write a list of random texts
    const demoTexts = [
        "This is a simple Text Similarity Detector that based on the WINNOWING Algorithm. The detection gets results by comparing the fingerprints of the text using javascript on the front-end, so website does not store any records or data. Feel free to play with it!",
        "This text similarity detector uses the WINNOWING algorithm. It compares text fingerprints using JavaScript on the front end, so the website doesn't store any records or data. Play with it!",
        "Hi, I am Haozhe Li. I am a computer science and music student at the University of Illinois with a strong academic record. I have extensive programming experience in C++, Java, and Python, and a solid foundation in video and music production.",
        "Hi, I'm Haozhe Li. I am a computer science and music student at the University of Illinois. I know a lot about programming in C++, Java, and Python, and I can also make videos and music. ",
        "Contact Flask is a simple email server built with Flask and Flask-Mail. It works fast and seamlessly with your contact form on your static website. Also, it contains validation on submission which filters out the suspicious injection.",
        "Contact Flask is an email server that has been constructed using Flask and Flask-Mail. It functions at a high speed and seamlessly integrates with your contact form on your static website. Furthermore, it incorporates a validation process that filters out any suspicious injections."]
    // get two random number
    const randomText1 = Math.floor(Math.random() * demoTexts.length)
    const randomText2 = Math.floor(Math.random() * demoTexts.length)
    document.getElementById("text1").value = demoTexts[randomText1]
    document.getElementById("text2").value = demoTexts[randomText2]
}