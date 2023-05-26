function randomNumber(min, max) {
    var diff = max - min;
    return max - Math.round(Math.random() * diff);
}

questionBox = document.getElementById("question");
outputBox = document.getElementById("output");

greetings = ["hi", "hello", "hey"];
greeting_answers = ["Hey hey", "How are you?", "What is up?"];
general_answers = ["Ok", "Great", "I think you are somewhat dumb", "That's an interesting point", "But what do you really think?",
    "Tell me something else", "What do you think?", "Are you sure?", "Unacceptable", "Maybe"];
last_answer = -1;
var interval_id;

function onQuestion() {
    question = questionBox.value;

    output.innerHTML += "<p> YOU: " + question + "</p>" + "<p> CHATBOT2000: " + respond(question) + "</p>";
    questionBox.value = "";
}

function pickRandomAnswer(answers) {
    choice = randomNumber(0, answers.length-1)
    if (choice == last_answer) {
        choice += 1;
    }

    last_answer = choice;

    return answers[choice];
}

function respond(question) {
    question_lower = question.toLowerCase()

    if (question_lower.indexOf("lying") != -1) {
        interval_id = setInterval(clear, 2000);
        return "DOES NOT COMPUTE";
    }

    for (i=0;i < greetings.length; i++) {
        if (question_lower.indexOf(greetings[i]) != -1) {
            return pickRandomAnswer(greeting_answers)
        }
    }

    return pickRandomAnswer(general_answers);
}

function clear() {
    outputBox.innerHTML = "";
    clearInterval(interval_id);
}

questionBox.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        onQuestion();
    }
});
