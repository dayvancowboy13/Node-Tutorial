const fs = require('fs');

// reading files 

// fs.readFile('./modules.js', 'utf-8', (err, data) => {
//     if(err)
//         console.log(err);
//     console.log(data);
// });

// console.log("Hello :)")

// write file
// fs.writeFile('./blog.txt', 'helloooooo world!', 
//     ()=>{
//         console.log('File was written...');
//     });

// fs.writeFile('./blog2.txt', 'hello again, world!', 
//     ()=>{
//         console.log('File was written...');
//     });

// directories
if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err) => {
        if(err) {
            console.log(err);
        }
        console.log('folder created...');
    })
} else {
    fs.rmdir('./assets', (err) =>{
        if(err){
            console.log(err);
        }
        console.log('folder deleted...')
    })
}

// delete a file

if(fs.existsSync('./delete_me.txt')){
    fs.unlink('./delete_me.txt', (err) =>{
        if(err){
            console.log(err);
        }
        console.log('file deleted');
    })
}  else {
    console.log("File doesn't exist...");
}