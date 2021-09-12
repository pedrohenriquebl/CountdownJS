/* Identificar pelo dom onde será colocada a contagem regressiva */
const secondsContainer = document.querySelector('#seconds');
const minutesContainer = document.querySelector('#minutes');
const hoursContainer = document.querySelector('#hours');
const daysContainer = document.querySelector('#days');
const nextYearContainer = document.querySelector('#year');
const spinnerLoading = document.querySelector('#loading');
const countdownContainer = document.querySelector('#countdown')

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Date(`Januay 01 ${nextYear} 00:00:00`);

nextYearContainer.textContent = nextYear;

const getTimeUnit = unit => unit < 10 ? '0' + unit : unit;

const insertCountdownValues = ({days, hours, minutes, seconds }) => {
    /* adicionando pelo dom dinamicamente a contagem */  

    /* Na contagem regressiva, para que o 0 permaneça
    aparecendo (09/08/07...), é preciso de uma condição ternária*/

    secondsContainer.textContent = getTimeUnit(seconds);
    minutesContainer.textContent = getTimeUnit(minutes);
    hoursContainer.textContent = getTimeUnit(hours);
    daysContainer.textContent = getTimeUnit(days);
}

const updateCountdown = () => {
    const currentTime = new Date();
    const difference = newYearTime - currentTime;

    /* Math.floor arredonda o numero em milesimos.
    Neste caso estamos dividindo a diferença em milisegundos entre a data atual
    e do ano novo por 1000, com o Math.floor, para termos a quantidade
    em segundos por mil, por 60 minutos para ter os minutos
    e como uma hora tem 60 minutos, dividir por 60 novamente, para ter o resultado
    em horas, e finalmente, em dias, dividmos por 24 que são o número de horas  */

    const days = Math.floor(difference/1000/60/60/24);

    /* para verificar horas restantes é só tirar o 24, o %modulo24 vai providenciar
    que possamos averiguar quantas horas faltam atualmente pro dia acabar */

    const hours = Math.floor(difference/1000/60/60) % 24;

    const minutes = Math.floor(difference/1000/60) % 60;

    const seconds = Math.floor(difference/1000) % 60;

    insertCountdownValues({days, hours, minutes, seconds });
 
}

/* Pelo elemento do dom acionamos o gif spinnerloading, porém adicionamos
o remove para que ele não fique aparecendo na tela o tempo todo.
Além disso, adicionamos a classe flex ao display, para que as horas
aparecam prontamente após o loading sumir*/

const handleCountdownDisplay = () => {
    spinnerLoading.remove();
    countdownContainer.style.display = 'flex';
}

setTimeout(handleCountdownDisplay, 1000)

/* A função setInterval recebe 2 parâmetros, o primeiro argumento será a função que 
será executada, o segundo é o intervalo de tempo em que a função será chamada,
neste caso, 1 segundo = 1000 milisegundos, portanto será esse o segundo
argumento */

setInterval(updateCountdown, 1000);