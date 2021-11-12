
const express = require('express')
const AWS = require('aws-sdk');
const fs = require('fs');
var bodyParser = require('body-parser');
const s3 = new AWS.S3()
const app = express()
const port = 3000
var rf;
var prnumber=[];

app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);
// Intercepte les requêtes
app.get('/', (req, res) => {
  // Générer les nombre aléatoire
  randomNumberGenerator()
  // Passe des argument à la page html
  res.render( __dirname  + '/index.html',{pic1:randomNumberArr[0],pic2:randomNumberArr[1],pic3:randomNumberArr[2],pic4:randomNumberArr[3]});
  var p1 = req.query; 
  var tabfiles=[];
  // Les arguments sont check pour savoir si ils sont a 1
  for (const property in p1) {
    console.log(`${property.match(/\((.*)\)/).pop()}`);
    var nbfile=`${property.match(/\((.*)\)/).pop()}`;
    readTxtFile(prnumber[nbfile-1],1);
    tabfiles.push(nbfile)
  }
  // On rajoute les labels 0
  for (var i = 0; i <= 3; i++) {
    if (tabfiles.includes(i.toString())){
    }
    else{
      readTxtFile(prnumber[i-1],0);
    }
    
  }
  prnumber = randomNumberArr;
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


const uploadFile = (fileName) => {
  // Lis le contenu du fichier
  const fileContent = fs.readFileSync(fileName);

  // Met en place les paramètres de S3
  const params = {
      Bucket: "mybucket199973",
      Key: fileName, // Le nom du fichier à enregistrer S3
      Body: fileContent
  };

  // Upload le fichier dans le bucket
  s3.upload(params, function(err, data) {
      if (err) {
          throw err;
      }
      console.log(`File uploaded successfully. ${data.Location}`);
      
  });
};
// Lis le fichier txt qui va nous servir à labeliser
function readTxtFile(txt,label){
  var params = {
    Bucket: "mybucket199973",
    Key:txt+".txt"
  
  }
    // Récupère l'objet de S3
      s3.getObject(params, function (err, data) {
          if (err) {

            throw err;

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
// Génere 4 nombre aléatoire qui vont faire aparaître les image du bucket S3
function randomNumberGenerator(){
  rf=20;
  randomNumberArr=[];
  randomNumber=0;
  for (let i=0;i<4;){
    do{
      randomNumber=String(Math.floor(Math.random()*rf)+1);
      
    }while(randomNumberArr.includes(randomNumber));
    randomNumberArr.push(randomNumber);
    i++;
  }
}






