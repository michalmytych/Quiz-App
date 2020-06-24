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
let questions_data = [
    {
        "question": 'Który kod z podanych to poprawny program "Hello world!" w Pythonie?',
        "answ1": "print('Hello world!')",
        "answ2": "printline('HelloWorld');",
        "answ3": "printf('Hello world!');",
        "answ4": 'print(Hello world!)',
        "valid_answ": 1
    },
    {
        "question": "Jak można bardziej przejrzyście ująć liczbę 1000000000 w kodzie Pythona?",
        "answ1": "1.000.000.000",
        "answ2": "1_000_000_000",
        "answ3": "1,000,000,000",
        "answ4": "1/000/000/000",
        "valid_answ": 2
    },
    {
        "question": "Jakie typowanie zastosowano w Pythonie?",
        "answ1": "mocne",
        "answ2": "dynamiczne",
        "answ3": "miękkie ",
        "answ4": "szerokie",
        "valid_answ": 2
    },
    {
        "question": "Która metoda zwróci listę wyrazów z podanego łańcucha znaków (lancuch)?",
        "answ1": "lancuch.divbywhitespace()",
        "answ2": "lancuch / ' '",
        "answ3": "lancuch.share()",
        "answ4": "lancuch.split()",
        "valid_answ": 4
    },
    {
        "question": "Który z podanych typów jest niezmienny (immutable) w języku Python?",
        "answ1": "dict",
        "answ2": "list",
        "answ3": "tuple",
        "answ4": "bytearray",
        "valid_answ": 3
    },
    {
        "question": "Jaka jest funkcja dekoratorów w Pythonie?",
        "answ1": "Stwarzają skrót do dekorowanej funkcji",
        "answ2": "Ułatwiają znalezienie funkcji w kodzie",
        "answ3": "Opakowywują obiekt nadając mu nowe właściwości",
        "answ4": "Zmieniają nazwę funkcji",
        "valid_answ": 3
    },
    {
        "question": "Czym są funkcje lambda w Pythonie?",
        "answ1": "Są to funkcje przyjmujące tylko argumenty liczbowe",
        "answ2": "Inaczej są to funkcje anonimowe",
        "answ3": "Są to funkcje zwracające tylko wartości liczbowe",
        "answ4": "Funkcje lambda nie mogą zwracać argumentów",
        "valid_answ": 2
    },
    {
        "question": "Kiedy pojawiła się pierwsza wersja Pythona?",
        "answ1": "2002",
        "answ2": "1991",
        "answ3": "2000",
        "answ4": "1997",
        "valid_answ": 2
    },
    {
        "question": "Który z podanych nie jest frameworkiem dla Pythona?",
        "answ1": "Pyder",
        "answ2": "Pyramid",
        "answ3": "Django",
        "answ4": "Flask",
        "valid_answ": 1
    }
]


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
        scoreView.innerText = "Cóż, nie znasz się na Pythonie!"
    }
    scoreView.style.display = 'block';
    endContBlock.style.display = 'block';
    scoreNumberBlock.innerText = score + '/' + questions_data.length;

    return true;
};


function loadQuestion(question_no, questions_data, nickname) {
    if (question_no == questions_data.length) {
        saveTime = goToScore(score, nickname);                                   
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



function gitDemo(){
    console.log("Pokazuje kuzynowi jak dzaiala git");
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
        xhr.open("POST", "app.php", true);  
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
        console.log(pushDataToApp(saved_time, nickname, score));
    }
}, 1000);




