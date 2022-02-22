const fs = require('fs');
const Papa = require('papaparse');
const haversine = require('haversine')
const moment = require('moment');

// Source: https://stackoverflow.com/questions/49752889/how-can-i-read-a-local-file-with-papa-parse/60342410#60342410?newreg=53000b8d49604d7c82848b86380f595e
const readFile = async (path) => {
    const csvFile = fs.readFileSync(path);
    const csvData = csvFile.toString();
    return Papa.parse(csvData, {
        header: true,
    })
}

const vehicleServices = async (datetime, plate) => {
    const poisPath = './utils/base_pois_def.csv';
    const positionsPath = './utils/posicoes.csv';
    const { data: poisData } = await readFile(poisPath);
    const { data: positionsData } = await readFile(positionsPath);
    return getDistanceBetweenLatLng(poisData, positionsData, datetime, plate);
}

const calcMin = (actualMinObjTime, positionDate) => {
    if(moment(actualMinObjTime).isBefore(positionDate)) {
        return actualMinObjTime;
    }
    return positionDate;
}

const calcMax = (actualMaxObjTime, positionDate) => {
    if(moment(actualMaxObjTime).isAfter(positionDate)) {
        return actualMaxObjTime;
    }
    return positionDate;
}

const mountLatLngObj = (obj) => {
    const lat = obj['latitude'];
    const lon = obj['longitude'];
    return { latitude: parseFloat(lat), longitude: parseFloat(lon) }
}

const updatedMinMaxTime = (plate, objMinMaxTime, positionDate) => {
    const actualMinObjTime = objMinMaxTime[plate].min;
    const actualMaxObjTime = objMinMaxTime[plate].max;
    const min = calcMin(actualMinObjTime, positionDate);
    const max = calcMax(actualMaxObjTime, positionDate)
    return  createObjMinMaxTime(objMinMaxTime, plate, min, max);
};

const createObjMinMaxTime = (obj, plate, min, max) => ({
    ...obj, [plate]: {min, max} 
});

const transformSecondsInStringTime = (sec) => {
    const days = parseInt(sec / 86400);
    
    sec = sec % 86400;
    const hours = parseInt(sec / 3600);

    sec %= 3600;
    const minutes = parseInt(sec/60);

    sec %= 60;
    const seconds = sec;

    return {days, hours, minutes, seconds};
}

const addSeconds = (max, min) => moment(max).diff(min, 'seconds');



const putRemainingObjects = (remaining, totalSpendTime) => {
    Object.entries(remaining).forEach((arr) => {
        const max = arr[1].max;
        const min = arr[1].min;
        if(arr) {
            if(totalSpendTime[arr[0]]) {
                totalSpendTime[arr[0]] += addSeconds(max, min)
            } else {
                    totalSpendTime[arr[0]] = addSeconds(max, min);
                } 
        }
    });
}

const calculatedTime = (spentTimeInSeconds) => Object.entries(spentTimeInSeconds).map((time) => {
        return { [time[0]]: transformSecondsInStringTime(time[1]) }
    })

const populateTotalSpendTime = (totalSpendTime, objMinMaxTime, plate) => {
    if(objMinMaxTime[plate]) {          
        if(totalSpendTime[plate]) {
             totalSpendTime[plate] += addSeconds(objMinMaxTime[plate].max, objMinMaxTime[plate].min)                    
        } else {
            totalSpendTime[plate] = addSeconds(objMinMaxTime[plate].max, objMinMaxTime[plate].min)
        }
        objMinMaxTime = {}
    }
}

const filterByPlate = (plate, plateParam) => {
    if(plateParam) {
        return plate === plateParam;
    }
    return true;
}

const filterByDate = (date, dateParam) => {
    if(dateParam) {
        return moment(date).isSame(dateParam);
    }
    return true;
}


const populateObjMinMaxTime = (poi, positionsData, datetime, plateParam) => {
    let objMinMaxTime = {};
    let totalSpendTime = {};
    const start = mountLatLngObj(poi);
    const radius = poi['raio'];

    positionsData.forEach((pos) => {
        const end = mountLatLngObj(pos);
        const plate = pos['placa'];
        // Source haversine: https://www.npmjs.com/package/haversine
        const isInsideAPoi = haversine(start, end, { threshold:radius, unit: 'meter'});
        const positionDate = new Date(pos['data_posicao']);

        if(isInsideAPoi &&  filterByPlate(plate, plateParam) && filterByDate(positionDate, datetime)) {
            if(objMinMaxTime[plate]) {
                objMinMaxTime = updatedMinMaxTime(plate, objMinMaxTime, positionDate);
            } else {
                objMinMaxTime = createObjMinMaxTime(objMinMaxTime, plate, positionDate, positionDate);
            }
        } else {
            populateTotalSpendTime(totalSpendTime, objMinMaxTime, plate)
        }
    });
    putRemainingObjects(objMinMaxTime, totalSpendTime);
    return totalSpendTime;
}


const getTimeSpentInPoi = (poi, positionsData, datetime, plate) => {    
    const totalSpendTime = populateObjMinMaxTime(poi, positionsData, datetime, plate)
    return calculatedTime(totalSpendTime);
}

const getDistanceBetweenLatLng = (poisData, positionsData, datetime, plate) => {
    let arr = [];
    poisData
    .forEach((poi) => {
        const expendTimeInAPoi = getTimeSpentInPoi(poi, positionsData, datetime, plate);

        if(expendTimeInAPoi && Object.keys(expendTimeInAPoi).length !== 0){
            if(poi['nome']){
                arr.push({ [poi['nome']]: expendTimeInAPoi })
            }
        }   
    });
    return arr;
    };


module.exports = vehicleServices;