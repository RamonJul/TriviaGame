

var start = false;
var question_list = {
    questions: ["Which two religous figures shared an animated show together?", "In 2017, The Dallas Moning News aplogized for misspelling what word in 1977"],
    choice_1: [["Jesus and The Pope", "wrong"], ["Banana", "wrong"]],
    choice_2: [["Buddha and Jesus", "correct"], ["Queen Elizabeth II", "wrong"]],
    choice_3: [["Muhammad and Abraham", "wrong"], ["Wookiee", "correct"]],
    choice_4: [["Dalai Lama and Ghandi", "wrong"], ["Voyager", "wrong"]],
    extra_trivia: ["The show was called Saint Young Men"," They spelled it wookie"]
}
console.log(question_list.choice_1[0][0])
console.log(question_list)
var done = [];
var length;
var times = 0;
var right = 0;
var wrong = 0;
var GameintervalId;
var choice1 = document.getElementById("choice_1")
var choice2 = document.getElementById("choice_2")
var choice3 = document.getElementById("choice_3")
var choice4 = document.getElementById("choice_4")
length = question_list.questions.length

for (var i = 0; i < length; i++) {
    done.push(1)
}

function button_state(state, op) {
    choice1.disabled = state
    choice2.disabled = state
    choice3.disabled = state
    choice4.disabled = state
    choice1.style.opacity = op
    choice2.style.opacity = op
    choice3.style.opacity = op
    choice4.style.opacity = op
}

function Question() {
    if (times === length) {
        endstate;
        done = []
        times = 0;
        endstate(document.getElementsByClassName("next")[0].children);
    }
    else {


        document.getElementById("instruction").textContent = ""
        document.getElementById("EndScreen").textContent = ""
        document.getElementById("answer").textContent = ""
        document.getElementById("corrects").textContent = ""
        document.getElementById("wrong").textContent = ""
        times++

        while (true) {
            var q = Math.floor(Math.random() * length)
            console.log(q)
            if (done[q] != 0) {
                console.log(done)
                done[q] = (0);
                break
            }
        }
        button_state(false, 1)
        document.getElementsByClassName("next")[0].children[1].textContent = question_list.questions[q]
        document.getElementsByClassName("next")[0].children[4].textContent = question_list.extra_trivia[q]
        document.getElementsByClassName("next")[0].children[4].style.opacity=0
        $("#carouselExampleControls").carousel("next");
        document.getElementById("slide-1").classList.toggle("next")
        document.getElementById("slide-2").classList.toggle("next")
        console.log(q)
        choice1.textContent = question_list.choice_1[q][0]
        choice1.setAttribute("id", question_list.choice_1[q][1])
        choice2.textContent = question_list.choice_2[q][0]
        choice2.setAttribute("id", question_list.choice_2[q][1])
        choice3.textContent = question_list.choice_3[q][0]
        choice3.setAttribute("id", question_list.choice_3[q][1])
        choice4.textContent = question_list.choice_4[q][0]
        choice4.setAttribute("id", question_list.choice_4[q][1])
        choice1.addEventListener("click", Answering)
        choice2.addEventListener("click", Answering)
        choice3.addEventListener("click", Answering)
        choice4.addEventListener("click", Answering)
        canvasclear();

        var number = 30;
        GameintervalId = setInterval(decrement, 1000)
        function decrement() {
            document.getElementById("timer").textContent = number
            circletimer(30, number)
            if (number <= 0) {
                document.getElementsByClassName("active")[0].children[1].textContent = ("Ran out of time")
                wrong++;
                Reveal()
                stop(GameintervalId);
            }
            else {
                console.log(number)
                number--;
            }
        }
    }
};

function Answering() {
    button_state(true, 1)
    console.log(this)
    console.log(this.getAttribute("id"))
    if (this.getAttribute("id") === "correct") {
        document.getElementsByClassName("active")[0].children[1].textContent = ("Correct")
        right++;
    }
    else {
        document.getElementsByClassName("active")[0].children[1].textContent = ("Incorrect")
        wrong++;

    }
    console.log(document.getElementById("Correct"))
    stop(GameintervalId);
    Reveal()
};

function circletimer(base, current) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");

    ctx.beginPath();

    ctx.lineWidth = 10;
    ctx.arc(150, 75, 50, 1.5 * Math.PI, (((base - current) * 2 / base) + 1.5) * Math.PI);
    ctx.strokeStyle = "yellow";
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1
    ctx.arc(150, 75, 45, 0, 2 * Math.PI);
    ctx.fillStyle = "transparent"
    ctx.fill();
    ctx.strokeStyle = "transparent";
    ctx.stroke();

}
function canvasclear() {
    document.getElementById("timer").textContent = ""
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
}
function stop(interval) {
    clearInterval(interval);
};

function Reveal() {
    canvasclear();
    document.getElementsByClassName("active")[0].children[2].textContent = ("The answer is " + document.getElementById("correct").textContent)
    document.getElementsByClassName("active")[0].children[4].style.opacity=1
    document.getElementById("correct").style.border = "3px solid gold"
    var number = 15;
    TransistionintervalId = setInterval(decrement, 1000)
    function decrement() {
        console.log(number)
        document.getElementById("timer").textContent = number
        circletimer(15, number)
        if (number <= 0) {
            stop(TransistionintervalId);
            button_state(false, 1)
            document.getElementById("correct").style.border = ""
            Question();
        }
        else {
            document.getElementById("timer").textContent = number
            number--;
        }
    }

}

function endstate() {
    canvasclear();
    document.getElementsByClassName("next")[0].children[0].textContent = ("Status")
    document.getElementsByClassName("next")[0].children[1].textContent = "Here's how well you did"
    document.getElementsByClassName("next")[0].children[2].textContent = "Come back again"
    document.getElementsByClassName("next")[0].children[4].textContent = ("Number of Correct Answers " + right)
    document.getElementsByClassName("next")[0].children[5].textContent = ("Number of Wrong Answers " + wrong)
    document.getElementsByClassName("next")[0].children[6].textContent = ("Press any key to play again")
    document.getElementById("slide-1").classList.toggle("next")
    document.getElementById("slide-2").classList.toggle("next")
    $("#carouselExampleControls").carousel("next");
    button_state(true, 0)
    start = false
}

document.onkeyup = function () {


    if (start === false) {
        start = true;
        Question();
    }
}
document.getElementById("slide-2").classList.toggle("next")
button_state(true, 0)


console.log(document.getElementsByClassName("next")[0].children)
// console.log(document.getElementsByClassName("next"))

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// ctx.beginPath();
// ctx.lineWidth=5;
// ctx.arc(150,75,50,0, 2*Math.PI);
// ctx.strokeStyle = "blue";
// ctx.stroke();



// ctx.beginPath();
// ctx.lineWidth=1;
// ctx.arc(150,75,40,0,2*Math.PI);
// ctx.fillStyle="purple"
// ctx.fill();
// ctx.strokeStyle = "purple";
// ctx.stroke();

