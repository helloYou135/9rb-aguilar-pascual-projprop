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
      text: "How do you currently feel about your life?",
      options: [
        { text: "Excited", points: 30 },
        { text: "Content", points: 50 },
        { text: "Nervous", points: 20 },
        { text: "Happy", points: 10 },
        { text: "Annoyed", points: 40 },
      ],
    },
    {
      //Q2
      text: "Where would you most likely find peace?",
      options: [
        { text: "In a remote forest", points: 30 },
        { text: "Inside myself", points: 20 },
        { text: "At my home", points: 40 },
        { text: "With my family and friends", points: 10 },
        { text: "On an isolated island", points: 50 },
      ],
    },
    {
      // Q3
      text: "What drives you?",
      options: [
        { text: "A desire for your peace", points: 20 },
        { text: "A quest for love", points: 40 },
        { text: "A need for power", points: 50 },
        { text: "A desire for success", points: 30 },
        { text: "A fear I can't defeat", points: 10 },
      ],
    },
    {
      //Q4
      text: "What is your personality like?",
      options: [
        { text: "Smart and creative", points: 20 },
        { text: "Playful and outgoing", points: 30 },
        { text: "Quiet and peaceful", points: 50 },
        { text: "Loving and compassionate", points: 10 },
        { text: "Independent and opinionated", points: 40 },
      ],
    },
    {
      text: "What is your favorite element?",
      options: [
        { text: "Air", points: 20 },
        { text: "Water", points: 50 },
        { text: "Earth", points: 30 },
        { text: "Fire", points: 40 },
        { text: "Metal", points: 10 },
      ],
    },
    {
      text: "What do you value most in life",
      options: [
        { text: "Success", points: 50 },
        { text: "Strength", points: 10 },
        { text: "Honesty", points: 20 },
        { text: "Creativity", points: 30 },
        { text: "Love", points: 40 },
      ],
    },
    {
      text: "What is your favorite pastime?",
      options: [
        { text: "Exploring the world", points: 30 },
        { text: "Meditating", points: 10 },
        { text: "Reading and writing", points: 20 },
        { text: "Honing my skills", points: 50 },
        { text: "Trying out new things", points: 40 },
      ],
    },
    {
      // Q8
      text: "What do you appreciate most?",
      options: [
        { text: "Life", points: 50 },
        { text: "Peace", points: 30 },
        { text: "Time", points: 10 },
        { text: "Knowledge", points: 20 },
        { text: "Power", points: 40 },
      ],
    },
    {
      // Q9
      text: "What fictional creature are you?",
      options: [
        { text: "Vampire", points: 30 },
        { text: "Zombie", points: 50 },
        { text: "Dragon", points: 40 },
        { text: "Wizard/Witch", points: 20 },
        { text: "Mermaid", points: 10 },
      ],
    },
    {
      // Q10
      text: "How do you see yourself in life?",
      options: [
        { text: "A strong and passionate person", points: 30 },
        { text: "A driven and ambitious person", points: 40 },
        { text: "A very loyal and honorable person", points: 10 },
        { text: "A lonely and misunderstood person", points: 20 },
        { text: "A mixture of all/none of these traits", points: 50 },
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
    window.location.href = "results2.html?score=" + totalPoints; // Pass the total score in the URL
  }

  // Load the first question initially
  loadQuestion(currentQuestionIndex);
});
