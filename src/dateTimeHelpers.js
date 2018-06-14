const secondsInDay = 86400000;

function isToday(mill){

    var today = Math.floor(Date.now()/secondsInDay)
    var taskday = Math.floor(mill/secondsInDay)
    if(today === taskday ){
        return true;
    }else{
        return false;
        }
}

function isBackLog(mill){

    var today = Math.floor(Date.now()/secondsInDay)
    var taskday = Math.floor(mill/secondsInDay)
    if( taskday-today<0){
        return true;
    }else{
        return false;
        }
}

function isTomorrow(mill){
    var today = Math.floor(Date.now()/secondsInDay)
    var taskday = Math.floor(mill/secondsInDay)
    if(taskday-today<2 && taskday-today>0){
        return true;
    }else{
        return false;
        }
}

function isThisPeriod(mill,period){
    const periods = {
        'thisWeek':7,
        'lastWeek':-7,
        'thisMonth':30,
        'lastMonth':-30,
        'past':-5000,
        'future':5000
    }
    var today = Math.floor(Date.now()/secondsInDay);
    var taskday = Math.floor(mill/secondsInDay);
    var tillDay = periods[period];

    if(tillDay>0 && taskday>=today && taskday<today+tillDay){
        return true;
    }else if(tillDay<0 && taskday<=today && taskday>=today+tillDay){
        return true
    }else{
        return false;
        }
}

function isLater(mill){
    var today = Math.floor(Date.now()/secondsInDay)
    var taskday = Math.floor(mill/secondsInDay)
    if(taskday-today>=2){
        return true;
    }else{
        return false;
        }
}

function getDate(mill){
    var date = new Date(mill);
    return date.toLocaleDateString();
};

function getTime(mill){
    var time = new Date(mill);
    var minutes = time.getMinutes()<10?('0'+time.getMinutes()):time.getMinutes()
    return time.getHours() + ':' + minutes;
};

export {isToday,isTomorrow,isLater,getDate,isBackLog,getTime,isThisPeriod};
