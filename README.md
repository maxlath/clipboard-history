# Clipboard history

Make your clipboard history available as a file: `~/.clipboard-history`

## Dependencies
* xclip (possibly only available on Debian/Ubuntu)

## Install
```sh
git clone https://github.com/maxlath/clipboard-history.git
cd clipboard-history
npm start #starts watching changes on your clipboard every 500 ms and writes those on ~/.clipboard-history
```
