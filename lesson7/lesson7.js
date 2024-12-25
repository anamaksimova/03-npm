'use strict';
import fs from 'node:fs';
import readline from 'node:readline/promises';

const startTest = async (path) => {
    const data = fs.readFileSync(path);

const dataObj = JSON.parse(data);

const rl = readline.createInterface(
    {
        input:process.stdin,
        output: process.stdout,
        prompt: '#',
    }
);

console.log('Приветствуем! Для прохождения теста вводите номер правильного ответа: 1, 2 или 3');
let currentQuestion = 0;
let rightAnswers = 0;

const askQuestion = async index => {
    const answ = await rl.question( `${index+1} ` +dataObj[index].question +' \n' +
        `1. `+dataObj[index].options[0]+'\n'+
        `2. `+dataObj[index].options[1]+'\n'+
        `3. `+dataObj[index].options[2]+'\n');
return answ;
};

const getAnswer =  async(index) => {
    const answer = await askQuestion(index);
        
    if (answer === '1' || answer === '2' || answer ==='3') {
    console.log('Ваш ответ: ', answer);
    return answer;
    } else {
        console.log('Ошибка ввода');
        console.log('Введите номер ответа 1, 2 или 3');
    const answ =  await getAnswer(index);
    return answ;
    }
};


const checkIfRight = (ourAnswer, rightAnswer) => {
    if (ourAnswer == rightAnswer) {
        console.log('Верно!');
        return true;
    } else {
        console.log('Не верно!');
        return false ;
    } 
};

for (let index = 0; index < dataObj.length; index++) {
    const answer = await getAnswer(index);
    const checked =  checkIfRight(answer,dataObj[index].correctIndex+1);
    if (checked) {
        rightAnswers++;
    }
    currentQuestion++;
};

console.log('Тест завершен');
console.log(`Общее число правильных ответов: ${rightAnswers}/${dataObj.length}`);
rl.close();
};

startTest('./lesson7/question.json');