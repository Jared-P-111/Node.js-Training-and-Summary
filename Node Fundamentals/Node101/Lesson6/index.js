const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`dog.txt`, 'utf-8', (err, data) => {
console.log(data);

   superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, res) => {
        console.log(res.body)

        fs.writeFile('dog-img.txt', res.body.message, err => {
            console.log('Random dog image saved to file');    
        })
    })
})

