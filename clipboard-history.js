#!/usr/bin/env node
const fs  = require('fs')
const { HOME } = process.env
// flag a: append to file instead of replacing
// see http://stackoverflow.com/questions/3928926/how-to-create-appending-writestream-in-node-js#comment4194111_3929046
const history = fs.createWriteStream(`${HOME}/.clipboard-history`, { flags: 'a'})
const { exec } = require('child_process')
var lastValue

console.log(`starting ${new Date()}`)

const clipboard = function () {
  exec('/usr/bin/xclip -o', (err, value) => {
    if (err) return console.error(err)
    if (value.length > 0 && value !== lastValue) {
      lastValue = value
      history.write(lastValue + '\n')
    }
  })
}

setInterval(clipboard, 500)
