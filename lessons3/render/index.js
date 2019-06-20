const { clipboard } = require('electron')

clipboard.writeText('Example String')

let copyInput = document.querySelector('#copyInput')
let paste = document.querySelector('#paste')

paste.addEventListener('click', function() {
    if (copyInput.value !== '') copyInput.value = ''
    copyInput.value = clipboard.readText()
})

