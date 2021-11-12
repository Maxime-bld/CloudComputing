
const express = require('express')
const AWS = require('aws-sdk');
const fs = require('fs');
var bodyParser = require('body-parser');
const s3 = new AWS.S3()
const app = express()
const port = 3000
var rf;
app.get('/', (req, res) => {
  randomNumberGenerator()
  res.render( __dirname  + '/index.html',{pic1:randomNumberArr[0],pic2:randomNumberArr[1],pic3:randomNumberArr[2],pic4:randomNumberArr[3]});
  var p1 = req.query; 
  
  for (const property in p1) {
    console.log(`${property.match(/\((.*)\)/).pop()}`);
    var nbfile=`${property.match(/\((.*)\)/).pop()}`;
    readTxtFile(randomNumberArr[nbfile-1],1);
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
/*app.get('/index.html', function(request, response) {
    var p1 = request.query; 
    response.render( __dirname  + '/index.html',{port:port});
    console.log(request.query);
    for (const property in p1) {
      console.log(`${property.match(/\((.*)\)/).pop()}`);
    }
    response.sendFile( __dirname  + '/index.html',{port:port});
  });

var test=  ("I expect five hundred dollars ($500).").match(/\((.*)\)/).pop();
console.log(test)*/

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
      Bucket: "mybucket199973",
      Key: fileName, // File name you want to save as in S3
      Body: fileContent
  };

  // Uploading files to the bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      
  });
};
function readTxtFile(txt,label){
  var params = {
    Bucket: "mybucket199973",
    Key:txt+".txt"
  
  }
      s3.getObject(params, function (err, data) {
          if (err) {
             // reject(err.message);
          } else {
              rf = Buffer.from(data.Body).toString('utf8');
              console.log(rf)
              var content = rf+label
              console.log(content)
              fs.writeFile(txt+'.txt', content, err => {
                if (err) {
                  console.error(err)
                  return
                }
                console.log("ok")
                uploadFile(txt+".txt")
              })
              
              
              
          }
      });

}
function randomNumberGenerator(){
  rf=20;
  randomNumberArr=[];
  for (let i=0;i<4;){
      const randomNumber=String(Math.floor(Math.random()*rf)+1);
      randomNumberArr.push(randomNumber);
      i++;
  }
}






