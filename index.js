const _ = require('lodash');
const dayjs = require('dayjs');
const fs = require('fs');

const DATE_FORMATS = {
    calendarFormat: 'YYYY-MM-DD',
};

const Events = [
    {
        type: 'Depth',
        frequencyFrom: 0,
        frequencyTo: 10,
        valueFrom: 1.5,
        valueTo: 3,
        valueUnitName: 'm'
    },
    {
        type: 'Engine',
        frequencyFrom: 0,
        frequencyTo: 5,
        valueFrom: 1750,
        valueTo: 3000,
        valueUnitName: 'rpm'
    },
    {
        type: 'Temp',
        frequencyFrom: 0,
        frequencyTo: 3,
        valueFrom: 35,
        valueTo: 50,
        valueUnitName: ''
    },
    {
        type: 'Tank',
        frequencyFrom: 0,
        frequencyTo: 1,
        valueFrom: 1, //не может быть false, иначе ивент не имеет смысла
        valueTo: 1,
        valueUnitName: ''
    },
    {
        type: 'Leak',
        frequencyFrom: 0,
        frequencyTo: 1,
        valueFrom: 1, 
        valueTo: 1,
        valueUnitName: ''
    },
    {
        type: 'Battery',
        frequencyFrom: 0,
        frequencyTo: 1,
        valueFrom: '11.99',
        valueTo: '10',
        valueUnitName: 'v'
    },
    {
        type: 'Wind',
        frequencyFrom: 2,
        frequencyTo: 5,
        valueFrom: 25,
        valueTo: 50,
        valueUnitName: 'm/s'
    },
]


//Возьмем даты из datepicker, пока такие.
const DateFrom = dayjs('2021-11-19').format(DATE_FORMATS.calendarFormat);

let Output = {};

//создать ключи для дней
for (let day = 0; day < 7; day++) {
    let date = dayjs(DateFrom).add(day, 'day').format(DATE_FORMATS.calendarFormat);
    Output[date] = new Array;
}

Events.forEach(eventType => {
    let amount = _.random(eventType.frequencyFrom, eventType.frequencyTo); //сколько ивентов в неделю
    
    for (let i = 0; i < amount; i++) { 
        //создаём ивент
        let newEvent = {
            type: eventType.type,
            value: _.random(eventType.valueFrom, eventType.valueTo).toFixed(2)
        }

        //определяем день недели
        let day = _.random(0, 6);
        let date = dayjs(DateFrom).add(day, 'day').format(DATE_FORMATS.calendarFormat) //вот наша дата в заданной формате
        
        //кладем в соответствующий ключ
        
        Output[date].push(newEvent); //Cannot read property 'push' of undefined
    }
})

Output = JSON.stringify(Output);

console.log(Output);
fs.writeFile('./output.json', Output, err => {
    if (err) {
        console.log(err)
        return
    }
});