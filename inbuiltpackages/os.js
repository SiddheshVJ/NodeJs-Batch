let os = require('os')

console.log() // for space
console.log(os.platform()) // win32
console.log(os.arch()) //x64
console.log(os.cpus().length+ "core") // 4 cores
console.log(os.freemem()) // 2990383104 bytes
console.log(os.uptime()) // 6439.718 sec