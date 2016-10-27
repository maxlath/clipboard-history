const fs  = require('fs')

module.exports = function (historyPath, maxLines, cb) {
  console.log(`checking that file doesn't exceed ${maxLines} lines`)
  fs.readFile(historyPath, (err, res) => {
    if (err) return console.error(new Date(), 'err reading', err)
    const lines = res.toString().split('\n')
    if (lines.length > maxLines) {
      console.log('truncating...')
      const truncatedFile = lines.slice(-maxLines, -1).join('\n')
      fs.writeFile(historyPath, truncatedFile, (err, res) => {
        if (err) return console.error(new Date(), 'err truncating', err)
        console.log('truncated!')
        cb()
      })
    } else {
      console.log(`nop, only ${lines.length}`)
      cb()
    }
  })
}
