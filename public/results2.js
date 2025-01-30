let totalScore = 0;

function calculateScore(selectedOption) {
  const points = parseInt(selectedOption.dataset.points);
  totalScore += points;

  // Check if it's the last question
  const currentQuestionIndex = parseInt(selectedOption.dataset.questionIndex);
  const totalQuestions = parseInt(
    document.getElementById("quiz").dataset.totalQuestions
  );

  if (currentQuestionIndex === totalQuestions - 1) {
    // Redirect to the results page with the total score
    window.location.href = `results2.html?score=${totalScore}`;
  } else {
    // Move to the next question
    showNextQuestion();
  }
}

console.log("Retrieved score:", score);
