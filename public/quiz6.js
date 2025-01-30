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
      text: "Have you ever broken a law?",
      options: [
        { text: "Yes, many times", points: 30 },
        { text: "Yes, but it wasn't on purpose", points: 40 },
        { text: "No, I've never broken any laws", points: 50 },
        { text: "Who cares?", points: 10 },
        { text: "Hasn't everyone at one point or another?", points: 20 },
      ],
    },
    {
      //Q2
      text: "What would you rather be?",
      options: [
        { text: "Pirate", points: 10 },
        { text: "Assassin", points: 30 },
        { text: "Knight", points: 40 },
        { text: "Sorcerer", points: 20 },
        { text: "Spy", points: 50 },
      ],
    },
    {
      // Q3
      text: "What would you fight for?",
      options: [
        { text: "Treasures and riches", points: 10 },
        { text: "My king and queen", points: 40 },
        { text: "For my people", points: 30 },
        { text: "Anyone who hires me", points: 20 },
        { text: "For the greater good", points: 50 },
      ],
    },
    {
      //Q4
      text: "Why do you kill people?",
      options: [
        { text: "I kill for self-defense", points: 10 },
        { text: "I kill for fun", points: 20 },
        { text: "I kill to protect", points: 40 },
        { text: "I don't kill", points: 50 },
        { text: "I kill for vengeance", points: 30 },
      ],
    },
    {
      text: "What's your favorite way to travel?",
      options: [
        { text: "Walking/Running", points: 30 },
        { text: "Boats/Ships", points: 20 },
        { text: "Horses", points: 40 },
        { text: "Magical portals", points: 50 },
        { text: "Other modern methods", points: 10 },
      ],
    },
    {
      text: "Which word best describes you?",
      options: [
        { text: "Fierce", points: 30 },
        { text: "Honourable", points: 40 },
        { text: "Cunning", points: 10 },
        { text: "Sneaky", points: 50 },
        { text: "Ruthless", points: 20 },
      ],
    },
    {
      text: "What's the chink in your armour?",
      options: [
        { text: "I'm stubborn", points: 10 },
        { text: "I'm sensitive", points: 30 },
        { text: "I'm easily swayed", points: 40 },
        { text: "I always follow orders", points: 20 },
        { text: "I have no weakness", points: 50 },
      ],
    },
    {
      // Q8
      text: "What do you like to do in your free time?",
      options: [
        { text: "Rest or meditate", points: 50 },
        { text: "Explore the world", points: 40 },
        { text: "Daydream", points: 30 },
        { text: "Practice new fighting techniques", points: 20 },
        { text: "Kill someone", points: 10 },
      ],
    },
    {
      // Q9
      text: "What do you prefer in a weapon?",
      options: [
        { text: "Power", points: 20 },
        { text: "Reach", points: 40 },
        { text: "Accuracy", points: 30 },
        { text: "Speed", points: 50 },
        { text: "Balance", points: 10 },
      ],
    },
    {
      // Q10
      text: "What is a weapon?",
      options: [
        { text: "A tool of destruction", points: 20 },
        { text: "A way of life", points: 10 },
        { text: "Protection and insurance", points: 50 },
        { text: "My best friend", points: 30 },
        { text: "Whatever it needs to be", points: 40 },
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
    window.location.href = "results6.html?score=" + totalPoints; // Pass the total score in the URL
  }

  // Load the first question initially
  loadQuestion(currentQuestionIndex);
});
