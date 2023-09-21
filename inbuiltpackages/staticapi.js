let fs = require('fs')
let http = require('http')

let server = http.createServer((req, res) => {
    fs.readFile('employee.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        res.write(data) 
        
        res.end()
    })
}).listen(3113)