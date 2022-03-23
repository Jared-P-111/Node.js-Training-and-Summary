//Here we import the filesystem from Node.js 
const fs = require('fs');

//This writesFiles Asynchronously 
const writeFiles = (num) => {
    let apples = "";
    for(let i = 1; i <= num; i++){
        apples += " 🍎 ";
        fs.writeFile(`./txt/Async-text_file-${i}`,
            `This text file: ${i} it gets ${i} --> ${apples}`, 'utf-8', () => {})
    }
}

writeFiles(4);

//This deletesFiles Asynchronously
const deleteFiles = (num) => {
    setTimeout(() => {
        for(let i = num; i > 0; i--){
            fs.unlink(`./txt/Async-text_file-${i}`, () => {})
        }
    }, 6000)
}

deleteFiles(4);