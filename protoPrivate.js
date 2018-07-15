const Hangman = (function() {
  let _answerArray = [],
    _remainingLetters = 0,
    _attempts = 0,
    _wrongLetters = '';
  
  const Hang = function (word) {
    this.word = word;
  };
  
  Hang.prototype = {
    random: function () {
      return this.word[Math.floor(Math.random() * this.word.length)];
    },
    findLetter: function (letter) {
      return [...(this.word)].forEach((elem, index) => {
        if (elem === letter) {
          _answerArray[index] = letter;
          _remainingLetters--;
        }
      })
    },
    attempt: function () {
      return _attempts = Math.round(_remainingLetters / 4);
    },
    answer: function () {
      alert(_answerArray.join(" "));
      
      let success = (_wrongLetters) ? "Робека у тебя почти получилось!" : "Отлично!";
      alert(`${ success } Было загадано слово ${ this.word }`);
    },
    checkLanguage: function (text) { //static
      return /[а-яё]/i.test(text);
    },
    guess: function () {
      this.word = ((Array.isArray(this.word)) ? this.random() : this.word).toLowerCase();
      _remainingLetters = this.word.length;
      _answerArray = [...this.word].map(elem => (elem === ' ') ? (_remainingLetters--, elem) : [...elem].fill('_'));
      this.attempt();
      
      while (_attempts && _remainingLetters) {
        alert(`${ _answerArray.join(" ") } | ${ _wrongLetters } | Робека у тебя есть  ${ _attempts } попытки`);
        
        let guess = prompt("Робека угадай букву, или нажмите Отмена для выхода из игры.");

        if (guess === null) {
          break; // Выходим из игрового цикла
        } else if (guess.length !== 1) {
          alert("Робека, введите одиночную букву.");
        } else if (_wrongLetters.includes(guess) || _answerArray.includes(guess)) {
          alert("Робека такая буква уже была, попробуй снова.");
        } else if (this.checkLanguage(guess) !== this.checkLanguage(this.word)) {
          alert("Робека поменяйте раскладку клавиатуры (ru/en).");
        } else {
          guess = guess.toLowerCase();
          
          if (this.word.includes(guess)) {
            this.findLetter(guess); // Обновляем состояние игры
          } else {
            _wrongLetters += guess;
            _remainingLetters--;
            _attempts--;
          }
        }
      }
      
      this.answer();
    }
  };
  
  return Hang;
})();

const words = [ "милашка", "красотулька", "кисунька", "очаровашка","привлекашка" ];

// const hangman = new Hangman(words);
// const hangman = new Hangman('СлОво');
const hangman = new Hangman('');
hangman.guess();
