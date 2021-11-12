
const express = require('express')
const AWS = require('aws-sdk');
const fs = require('fs');
const s3 = new AWS.S3()
const app = express()
const port = 3000
var rf;
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/index.html', function(request, response) {
    var p1 = request.query; 
    console.log(request.query);
    for (const property in p1) {
      console.log(`${property.match(/\((.*)\)/).pop()}`);
    }
    response.sendFile( __dirname  + '/index.html');
  });

var test=  ("I expect five hundred dollars ($500).").match(/\((.*)\)/).pop();
console.log(test)

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
              //reject(err.message);
          } else {
              rf = Buffer.from(data.Body).toString('utf8');
              console.log(rf)
              var content = rf+label
              console.log(content)
              fs.writeFile('D:/Fise3/Cloud/CloudComputing/nodeapp/'+txt+'.txt', content, err => {
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
readTxtFile(1,0)
readTxtFile(2,1)
readTxtFile(3,0)
readTxtFile(4,1)



