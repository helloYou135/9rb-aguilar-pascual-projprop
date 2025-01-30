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
      text: "What do you value most?",
      options: [
        { text: "Goals, goals, goals", points: 30 },
        { text: "Teamwork", points: 50 },
        { text: "Strong defense", points: 20 },
        { text: "Speed", points: 10 },
        { text: "Dedication", points: 40 },
      ],
    },
    {
      //Q2
      text: "What aspect of the team would you consider most important?",
      options: [
        { text: "Defense", points: 30 },
        { text: "Midfield", points: 40 },
        { text: "Wings and flanks", points: 20 },
        { text: "Attack", points: 50 },
        { text: "Goalkeeping", points: 10 },
      ],
    },
    {
      // Q3
      text: "How do your friends perceive you?",
      options: [
        { text: "Bossy", points: 30 },
        { text: "Loyal", points: 20 },
        { text: "Aggressive", points: 50 },
        { text: "Insensitive", points: 40 },
        { text: "Helpful and sacrificial", points: 10 },
      ],
    },
    {
      //Q4
      text: "How do you react to hazing and haters?",
      options: [
        { text: "Take it in my stride", points: 30 },
        { text: "Lash out", points: 20 },
        { text: "Shut them up with my performance", points: 40 },
        { text: "Fight fire with fire", points: 50 },
        { text: "Turn the other cheek", points: 10 },
      ],
    },
    {
      text: "What is your preferred playing style?",
      options: [
        { text: "Flair and skills all the way", points: 50 },
        { text: "Go for goal", points: 30 },
        { text: "Tiki-Taka", points: 40 },
        { text: "Counter attack", points: 20 },
        { text: "Park the bus", points: 10 },
      ],
    },
    {
      text: "If your team doesn't meet your expectations, what would you do?",
      options: [
        { text: "Encourage them", points: 40 },
        { text: "Give them the silent treatment", points: 20 },
        { text: "Lash out at someone", points: 50 },
        { text: "There is nothing I can do about it", points: 30 },
        { text: "Take the heat", points: 10 },
      ],
    },
    {
      text: "What is your ideal recreational setting?",
      options: [
        { text: "An island somewhere", points: 50 },
        { text: "At home with my family", points: 30 },
        { text: "A club or a party", points: 20 },
        { text: "A hangout session with my friends", points: 40 },
        { text: "Something religious", points: 10 },
      ],
    },
    {
      // Q8
      text: "Which of the following things describe you best?",
      options: [
        { text: "Hardly seen on the field", points: 20 },
        { text: "No risks taken, played too safe", points: 10 },
        { text: "Directed things well", points: 40 },
        { text: "Was at the helm of affairs", points: 50 },
        { text: "Man of the match", points: 30 },
      ],
    },
    {
      // Q9
      text: "What type of leader would you say you are?",
      options: [
        { text: "I give orders, and people follow", points: 50 },
        { text: "Soft and encouraging", points: 10 },
        { text: "Dedicated and exemplary", points: 40 },
        { text: "Committed but can be harsh at times", points: 30 },
        { text: "Open to suggestions", points: 20 },
      ],
    },
    {
      // Q10
      text: "What is your ideal goal celebration?",
      options: [
        { text: "An acrobatic display", points: 40 },
        { text: "Arms spread wide", points: 30 },
        { text: "Something silly", points: 20 },
        { text: "A gesture to my opponents", points: 50 },
        { text: "Nothing at all/other", points: 10 },
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
    window.location.href = "results4.html?score=" + totalPoints; // Pass the total score in the URL
  }

  // Load the first question initially
  loadQuestion(currentQuestionIndex);
});
