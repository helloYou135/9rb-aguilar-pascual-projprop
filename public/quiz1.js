document.addEventListener("DOMContentLoaded", () => {
  const optionsContainer = document.querySelector(".quiz-options");
  const nextButton = document.querySelector(".next-btn");
  const progressBar = document.querySelector(".progress");
  const progressLabel = document.querySelector(".progress-label"); // Fix selector here
  const questionTitle = document.querySelector("h2");
  const questionText = document.querySelector("p");

  // Quiz questions and options
  const questions = [
    {
      // Q1
      text: "Choose one sport from the following.",
      options: [
        { text: "Football/Soccer/Basketball", points: 30 },
        { text: "Table Tennis/Tennis", points: 20 },
        { text: "Lacrosse/Cricket/Baseball", points: 15 },
        { text: "Hockey/Golf", points: 10 },
        { text: "Wrestling/Boxing", points: 25 },
      ],
    },
    {
      //Q2
      text: "How do you respond when someone insults you?",
      options: [
        { text: "Get angry, but do nothing", points: 40 },
        { text: "I blush or start crying", points: 30 },
        { text: "I punch them", points: 50 },
        { text: "Doesn't affect me at all", points: 20 },
        { text: "I ignore them", points: 10 },
      ],
    },
    {
      // Q3
      text: "How would you prefer to travel?",
      options: [
        { text: "By aeroplane", points: 40 },
        { text: "By train", points: 30 },
        { text: "By boat or ship", points: 20 },
        { text: "By bus", points: 10 },
        { text: "Private car or bike", points: 50 },
      ],
    },
    {
      //Q4
      text: "How does your social circle look like?",
      options: [
        { text: "A bunch of old friends", points: 20 },
        { text: "Mostly just family", points: 10 },
        { text: "A small circle of loyal friends", points: 30 },
        { text: "A bunch of new friends", points: 50 },
        { text: "I'm a lone wolf and stick to myself", points: 40 },
      ],
    },
    {
      text: "What is your dominant emotion?",
      options: [
        { text: "Courage", points: 30 },
        { text: "Love", points: 20 },
        { text: "Anger", points: 40 },
        { text: "Fear", points: 50 },
        { text: "Hate", points: 10 },
      ],
    },
    {
      text: "How aggressive are you?",
      options: [
        { text: "Strong willed, but not aggressive", points: 20 },
        { text: "Very aggressive", points: 10 },
        { text: "A little aggressive", points: 30 },
        { text: "Extremely aggressive", points: 50 },
      ],
    },
    {
      text: "What would you rather eat?",
      options: [
        { text: "Vegetables", points: 10 },
        { text: "Junk food", points: 30 },
        { text: "Fruits", points: 40 },
        { text: "Sweets", points: 50 },
        { text: "Meat", points: 20 },
      ],
    },
    {
      // Q8
      text: "What is your worst quality?",
      options: [
        { text: "I'm insecure", points: 40 },
        { text: "I'm clumsy", points: 30 },
        { text: "I'm perfect", points: 50 },
        { text: "I'm lazy", points: 20 },
        { text: "I'm too quiet", points: 10 },
      ],
    },
    {
      // Q9
      text: "How athletic are you?",
      options: [
        { text: "I enjoy sport occasionally", points: 30 },
        { text: "I work out regularly", points: 40 },
        { text: "I hate exercise or sport", points: 10 },
        { text: "I'm generally inactive", points: 20 },
        { text: "I'm extremely athletic", points: 50 },
      ],
    },
    {
      // Q10
      text: "What would upset you most?",
      options: [
        { text: "Being lied to my face", points: 40 },
        { text: "Being alone", points: 20 },
        { text: "Being interrupted", points: 50 },
        { text: "When a good book or movie ends", points: 10 },
        { text: "Being ignored", points: 30 },
      ],
    },
  ];

  let currentQuestionIndex = 0; // Track the current question
  let totalPoints = 0; // Initialize the total points

  // Function to load a question and its options
  function loadQuestion(index) {
    if (index >= questions.length) {
      // End of quiz logic
      redirectToResults();
      return;
    }

    const question = questions[index];

    // Update question title and text
    questionTitle.textContent = `Question #${index + 1}`;
    questionText.textContent = question.text;

    // Clear existing options
    optionsContainer.innerHTML = "";

    // Create options
    question.options.forEach((option, idx) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.innerHTML = `<p>Option ${String.fromCharCode(65 + idx)}: ${
        option.text
      }</p>`;
      optionElement.dataset.points = option.points;

      // Add click event listener
      optionElement.addEventListener("click", () => {
        // Remove "selected" class from all options
        document
          .querySelectorAll(".option")
          .forEach((opt) => opt.classList.remove("selected"));

        // Add "selected" class to the clicked option
        optionElement.classList.add("selected");

        // Add the selected points to the total
        totalPoints += option.points;

        // Disable the Next button until the delay finishes
        nextButton.disabled = true;

        // Delay for 2 seconds before updating progress and showing points
        setTimeout(() => {
          // Update progress bar and label
          const progress =
            ((currentQuestionIndex + 1) / questions.length) * 100;
          progressBar.style.width = `${progress}%`;
          progressLabel.textContent = `Progress: ${Math.round(progress)}%`;

          // Display points if not already shown
          if (!optionElement.querySelector(".points-display")) {
            const pointsDisplay = document.createElement("span");
            pointsDisplay.classList.add("points-display");
            pointsDisplay.textContent = `${option.points} pts`;
            pointsDisplay.style.color = "green"; // Set points color to green
            optionElement.appendChild(pointsDisplay);
          }

          // Enable the Next button
          nextButton.disabled = false;
        }, 2000);
      });

      // Append option element to container
      optionsContainer.appendChild(optionElement);
    });

    // Disable the "Next" button initially
    nextButton.disabled = true;
  }

  // Handle "Next" button click
  nextButton.addEventListener("click", () => {
    currentQuestionIndex++; // Increment the current question index

    if (currentQuestionIndex < questions.length) {
      // Load the next question
      loadQuestion(currentQuestionIndex);
    } else {
      // Redirect to results page after the last question
      redirectToResults();
    }
  });

  // Function to redirect to results page
  function redirectToResults() {
    window.location.href = "results1.html?score=" + totalPoints; // Pass the total score in the URL
  }

  // Load the first question initially
  loadQuestion(currentQuestionIndex);
});
