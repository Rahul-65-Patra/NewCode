const fs = require('fs');
const http = require('http');
const path = require('path');


const server =  http.createServer((req,res)=>{

    if(req.url ==='/'){
      fs.readFile('./public/index.html','utf-8',(err,data)=>{
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(data);
      })
    }
    else if(req.url === '/about'){

        fs.readFile('./public/about.html','utf-8',(err,data)=>{
          res.writeHead(200,{'Content-Type':'text/html'});
          res.end(data);
        })
    }
    else if(req.url.match("\.css$")){
       var cssPath = path.join(__dirname,"./public",req.url);
       var fileStream = fs.createReadStream(cssPath,'utf-8');
       res.writeHead(200,{"Content-Type":"text/css"})
       fileStream.pipe(res)
    }
    else if(req.url.match('\.js$')){
      var jsPath = path.join(__dirname,'./public',req.url);
      var fileStream = fs.createReadStream(jsPath,'utf-8');
      res.writeHead(200,{'Content-Type':'application/javascript'})
      fileStream.pipe(res)
    }
    else if(req.url.match('\.png$')){
      var imgPath = path.join(__dirname,'/public',req.url);
      var fileStream = fs.createReadStream(imgPath);
      res.writeHead(200,{"Content-Type":"image/png"})
      fileStream.pipe(res)
    } 
    else{
      res.writeHead(404,{'Content-Type':"text/plain"})
      res.end("Page not found")
    }
    console.log(req.url)
})


server.listen(2000,()=>{
  console.log('Server is running at port 2000')
})