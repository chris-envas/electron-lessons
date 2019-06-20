var fs=require('fs');

var content=document.getElementsByTagName('body')[0]


content.ondragenter=content.ondragover=content.ondragleave=function(){
    return false; /*阻止默认行为*/
}


content.ondrop=function(e){

    //阻止默认行为

    e.preventDefault();     

    console.log(e.dataTransfer.files[0]);

    var path=e.dataTransfer.files[0].path;
    fs.readFile(path,'utf-8',(err,data)=>{

        if(err){

            console.log(err);

            return false;
        }
        content.innerHTML=data;
    })
}


