class Hangman {
  constructor (word) {
    this.word = word;
    this._answerArray = [];
    this._remainingLetters = 0;
    this._attempts = 0;
    this._wrongLetters = '';
  };
  
  static checkLanguage (text) { //static потому что вспомогательный метод и не взаимодейтсвует напрямую с компонентами
    return /[а-яё]/i.test(text);
  }
  
  random () {
    return this.word[Math.floor(Math.random() * this.word.length)];
  }
  findLetter (letter) {
    return [...(this.word)].forEach((elem, index) => {
      if (elem === letter) {
        this._answerArray[index] = letter;
        this._remainingLetters--;
      }
    })
  }
  attempt () {
    return this._attempts = Math.round(this._remainingLetters / 4);
  }
  answer () {
    alert(this._answerArray.join(" "));
    
    let success = (this._wrongLetters) ? "У вас почти получилось!" : "Отлично!";
    alert(`${ success } Было загадано слово ${ this.word }`);
  }
  guess () {
    this.word = ((Array.isArray(this.word)) ? this.random() : this.word).toLowerCase();
    this._remainingLetters = this.word.length;
    this._answerArray = [...this.word].map(elem => (elem === ' ') ? (this._remainingLetters--, elem) : [...elem].fill('_'));
    this.attempt();
    
    while (this._attempts && this._remainingLetters) {
      alert(`${ this._answerArray.join(" ") } | ${ this._wrongLetters } | Осталось попыток: ${ this._attempts }`);
      
      let guess = prompt("Угадайте букву, или нажмите Отмена для выхода из игры.");
  
      if (guess === null) {
        break; // Выходим из игрового цикла
      } else if (guess.length !== 1) {
        alert("Пожалуйста, введите одиночную букву.");
      } else if (this._wrongLetters.includes(guess) || this._answerArray.includes(guess)) {
        alert("Такая буква уже была, попробуйте снова.");
      } else if (Hangman.checkLanguage(guess) !== Hangman.checkLanguage(this.word)) {
        alert("Поменяйте раскладку клавиатуры (ru/en).");
      } else {
        guess = guess.toLowerCase();
        
        if (this.word.includes(guess)) {
          this.findLetter(guess); // Обновляем состояние игры
        } else {
          this._wrongLetters += guess;
          this._remainingLetters--;
          this._attempts--;
        }
      }
    }
    
    this.answer();
  }
}

const words = [ "проГрамма", "макАка", "преКрасный", "олаДушек" ];

// const hangman = new Hangman(words);
// const hangman = new Hangman('СлОво');
const hangman = new Hangman('');
hangman.guess();
