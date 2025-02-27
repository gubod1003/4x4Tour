// Initialize Swiper
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".route-slider", {
    slidesPerView: 3, // Количество отображаемых слайдов
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 30, // Угол поворота слайдов
        stretch: -100, // Растяжение (0 - стандартное поведение)
        depth: 100, // Глубина перспективы
        modifier: 1, // Усиление эффекта
        slideShadows: false, // Тени у слайдов
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 5000,
    },
  });

  new Swiper(".gallery-swiper", {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: -10, // Угол поворота слайдов
      stretch: -15, // Растяжение (0 - стандартное поведение)
      depth: 100, // Глубина перспективы
      modifier: 1, // Усиление эффекта
      slideShadows: false, // Тени у слайдов
  },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 3000,
    },
});


  // Video Player
  const playButton = document.querySelector(".play-button");
  const iframe = document.getElementById("youtube-video");
  if (playButton && iframe) {
    playButton.addEventListener("click", () => {
        iframe.src += "&autoplay=1"; // Добавляет автозапуск
        playButton.style.display = "none";
    });
  }

  // FAQ
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
      const button = item.querySelector(".faq-button");
      button.addEventListener("click", () => {
          item.classList.toggle("active");
      });
  });


  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Navbar Scroll Effect
  let lastScroll = 0
  const navbar = document.querySelector(".navbar")
  const navLinks = document.querySelectorAll(".nav_link")

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll <= 0) {
      navbar.style.background = "transparent"
      //navLinks.forEach((link) => (link.style.color = "#fff"));
      return
    }

    if (currentScroll > lastScroll) {
      // Scrolling down
      navbar.style.transform = "translateY(-100%)"
    } else {
      // Scrolling up
      navbar.style.transform = "translateY(0)"
      navbar.style.background = "rgba(255, 255, 255, 0.4)"
      //navLinks.forEach((link) => (link.style.color = "#037E8C"));
    }

    lastScroll = currentScroll
  })

// Quiz section
const startBtn = document.querySelector('.quiz__start-btn');
  const quizIntro = document.querySelector('.quiz__intro');
  const quizContent = document.querySelector('.quiz__content');
  const questionText = document.getElementById('question-text');
  const answerButtons = document.querySelectorAll('.quiz__answer-btn');
  const nextBtn = document.querySelector('.quiz__next-btn');
  const prevBtn = document.querySelector('.quiz__prev-btn');
  const quizResult = document.querySelector('.quiz__result');
  const quizResultText = document.getElementById('quiz-result-text');
  const restartBtn = document.querySelector('.quiz__restart-btn');

  let currentQuestion = 0;
  let userAnswers = [];

  const questions = [
      { text: "Какой уровень сложности вас интересует?", answers: ["Легкий", "Средний", "Сложный"] },
      { text: "Какая длительность маршрута вам подходит?", answers: ["1-2 часа", "3-5 часов", "Целый день"] },
      { text: "Что для вас важнее в маршруте?", answers: ["Красивые виды", "Экстрим", "Исторические места"] }
  ];

  startBtn.addEventListener('click', () => {
      quizIntro.classList.add('hidden');
      quizContent.classList.remove('hidden');
      loadQuestion();
  });

  function loadQuestion() {
      questionText.innerText = questions[currentQuestion].text;
      answerButtons.forEach((btn, index) => {
          btn.innerText = questions[currentQuestion].answers[index];
          btn.dataset.answer = questions[currentQuestion].answers[index];
      });
      prevBtn.classList.toggle('hidden', currentQuestion === 0);
      nextBtn.innerText = currentQuestion === questions.length - 1 ? "Завершить" : "Далее";
  }

  answerButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          userAnswers[currentQuestion] = event.target.dataset.answer;
      });
  });

  nextBtn.addEventListener('click', () => {
      if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          loadQuestion();
      } else {
          showResult();
      }
  });

  prevBtn.addEventListener('click', () => {
      if (currentQuestion > 0) {
          currentQuestion--;
          loadQuestion();
      }
  });

  function showResult() {
      quizContent.classList.add('hidden');
      quizResult.classList.remove('hidden');
      quizResultText.innerText = `Ваш выбор: ${userAnswers.join(", ")}. Мы подберем маршрут для вас!`;
  }

  restartBtn.addEventListener('click', () => {
      quizResult.classList.add('hidden');
      quizIntro.classList.remove('hidden');
      currentQuestion = 0;
      userAnswers = [];
  });

})