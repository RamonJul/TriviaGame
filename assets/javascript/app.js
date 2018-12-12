

var start = false;
var question_list = ["What is 1+1?", "What is 2+2"]
var done = [];
var length;
var times = 0;
var right = 0;
var wrong = 0;
var GameintervalId;
var answer = document.getElementById("answer")
var choice1 = document.getElementById("choice_1")
var choice2 = document.getElementById("choice_2")
var choice3 = document.getElementById("choice_3")
var choice4 = document.getElementById("choice_4")
var question = document.getElementById("question")
length = question_list.length
// choice1.disabled=true
// choice2.disabled=true
// choice3.disabled=true
// choice4.disabled=true
console.log(length)
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
    document.getElementById("instruction").textContent = ""
    document.getElementById("EndScreen").textContent = ""
    answer.textContent = ""
    document.getElementById("corrects").textContent = ("")
    times++
    console.log("start")
    console.log(times)
    console.log(length)
    var choice_1 = [[3, "wrong"], [3, "wrong"]]
    var choice_2 = [[2, "correct"], [6, "wrong"]]
    var choice_3 = [[1, "wrong"], [4, "correct"]]
    var choice_4 = [[4, "wrong"], [1, "wrong"]]

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
    question.textContent = question_list[q]
    choice1.textContent = choice_1[q][0]
    choice1.setAttribute("id", choice_1[q][1])
    choice2.textContent = choice_2[q][0]
    choice2.setAttribute("id", choice_2[q][1])
    choice3.textContent = choice_3[q][0]
    choice3.setAttribute("id", choice_3[q][1])
    choice4.textContent = choice_4[q][0]
    choice4.setAttribute("id", choice_4[q][1])
    choice1.addEventListener("click", Answering)
    choice2.addEventListener("click", Answering)
    choice3.addEventListener("click", Answering)
    choice4.addEventListener("click", Answering)
    canvasclear();
}
function Test() {
    var number = 30;
    GameintervalId = setInterval(decrement, 1000)
    function decrement() {
        document.getElementById("timer").textContent = number
        circletimer(30, number)
        if (number <= 0) {
            question.textContent = ("Ran out of time")
            wrong++;
            Reveal()
            stop(GameintervalId);
        }
        else {
            console.log(number)
            number--;
        }
    }
};


function circletimer(base, current) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
   
    
    ctx.beginPath();
    ctx.lineWidth=10;
    ctx.arc(150, 73, 50, 1.5 * Math.PI, (((base - current) * 2 / base) + 1.5) * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth=1
    ctx.arc(150, 73, 45, 0, 2 * Math.PI);
    ctx.fillStyle="red"
    ctx.fill();
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
function Answering() {
    button_state(true, 1)
    console.log(this)
    console.log(this.getAttribute("id"))
    if (this.getAttribute("id") === "correct") {
        question.textContent = ("correct")
        right++;
    }
    else {
        question.textContent = ("Wrong")
        wrong++;

    }
    console.log(document.getElementById("correct"))
    stop(GameintervalId);
    Reveal()
};

function Reveal() {
    canvasclear();
    answer.textContent = ("The answer is "+document.getElementById("correct").textContent)
    document.getElementById("instruction").textContent = ("Here's some extra trivia")
    document.getElementById("correct").style.border="3px solid gold"
    var number = 15;
    TransistionintervalId = setInterval(decrement, 1000)
    function decrement() {
        console.log(number)
        document.getElementById("timer").textContent = number
        circletimer(15, number)
        if (number <= 0) {
            stop(TransistionintervalId);
            button_state(false, 1)
            document.getElementById("correct").style.border=""
            main();
        }
        else {
            document.getElementById("timer").textContent = number
            number--;
        }
    }

}

function endstate() {
    canvasclear();
    question.textContent = "Here's how well you did"
    document.getElementById("corrects").textContent = ("Number of Correct Answers " + right)
    document.getElementById("wrong").textContent = ("Number of Wrong Answers " + wrong)
    document.getElementById("EndScreen").textContent = ("Status")
    document.getElementById("instruction").textContent = ("Press any key to play again")
    start = false
}

document.onkeyup = function () {

 
    if (start === false) {
        start = true;
        main();
    }
}

button_state(true, 0)

// var c = document.getElementById("myCanvas");
// var ctx = c.getContext("2d");

// ctx.beginPath();
// ctx.lineWidth=20;
// ctx.arc(150,73,50,0, 2*Math.PI);
// ctx.stroke();



// ctx.beginPath();
// ctx.lineWidth=1;
// ctx.arc(150,73,40,0,2*Math.PI);
// ctx.fillStyle="yellow"
// ctx.fill();
// ctx.stroke();


function main() {
    if (times === length) {
        endstate;
        done = []
        times = 0;
        endstate();
    }
    else {
     
        Question();
        Test();

    }
}
