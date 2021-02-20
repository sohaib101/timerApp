// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" };
// This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

//const cData = 
// { name: "B", timer: "00:00:00", date: new Date(), event: "S" }  



let db;
let dbReq = indexedDB.open('LOGS', 1);
dbReq.onupgradeneeded = function (event) {

    db = event.target.result;
    var objectStore = db.createObjectStore("LOGDATA", { keyPath: 'LOG', autoIncrement: true });
    objectStore.transaction.oncomplete = function (event) {

    };
}



function addData(obj) {
    let dbReq = indexedDB.open('LOGS', 1);

    dbReq.onsuccess = function (event) {
        db = event.target.result;
        var customerObjectStore = db.transaction("LOGDATA", "readwrite").objectStore("LOGDATA");
        customerObjectStore.add(obj);
    }
    dbReq.onerror = function (event) {
        // alert('error opening database ' + event.target.errorCode);
    }


}

function getData() {
    var Tahours = document.getElementById("t-A-24")
    var Taweek = document.getElementById("t-A-week")
    var Tamonth = document.getElementById("t-A-month")
    Tahours.innerText = "00:00:00"
    Taweek.innerText = "00:00:00"
    Tamonth.innerText = "00:00:00"


    var Tjhours = document.getElementById("t-J-24")
    var Tjweek = document.getElementById("t-J-week")
    var Tjmonth = document.getElementById("t-J-month")
    Tjhours.innerText = "00:00:00"
    Tjweek.innerText = "00:00:00"
    Tjmonth.innerText = "00:00:00"

    var Tehours = document.getElementById("t-E-24")
    var Teweek = document.getElementById("t-E-week")
    var Temonth = document.getElementById("t-E-month")
    Tehours.innerText = "00:00:00"
    Teweek.innerText = "00:00:00"
    Temonth.innerText = "00:00:00"



    let dbReq = indexedDB.open('LOGS', 1);

    dbReq.onsuccess = function (event) {
        db = event.target.result;
        var allRecords = db.transaction("LOGDATA").objectStore("LOGDATA").getAll()
        allRecords.onsuccess = function () {
            var data = allRecords.result
            if (data.length == 0) {
                console.log("no records")
            }
            else {

                // debugger
                console.log(allRecords.result);
                // alert(allRecords.result);
                var A = data.filter(function (el) {
                    return el.name == 'A' &&  el.event == 'END'
                });


                var J = data.filter(function (el) {
                    return el.name == 'J' &&  el.event == 'END'
                });


                var E = data.filter(function (el) {
                    return el.name == 'E' &&  el.event == 'END'
                });


                getA(A)
                getJ(J)
                getE(E)

            }

        };
    }

}

var ONE_HOUR = 60 * 60 * 1000; /* ms */

var ONE_WEEK =  7 * 24 * 60 * 60 * 1000; /* ms */

var ONE_MONTH =  30 * 24 * 60 * 60 * 1000; /* ms */

