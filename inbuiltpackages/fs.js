let fs = require("fs")

fs.writeFileSync('employee.txt', 'We are using express', (err) => {
    if (err) throw err;
    console.log("Task done")

    // this writeFileSync will override the existing text from file and write new text
})