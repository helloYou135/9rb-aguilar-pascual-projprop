document.addEventListener("DOMContentLoaded", () => {
  const optionsContainer = document.querySelector(".quiz-options");
  const nextButton = document.querySelector(".next-btn");
  const progressBar = document.querySelector(".progress");
  const progressLabel = document.querySelector(".progress-label"); // Fix selector here
  const questionTitle = document.querySelector("h2");
  const questionText = document.querySelector("p");
  const resultContainer = document.querySelector(".result-container"); // Add result container

  // Quiz questions and options
  const questions = [
    {
      // Q1
      text: "Where would you go if you had the choice?",
      options: [
        { text: "To a castle", points: 40 },
        { text: "A peaceful place with friends", points: 20 },
        { text: "A ball or a party", points: 50 },
        { text: "Anywhere with my lover", points: 10 },
        { text: "See every place in the world", points: 30 },
      ],
    },
    {
      //Q2
      text: "Choose one thing you would never forget...",
      options: [
        { text: "Feeding my pets", points: 20 },
        { text: "Spending time with buddies", points: 10 },
        { text: "Pursuing my dream", points: 50 },
        { text: "Being in love", points: 30 },
        { text: "My parents' sweet smiles", points: 40 },
      ],
    },
    {
      // Q3
      text: "Who would you trust?",
      options: [
        { text: "Friends", points: 20 },
        { text: "Animals", points: 10 },
        { text: "Magic", points: 50 },
        { text: "Seeing is believing", points: 30 },
        { text: "My own judgment", points: 40 },
      ],
    },
    {
      //Q4
      text: "What is your favorite hobby?",
      options: [
        { text: "Traveling/Exploring", points: 30 },
        { text: "Helping others", points: 20 },
        { text: "I like to think", points: 40 },
        { text: "Dancing", points: 50 },
        { text: "Trying new things or testing my limits", points: 10 },
      ],
    },
    {
      text: "Do you like making friends?",
      options: [
        { text: "Yes, I love making friends", points: 20 },
        { text: "I don't know how to make friends", points: 40 },
        { text: "I prefer love over friendship", points: 50 },
        { text: "I don't need friends, I'm independent", points: 10 },
        {
          text: "I like making friends so that I can travel with them",
          points: 30,
        },
      ],
    },
    {
      text: "What is your most prominent personality trait?",
      options: [
        { text: "Friendliness", points: 20 },
        { text: "Cleverness", points: 50 },
        { text: "Modesty", points: 10 },
        { text: "Empathy", points: 30 },
        { text: "Self-confidence", points: 40 },
      ],
    },
    {
      text: "What do you value most?",
      options: [
        { text: "Happiness", points: 30 },
        { text: "Liberty", points: 20 },
        { text: "Love", points: 40 },
        { text: "Friends", points: 10 },
        { text: "Others", points: 50 },
      ],
    },
    {
      // Q8
      text: "What describes you best?",
      options: [
        { text: "Spontaneous", points: 30 },
        { text: "Kind", points: 50 },
        { text: "Sassy", points: 10 },
        { text: "Humble", points: 20 },
        { text: "Survivor", points: 40 },
      ],
    },
    {
      // Q9
      text: "Which of these features is striking in your appearance?",
      options: [
        { text: "My long, shiny hair", points: 30 },
        { text: "My flawless skin", points: 10 },
        { text: "My pretty eyes", points: 50 },
        { text: "I believe in my inner beauty", points: 40 },
        { text: "My perfect body", points: 20 },
      ],
    },
    {
      // Q10
      text: "What would be the worst state for you?",
      options: [
        { text: "Being alone", points: 30 },
        { text: "Being in prison or confinement", points: 40 },
        { text: "Being unconscious", points: 10 },
        { text: "Failing to accomplish my goal", points: 50 },
        { text: "Being embarrassed or humiliated", points: 20 },
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
    window.location.href = "results5.html?score=" + totalPoints; // Pass the total score in the URL
  }

  // Load the first question initially
  loadQuestion(currentQuestionIndex);
});
