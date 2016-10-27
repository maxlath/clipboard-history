#!/usr/bin/env node
const fs  = require('fs')
const { HOME } = process.env
const historyPath = `${HOME}/.clipboard-history`
// flag a: append to file instead of replacing
// see http://stackoverflow.com/questions/3928926/how-to-create-appending-writestream-in-node-js#comment4194111_3929046
const history = fs.createWriteStream(historyPath, { flags: 'a'})
const { exec } = require('child_process')
const maxLines = 10000
var lastValue

const truncateExcessiveLines = require('./truncate_excessive_lines')

console.log(`starting ${new Date()}`)

const clipboard = function () {
  exec('/usr/bin/xclip -o', (err, value) => {
    if (err) return console.error(new Date(), err)
    if (value.length > 0 && value !== lastValue) {
      lastValue = value
      history.write(lastValue + '\n')
    }
  })
}

const init = () => setInterval(clipboard, 500)

// Truncate excessive lines, then init
truncateExcessiveLines(historyPath, maxLines, init)