function getA(arr) {
    // debugger
    var Tahours = document.getElementById("t-A-24")
    var Taweek = document.getElementById("t-A-week")
    var Tamonth = document.getElementById("t-A-month")
    Tahours.innerText = "00:00:00"
    Taweek.innerText = "00:00:00"
    Tamonth.innerText = "00:00:00"


    var hour = arr.filter(function (el) {
        return ((new Date) - el.date) <= ONE_HOUR
    });

    var week = arr.filter(function (el) {
        return ((new Date) - el.date) <= ONE_WEEK
    });

    var days = arr.filter(function (el) {
        return ((new Date) - el.date) <= ONE_MONTH
    });

    if (hour.length == 0) {
        console.log("no A hour")
    }
    else {
        console.log("A hour")
        Tahours.innerText = addTimes(hour)  
    }

    if (hour.length == 0) {
        console.log("no A week")  
    }
    else {
        console.log("A week")
        Taweek.innerText = addTimes(week)
    }

    if (hour.length == 0) {
        console.log("no A days")
    }
    else {
        console.log("A days")
        Tamonth.innerText = addTimes(days)
    }
}
function getJ(arr) {
    var Tjhours = document.getElementById("t-J-24")
    var Tjweek = document.getElementById("t-J-week")
    var Tjmonth = document.getElementById("t-J-month")
    Tjhours.innerText = "00:00:00"
    Tjweek.innerText = "00:00:00"
    Tjmonth.innerText = "00:00:00"

    var hour = arr.filter(function (el) {
        return ((new Date) - el.date) <= ONE_HOUR
    });

    var week = arr.filter(function (el) {
        return ((new Date) - el.date) <= ONE_WEEK
    });

    var days = arr.filter(function (el) {
        return ((new Date) - el.date) <= ONE_MONTH
    });

    if (hour.length == 0) {
        console.log("no A hour")
    }
    else {
        console.log("A hour")
        Tjhours.innerText = addTimes(hour)  
    }

    if (hour.length == 0) {
        console.log("no A week")  
    }
    else {
        console.log("A week")
        Tjweek.innerText = addTimes(week)
    }

    if (hour.length == 0) {
        console.log("no A days")
    }
    else {
        console.log("A days")
        Tjmonth.innerText = addTimes(days)
    }
}
function getE(arr) {
    var Tehours = document.getElementById("t-E-24")
    var Teweek = document.getElementById("t-E-week")
    var Temonth = document.getElementById("t-E-month")
    Tehours.innerText = "00:00:00"
        Teweek.innerText = "00:00:00"
        Temonth.innerText = "00:00:00"

        var hour = arr.filter(function (el) {
            return ((new Date) - el.date) <= ONE_HOUR
        });
    
        var week = arr.filter(function (el) {
            return ((new Date) - el.date) <= ONE_WEEK
        });
    
        var days = arr.filter(function (el) {
            return ((new Date) - el.date) <= ONE_MONTH
        });
    
        if (hour.length == 0) {
            console.log("no A hour")
        }
        else {
            console.log("A hour")
            Tehours.innerText = addTimes(hour)  
        }
    
        if (hour.length == 0) {
            console.log("no A week")  
        }
        else {
            console.log("A week")
            Teweek.innerText = addTimes(week)
        }
    
        if (hour.length == 0) {
            console.log("no A days")
        }
        else {
            console.log("A days")
            Temonth.innerText = addTimes(days)
        }
}
function getcount(arr)
{
    var c_hr = 0
    var c_wk = 0
    var c_dy = 0

    arr.forEach(function (itm) {

        var fields = itm.timer.split(':');
        var hrs = fields[0];
        var week = fields[1];
        var day = fields[2];

        c_hr = c_hr + parseInt(hrs)
        c_wk = c_wk + parseInt(week)
        c_dy = c_dy + parseInt(day)
       
    });

    var str_hr = c_hr.toString()
    var str_wk = c_wk.toString()
    var str_dy = c_dy.toString()


    if (str_hr.length   == 1)
    {
        str_hr =  "0" + str_hr 
    } 
    if (str_wk.length   == 1)
    {
        str_wk =  "0" + str_wk 
    } 
    if (str_dy.length   == 1)
    {
        str_dy =  "0" + str_dy 
    } 

    return { "hr" : str_hr , "wk" : str_wk ,"dy" : str_dy }
   
}

function addTimes(times = []) {

    const z = (n) => (n < 10 ? '0' : '') + n;

    let hour = 0
    let minute = 0
    let second = 0
    for (const time of times) {
        const splited = time.timer.split(':');
        hour += parseInt(splited[0]);
        minute += parseInt(splited[1])
        second += parseInt(splited[2])
    }
    const seconds = second % 60
    const minutes = parseInt(minute % 60) + parseInt(second / 60)
    const hours = hour + parseInt(minute / 60)

    return z(hours) + ':' + z(minutes) + ':' + z(seconds)
}