document.addEventListener("DOMContentLoaded", function () {
    const quizItems = document.querySelectorAll(".quiz-item");  
    const startBtn = document.querySelector(".start-btn");  
    let currentQuestionIndex = 0;  
    const answers = {};  
   
    startBtn.addEventListener("click", () => {
      document.getElementById("quiz-start").style.display = "none";
      document.getElementById("quiz-content").style.display = "flex";
      showQuestion(currentQuestionIndex);
    });
   
    function showQuestion(index) {
      quizItems.forEach((item, i) => {
        item.style.display = i === index ? "flex" : "none";
      });
  
      const options = quizItems[index].querySelectorAll("input[type='radio']");
      const nextBtn = quizItems[index].querySelector(".next-btn");
     
      nextBtn.disabled = true;  
      nextBtn.style.display = "flex";
   
      options.forEach((option) => {
        option.addEventListener("change", () => { 
          nextBtn.disabled = false;  
        });
      });
   
      nextBtn.addEventListener("click", () => nextQuestion());
    }
   
    function nextQuestion() { 
      const selectedOption = quizItems[currentQuestionIndex].querySelector(
        "input[type='radio']:checked"
      );
      if (selectedOption) {
        const questionText = quizItems[currentQuestionIndex].querySelector(".quiz-question").textContent;
        answers[questionText] = selectedOption.value;
      }
  
      currentQuestionIndex++;
   
      if (currentQuestionIndex < quizItems.length) {
        showQuestion(currentQuestionIndex);
      } else {
        showForm();   
      }
    }
   
    function showForm() {
      document.getElementById("quiz-content").style.display = "none";
      document.getElementById("quiz-form").style.display = "block";
    }
  }); 

  const progressBar = document.getElementById("progress-bar");
  const progressPercent = document.getElementById("progress-percent");
  const quizItem8 = document.getElementById("quiz-item-8");
  const quizItem9 = document.getElementById("quiz-form");
  
  const startProgress = () => {
    let progress = 0;
    const duration = 2000;  
    const interval = 20;  
    const step = 100 / (duration / interval); 
  
    const updateProgress = () => {
      progress += step;
      if (progress >= 100) {
        progress = 100;
        clearInterval(progressInterval);
   
        setTimeout(() => {
          quizItem8.style.display = "none";
          quizItem9.style.display = "flex";
        }, 1000);
      }
  
      // Обновляем визуальный прогресс
      progressBar.style.width = progress + "%";
      progressPercent.textContent = Math.floor(progress) + "%";
    };
  
    // Интервал для обновления прогресса
    const progressInterval = setInterval(updateProgress, interval);
  };
  
  const observeVisibility = () => {
    const observer = new MutationObserver(() => {
      const isFlex = getComputedStyle(quizItem8).display === "flex";
      if (isFlex) {
        observer.disconnect();  
        startProgress();  
      }
    });
   
    observer.observe(quizItem8, { attributes: true, attributeFilter: ["style"] });
  };
  
  observeVisibility();
  
  



  const randomNumElement = document.querySelector('.random_num');
 
const getCurrentNumber = () => {
  const savedNumber = localStorage.getItem('random_num');
  return savedNumber ? parseFloat(savedNumber.replace(',', '')) : 43558; 
};
 
const updateNumber = () => {
  let currentNumber = getCurrentNumber();
  const randomIncrement = Math.floor(Math.random() * (19 - 2 + 1)) + 2;  
  currentNumber += randomIncrement;
 
  localStorage.setItem('random_num', currentNumber.toLocaleString('en-US'));
 
  randomNumElement.textContent = currentNumber.toLocaleString('en-US');
};
 
window.onload = updateNumber;

function repositionFlexRight() { 
  const isSmallScreen = window.innerWidth <= 767; 
  const quizItems = document.querySelectorAll('.quiz-item');

  quizItems.forEach((quizItem) => {
    const questionOptions = quizItem.querySelector('.question-options');
    const flexRight = quizItem.querySelector('.flex-rigth');

    if (isSmallScreen) { 
      const quizQuestion = questionOptions.querySelector('.quiz-question');
      questionOptions.insertBefore(flexRight, quizQuestion.nextSibling);
    } else { 
      const quizFlex = quizItem.querySelector('.quiz-flex');
      quizFlex.appendChild(flexRight);
    }
  });
}
 
window.addEventListener('load', repositionFlexRight);
window.addEventListener('resize', repositionFlexRight);
