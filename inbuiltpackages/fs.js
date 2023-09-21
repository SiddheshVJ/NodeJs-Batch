let fs = require("fs")

/*fs.writeFile("Employee.txt", "Hello world", (err) => {
    if (err) throw err;
    console.log("Writing done")
})
*/

fs.appendFile("employee.txt", " Hello from siddhesh", (err) => {
    if (err) throw err;
    console.log("Appending done")
})

fs.readFile('employee.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data)
})