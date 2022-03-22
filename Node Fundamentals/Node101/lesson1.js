//This is a module import
const fs = require('fs')

//Functions for operations
const removeFiles = (amount) => {
    setTimeout(() => {
        for(let i = 2; i <= amount; i++){
            fs.unlinkSync(`./txt/textFile${i}.txt`, `textFile: ${i}` )
        }
    }, 3000)
}

const makeApples = (amount) => {
    let string = '';
    for(let i = amount; i <= 1; i--){
        string += " 🍎 "
    }
    return string;
}

const createFiles = (amount) => {
    for(let i = amount; i > 1; i--){
        fs.writeFileSync(`./txt/textFile${i}.txt`, `textFile: ${makeApples(i)}` )
    }
}

/*----------------Synchronous Operations--------------- */

createFiles(5);
removeFiles(5);


/*----------------Asynchronous Operations-------------- */
/*                    NON-BLOCKING                      */
//Asynchronus methods dont use the "sync" keyword. They also use a callback.
 
const readFile = (num) => {
    for(let i = num; i <= num; i++){
    fs.readFile('./txt/textFile1.txt', 'utf-8', (err, data) => {
        console.log(`I came second cause im Asynchronous: ${i} : ${data}`);
    });

    }
}

/*----------------Callback Hell Example---------------- */


fs.readFile('./txt/start.txt', 'utf-8')

