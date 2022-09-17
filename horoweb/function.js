//Arrays of All tarot and name of months
const tarot = ['The Fool', 'The Magician', 'The High Priestess', 'The Empress', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'The Strength', 'The Hermit', 'Wheel of Fortune', 'The Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil','The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World'];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let type;
let card;
let topic;

//get type and topics of fortune telling and pick one card randomly from tarot array
function topiccard(topics){
    type = "topics";
    topic = topics;
    card = tarot[Math.floor(Math.random()*tarot.length)];
    console.log(type, topic, card);
    return type, topic, card;
}


//calculate personal card from birthday we will get type of fortune telling and personal card
function personalcard() {
    type = "person";
    let birthday = document.getElementById("BirthDay").value;
    let day = birthday.slice(8,10); //get day number
    let month = + birthday.slice(5,7); //get month number
    let month_name = months[month-1]; //get month
    let year = birthday.slice(0,4); //get year number
    let eachnum = birthday.split(""); //get each character in string
    let cardnum = Math.abs(parseInt(eachnum[0]) + parseInt(eachnum[1]) + parseInt(eachnum[2]) + parseInt(eachnum[3]) + parseInt(eachnum[5]) + parseInt(eachnum[6]) + parseInt(eachnum[8]) + parseInt(eachnum[9]) - 22); //calculate card number of personal card
    let text = 'This is your personal card from your birthday.<br>' + month_name + ' ' + day + ', ' + year;
    card = tarot[cardnum];
    document.getElementById("yourbirthday").innerHTML = text + "<br><br>Your personal card is " + card;
    console.log(type, card);
    return type, card;
}

//fetch data from json file to display on website
function displaycard() {
    fetch('./result.json')
        .then(response =>response.json())
        .then(data => appendData(data))
        .catch(err => { console.log('error: ' + err)})
}

//add data to website
function appendData(data) {
    if (type == "person") {
        card_img = document.getElementById("image")
        image = "tarot/" + card + ".jpg";
        console.log(image);
        card_img.src = image;
        document.getElementById("Character").innerHTML = "ลักษณะนิสัย: " + data[type][card]["Character"];
        document.getElementById("Career").innerHTML = "อาชีพที่เหมาะสมกับคุณ: " + data[type][card]["Career"];
        document.getElementById("Place").innerHTML = "สถานที่ที่เหมาะสมกับคุณ: " + data[type][card]["Place"];
        document.getElementById("Tips").innerHTML = "เคล็ดลับเสริมดวง: " + data["Tips"][card];
    }
    else {
        card_img = document.getElementById("image")
        image = "tarot/" + card + ".jpg";
        console.log(image);
        card_img.src = image;
        document.getElementById("result").innerHTML = data[type][card][topic];
        document.getElementById("Tips").innerHTML = "เคล็ดลับเสริมดวง: " + data["Tips"][card]
    }
}