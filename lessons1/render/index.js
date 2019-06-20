let fs = require('fs')

fs.readFile('package.json',(err,data) => {
  if(!err){
    var main = document.querySelector('.main')
    main.innerHTML = main.innerHTML + data
  }
})