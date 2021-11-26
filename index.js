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

const BoatIds = [
    'c7f37e8d',
    '96a80485',
    '2aba4565',
    '0e4df7bf',
    'f9665ade',
    '609194d8',
    'ae7487ef',
    '40bb2c90',
    'b201b343',
    '1e080166',
]

let Output = {};

BoatIds.forEach(boatId => {
    //Задаём даты для генерации
    let DateFrom = dayjs('2021-11-01');
    const DateEnd = dayjs('2022-02-15');
    const BoatId = boatId; //Будем пихать в каждый ивент
    
    
    while( dayjs(DateFrom) < dayjs(DateEnd) ) {
        //создать ключи для дней
        for (let day = 0; day < 7; day++) {
            let date = dayjs(DateFrom).add(day, 'day').format(DATE_FORMATS.calendarFormat);
            if (_.isUndefined(Output[date])) Output[date] = new Array;
        }
    
        Events.forEach(eventType => {
            let amount = _.random(eventType.frequencyFrom, eventType.frequencyTo); //сколько ивентов в неделю
            
            for (let i = 0; i < amount; i++) { 
                //создаём ивент
                let randomHours = _.random(0, 23);
                let randomMinutes = _.random(0, 59);
                if (randomHours < 10) randomHours = `0${randomHours}`;
                if (randomMinutes < 10) randomMinutes = `0${randomMinutes}`;
    
                let newEvent = {
                    'boatId': BoatId,
                    type: eventType.type,
                    value: _.random(eventType.valueFrom, eventType.valueTo).toFixed(2),
                    time: `${randomHours}:${randomMinutes}`
                }
    
                //определяем день недели
                let day = _.random(0, 6);
                let date = dayjs(DateFrom).add(day, 'day').format(DATE_FORMATS.calendarFormat) //вот наша дата в заданной формате
                
                //кладем в соответствующий ключ
                
                Output[date].push(newEvent); //Cannot read property 'push' of undefined
            }
        })
    
        DateFrom = dayjs(DateFrom).add(7, 'day');
    
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