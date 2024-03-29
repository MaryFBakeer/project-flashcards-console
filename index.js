const fs = require('fs').promises;
const inquirer = require('inquirer');
const chalk = require('chalk')

//проверка корректности ответа
function correctnessResponse(answerUsers, answer) {
  if (answer === answerUsers) {
    return answerUsers;
  }
}

//выбор тем и возвращение пути к файлу темы
async function topics() {
  const func = await inquirer.prompt([
    {
      type: 'list',
      name: 'team',
      message: 'Какую тему вы хотите?',
      choices: ['Марвел', 'Мемные цитаты'],
    },
  ]);
  if (func.team === 'Марвел') {
    return './topics/marvel.txt';
  }
  return './topics/mems.txt';
}

// Обработка принятого файла, возвращаем массив объектов
async function digestFile(path) {
  const arrStr = (await fs.readFile(path, 'utf-8')).split('\r\n');
  const arrQuestion = arrStr.filter((el, i) => i % 3 === 0);
  const arrAnswer = arrStr
    .filter((el, i) => i % 3 !== 0 && el !== '')
    .map((el) => el.split(', '));
  const arrObj = [];
  for (let i = 0; i < arrQuestion.length; i += 1) {
    arrObj.push({
      question: arrQuestion[i],
      choices: arrAnswer[i],
      correctAnswer: arrAnswer[i][0],
    });
  }
  quizСonclusion(arrObj);
}

async function quizСonclusion(arrObj) {
  for (let i = 0; i < arrObj.length; i += 1) {
    const func = await inquirer.prompt([
      {
        type: 'list',
        name: 'animal',
        message: arrObj[i].question,
        choices: arrObj[i].choices,
      },
    ]);
    if (correctnessResponse(func.animal, arrObj[i].correctAnswer)) {
      console.log(chalk.bgGreen('А ты умен. ООУУУЕЕЕ!!!'));
    } else {
      console.log(chalk.bgRed(`Иди учи Промисы. Правильный ответ: ${arrObj[i].correctAnswer}`));
    }
  }
}

//запуск квиза
async function start() {
  const path = await topics();
  const a = await digestFile(path);
  console.log(a);
}

start();

