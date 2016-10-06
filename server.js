const net = require('net');
const fs = require('fs');


const server = net.createServer((request) => {


  request.on('data', (data) => {
    let filePath;
    let fileType;
    let status;
    let statusString;
    let fileSize;
    data = data.toString();
    data = data.split('/');

    data = data[1].split(' ');
    if(data[0] === 'css'){
      filePath = './css/style.css';
      fileType = 'css';
      status = '200';
      statusString = ' OK';
    } else  if(data[0] === 'hydrogen.html' || data[0] === 'hydrogen'){
      filePath = 'hydrogen.html';
      fileType = 'html';
      status = '200';
      statusString = ' OK';
    } else if(data[0] === 'helium.html' || data[0] === 'helium'){
      filePath = 'helium.html';
      fileType = 'html';
      status = '200';
      statusString = ' OK';
    } else if(data[0] === ''){
      filePath = 'index.html';
      fileType = 'html';
      status = '200';
      statusString = ' OK';
    } else {
      filePath = '404.html';
      fileType = 'html';
      status = '404';
      statusString = ' Not Found';
    }
    fs.readFile(filePath, (err, file) => {
      if (err){
        console.error(err);
      } else {
        fileSize = file.length;
        request.write('HTTP/1.1 ' + status + statusString);
        request.write('\n');
        request.write('Content-Type: text/' + fileType + '; charset=utf-8 \n');
        request.write('Status: ' + status +'\n');
        request.write('Content-Length: '+ fileSize + '\n');
        request.write('\n');
        request.write(file.toString());
      }
        request.end();
    });

  });

  request.on('end', () => {
    console.log('connection terminated');
  });


});



server.listen({ port: 8080, host: '0.0.0.0'}, () => {
  const address = server.address();
  console.log(`Opened server on ${address.port}`);
});