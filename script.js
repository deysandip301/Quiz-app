// script.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start_button');
    const tryAgainButton = document.getElementById('try_again');
    const goHomeButton = document.getElementById('go_home');
    const quizHome = document.querySelector('.quiz_home');
    const quizSection = document.querySelector('.quiz_section');
    const finalSection = document.querySelector('.final_section');
    const options = document.querySelectorAll('.option');
    const answerFeedback = document.getElementById('answer_feedback');
    const scoreDisplay = document.getElementById('score');
    const finalScoreDisplay = document.getElementById('final_score');
    const progressBar = document.getElementById('progress_bar');
    const questionNumber = document.getElementById('question_number');
    const questionText = document.getElementById('question_text');

    let score = 0;
    let currentQuestionIndex = 0;

    const questions = [
        {
            question: "Which of the following is the correct way to comment in HTML?",
            options: ["// Comment", "<!-- Comment -->", "/* Comment */", "<! Comment>"],
            correctAnswer: 1
        },
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets", "Computer Style Sheets"],
            correctAnswer: 0
        },
        {
            question: "Which HTML element is used for the largest heading?",
            options: ["<heading>", "<h6>", "<head>", "<h1>"],
            correctAnswer: 3
        }
    ];

    const totalQuestions = questions.length;

    startButton.addEventListener('click', () => {
        quizHome.style.display = 'none';
        quizSection.style.display = 'block';
        loadQuestion();
    });

    options.forEach(option => {
        option.addEventListener('click', (e) => {
            const selectedAnswer = e.target;
            const answerIndex = Array.from(options).indexOf(selectedAnswer);

            if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
                selectedAnswer.classList.add('correct');
                score+=10;
            } else {
                selectedAnswer.classList.add('incorrect');
            }

            options.forEach(option => option.disabled = true);

            setTimeout(() => {
                if (currentQuestionIndex < totalQuestions - 1) {
                    currentQuestionIndex++;
                    loadQuestion();
                } else {
                    showFinalScore();
                }
            }, 1000);
        });
    });

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${totalQuestions}`;
        scoreDisplay.textContent = score;
        questionText.textContent = currentQuestion.question;
        options.forEach((option, index) => {
            option.textContent = currentQuestion.options[index];
            option.classList.remove('correct', 'incorrect');
            option.disabled = false;
        });

        updateProgressBar();
        answerFeedback.style.display = 'none';
    }


    function updateProgressBar() {
        const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function showFinalScore() {
        quizSection.style.display = 'none';
        finalSection.style.display = 'block';
        finalScoreDisplay.textContent = score;
    }

    tryAgainButton.addEventListener('click', () => {
        resetQuiz();
    });

    goHomeButton.addEventListener('click', () => {
        finalSection.style.display = 'none';
        quizHome.style.display = 'block';
        resetQuiz();
        quizSection.style.display = 'none';
    });

    function resetQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        quizSection.style.display = 'block';
        finalSection.style.display = 'none';
        scoreDisplay.textContent = score;
        loadQuestion();
    }
});
