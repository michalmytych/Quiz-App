let score = 0;
let question_no = 0;



let new_question = document.getElementById('question_block');
let scoreView = document.getElementById('score_viewing');
let scoreNumberBlock = document.getElementById('score_amount_view');
let endContBlock = document.getElementById('end_container');
let answer1 = document.getElementById('answ1');
let answer2 = document.getElementById('answ2');
let answer3 = document.getElementById('answ3');
let answer4 = document.getElementById('answ4');
let answers_section_block = document.getElementById('answers_section');
let game_starter_box = document.getElementById('gamestarter_box');
let nickname_input = document.getElementById('nickname_input');
let nickname_submit = document.getElementById('submit');
var sec = 0;
let saveTime = false;
let saved_time = [];
let nickname = "";


// work in progress here
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        ///anHttpRequest.send(  );
    }
}


function readNick() {
    var nickname = document.getElementById("nickname_input").value;
    if (nickname != "" && !(/ /.test(nickname))) {
        answer1.style.display = 'block';
        answer2.style.display = 'block';
        answer3.style.display = 'block';
        answer4.style.display = 'block';
        new_question.style.display = 'block';
        answers_section_block.style.display = 'block';
        game_starter_box.style.display = 'none';
        nickname_input.style.display = 'none';
        nickname_submit.style.display = 'none';
        console.log("Zmienna nickname: " + nickname);
        document.getElementById("minutes").style.display = "inline-block";
        document.getElementById("seconds").style.display = "inline-block";
    }
    else {
        alert("Niepoprawny nick! Podaj inny.");
    }
    return nickname;
}


function goToScore(score, nickname) {
    answer1.style.display = 'none';
    answer2.style.display = 'none';
    answer3.style.display = 'none';
    answer4.style.display = 'none';
    new_question.style.display = 'none';
    answers_section_block.style.display = 'none';
    if (score > (questions_data.length / 2)) {
        scoreView.innerText = "Brawo " + nickname + ", osiągnąłeś ponad połowę punktów!";
    }
    else {
        scoreView.innerText = "Cóż, nie znasz się na mrówkach!"
    }
    scoreView.style.display = 'block';
    endContBlock.style.display = 'block';
    scoreNumberBlock.innerText = score + '/' + questions_data.length;

    return true;
};


function loadQuestion(question_no, questions_data, nickname) {
    if (question_no == questions_data.length) {
        saveTime = goToScore(score, nickname);                                       // przejdz do strony z wynikiem
        return saveTime;
    }
    else {
        new_question.innerText = questions_data[question_no].question;
        answer1.innerText = questions_data[question_no].answ1;
        answer2.innerText = questions_data[question_no].answ2;
        answer3.innerText = questions_data[question_no].answ3;
        answer4.innerText = questions_data[question_no].answ4;
        return false;
    }
}


function checkChoice(question_no, choice) {
    if (choice == questions_data[question_no].valid_answ) {
        score++;
    }

    return score;
}


function pushDataToApp(saved_time, nickname, score) {
    if (saved_time != []) {
        var ended_quiz_data = {
            "nickname": nickname,
            "score": score,
            "duration_m": saved_time[0],
            "duration_s": saved_time[1]
        }
        newJSON = JSON.stringify(ended_quiz_data);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "app.php", false);
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

        xhr.send(newJSON);

        return xhr.responseText;
    };
}



window.onload = function () {
    question_no = 0;
    score = 0;
    saveTime = loadQuestion(question_no, questions_data);
};

nickname_submit.onclick = function () {
    nickname = readNick();
}
answer1.onclick = function () {
    checkChoice(question_no, 1);
    question_no++;
    saveTime = loadQuestion(question_no, questions_data, nickname);
};
answer2.onclick = function () {
    checkChoice(question_no, 2);
    question_no++;
    saveTime = loadQuestion(question_no, questions_data, nickname);
};
answer3.onclick = function () {
    checkChoice(question_no, 3);
    question_no++;
    saveTime = loadQuestion(question_no, questions_data, nickname);
};
answer4.onclick = function () {
    checkChoice(question_no, 4);
    question_no++;
    saveTime = loadQuestion(question_no, questions_data, nickname);
}


function pad(val) { return val > 9 ? val : "0" + val; }
setInterval(function () {
    if (document.getElementById("minutes").style.display != "inline-block") sec = -1;
    document.getElementById("seconds").innerHTML = ":" + pad(++sec % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(sec / 60, 10));
    if (saveTime) {
        var saved_time = [parseInt((sec - 1) / 60, 10), (sec - 1) % 60];
        document.getElementById("minutes").style.display = "none";
        document.getElementById("seconds").style.display = "none";
        document.getElementById("duration_viewing").innerText = pad(parseInt((sec - 1) / 60, 10) + ":" + pad((sec - 1) % 60));
        document.getElementById("duration_viewing").style.display = "block";
        saveTime = false;
        pushDataToApp(saved_time, nickname, score);
    }
}, 1000);




