let promesa = new Promise((resolve, reject) => {
    resolve('Exito al procesar los datos');
})

promesa.then((resultado)=>{
    console.log(resultado);
});

//Función

function printMe() {
  console.log('print me');
}

setTimeout(printMe, 2000);

//Dos
console.log("Primer log");

const miPromesa = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("Tercer log asíncrono");
	}, 2000);
});

miPromesa.then((log) => {
	console.log(log);
});

console.log("Segundo log");

//Tres
"use strict";
 
function asyncSqrt(value, callback) {
    console.log('START execution with value =', value);
    setTimeout(function() {
        callback(value, value * value);
    }, 0 | Math.random() * 100);
}
 
asyncSqrt(2, function(value, result) {
    console.log('END execution with value =', value, 'and result =', result);
});
console.log('COMPLETED ?');

//Control de la ejecución

"use strict";
 
function asyncSqrt(value, callback) {
    console.log('START execution with value =', value);
    setTimeout(function() {
        callback(value, value * value);
    }, 0 | Math.random() * 100);
}
 
var max = 10;
var cnt = 0;
for (var l = 0; l < max; l++) {
    asyncSqrt(l, function(value, result) {
        console.log('END execution with value =', value, 'and result =', result);
        if (++cnt === max) {
            console.log('COMPLETED');
        }
    });
}

//Control con una función
"use strict";
 
function forEachAll(data, each, finish, sync) {
    var n = -1, result = [];
    var next = sync ?
        function () {
            if (++n < data.length) { each(data[n], result, next); }
            else if (finish)       { finish(result); }
        } :
        (function () {
            function completed() {
                if (++n <= data.length && finish) { finish(result); }
            }
            for (var i = 0; i < data.length; i++) { each(data[i], result, completed); }
            return completed;
        }());
    next();
}
 
function asyncSqrt(value, callback) {
    console.log('START execution with value =', value);
    setTimeout(function() {
        callback(value, value * value);
    }, 0 | Math.random() * 100);
}
 
forEachAll([0,1,2,3,4,5,6,7,8,9],
    function(value, allresult, next) {
        asyncSqrt(value, function(value, result) {
            console.log('END execution with value =', value, 'and result =', result);
            allresult.push({value: value, result: result});
            next();
        });
 
    },
    function(allresult) {
        console.log('COMPLETED');
        console.log(allresult);
    },
    true
);

//Promise.all()
"use strict";
 
function promiseSqrt(value){
    return new Promise(function (fulfill, reject){
        console.log('START execution with value =', value);
        setTimeout(function() {
            fulfill({ value: value, result: value * value });
        }, 0 | Math.random() * 100);
    });
}
 
var p = [];
for (var n = 0; n < 10; n++) {
    p.push(promiseSqrt(n, n * 2));
}
Promise.all(p).then(function(results) {
    results.forEach(function(obj) {
        console.log('END execution with value =', obj.value, 'and result =', obj.result);
    });
    console.log('COMPLENTED');
});