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
      text: "Do you have recurring nightmares?",
      options: [
        { text: "Yes, a lot", points: 10 },
        { text: "Nope", points: 50 },
        { text: "I can't remember", points: 40 },
        { text: "Yes, a few times", points: 20 },
        { text: "Not anymore", points: 30 },
      ],
    },
    {
      //Q2
      text: "What career sounds more appealing to you?",
      options: [
        { text: "Doctor", points: 10 },
        { text: "Military or Lawyer", points: 40 },
        { text: "Teacher", points: 50 },
        { text: "Pilot or Engineer", points: 20 },
        { text: "Whatever makes me famous", points: 30 },
      ],
    },
    {
      // Q3
      text: "Which picture do you find most disturbing?",
      options: [
        {
          image:
            "https://cdn.glitch.global/b8d90080-2a2e-46ba-adea-351aa5fe7100/Screenshot%202024-12-22%20at%2011.09.11%20PM.png?v=1734880220975",
          points: 50,
        },
        {
          image:
            "https://cdn.glitch.global/b8d90080-2a2e-46ba-adea-351aa5fe7100/Screenshot%202024-12-22%20at%2011.09.29%20PM.png?v=1734880225860",
          points: 40,
        },
        {
          image:
            "https://cdn.glitch.global/b8d90080-2a2e-46ba-adea-351aa5fe7100/Screenshot%202024-12-22%20at%2011.09.36%20PM.png?v=1734880232002",
          points: 10,
        },
        {
          image:
            "https://cdn.glitch.global/b8d90080-2a2e-46ba-adea-351aa5fe7100/Screenshot%202024-12-22%20at%2011.09.47%20PM.png?v=1734880233905",
          points: 30,
        },
        {
          image:
            "https://cdn.glitch.global/b8d90080-2a2e-46ba-adea-351aa5fe7100/Screenshot%202024-12-22%20at%2011.09.55%20PM.png?v=1734880236018",
          points: 20,
        },
      ],
    },
    {
      //Q4
      text: "How do you feel in a crowd?",
      options: [
        { text: "Happy and Optimistic", points: 50 },
        { text: "Clumsy and Shy", points: 20 },
        { text: "Alone and Lost", points: 40 },
        { text: "I don't really care", points: 30 },
        { text: "Irritated, I like smaller groups", points: 10 },
      ],
    },
    {
      text: "How do you feel right now?",
      options: [
        { text: "Excited", points: 40 },
        { text: "Calm and Happy", points: 50 },
        { text: "Worthless and Depressed", points: 10 },
        { text: "Scared and Nervous", points: 30 },
        { text: "Thrilled and Anxious", points: 20 },
      ],
    },
    {
      text: "Have you achieved your most important goal?",
      options: [
        { text: "No, but I'm headed in the right direction", points: 40 },
        { text: "I don't need goals", points: 10 },
        { text: "No, but I have some work to do", points: 20 },
        { text: "Yes, I've already achieved my goal", points: 50 },
        { text: "I'm on my way", points: 30 },
      ],
    },
    {
      text: "What ANNOYS you the most?",
      options: [
        { text: "Everything", points: 40 },
        { text: "Relationship troubles", points: 20 },
        { text: "Friendship or Family troubles", points: 30 },
        { text: "Health or Fitness", points: 10 },
        { text: "Nothing", points: 50 },
      ],
    },
    {
      // Q8
      text: "How are other people in general?",
      options: [
        { text: "Heartless and Horrible", points: 40 },
        { text: "They are alright", points: 20 },
        { text: "Untrustworthy", points: 30 },
        { text: "Selfish", points: 10 },
        { text: "Fun and Awesome", points: 50 },
      ],
    },
    {
      // Q9
      text: "Do you believe in past lives?",
      options: [
        { text: "Nope, it's just nonsense", points: 20 },
        { text: "Yes, totally", points: 50 },
        { text: "I don't know", points: 10 },
        { text: "I hope so", points: 30 },
        { text: "Maybe", points: 40 },
      ],
    },
    {
      // Q10
      text: "Close your eyes for 5 seconds. What did you see?",
      options: [
        { text: "Blackness or something abstract", points: 50 },
        { text: "Something I fear or hate", points: 40 },
        { text: "Something i want or love", points: 20 },
        { text: "Something from my daily life", points: 30 },
        { text: "Something else", points: 10 },
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

      // Check if the option has an image
      if (option.image) {
        // Create an image element and set its source
        const imgElement = document.createElement("img");
        imgElement.src = option.image;
        imgElement.alt = `Option ${String.fromCharCode(65 + idx)}`; // Set alt text for accessibility
        imgElement.style.maxWidth = "100%"; // Optional: Set a max width for the image
        imgElement.style.marginBottom = "10px"; // Optional: Space between image and text
        optionElement.appendChild(imgElement);
      } else {
        // If there's no image, just add the text
        optionElement.innerHTML = `<p>Option ${String.fromCharCode(
          65 + idx
        )}: ${option.text}</p>`;
      }

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
    window.location.href = "results3.html?score=" + totalPoints; // Pass the total score in the URL
  }

  // Load the first question initially
  loadQuestion(currentQuestionIndex);
});
