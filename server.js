const net = require('net');
const fs = require('fs');


const server = net.createServer((request) => {


  request.on('data', (data) => {
    let filePath;
    let fileType;
    data = data.toString();
    data = data.split('/');

    data = data[1].split(' ');
    console.log(data);
    if(data[0] === 'css'){
      filePath = './css/style.css';
      fileType = 'css';
    } else  if(data[0] === 'hydrogen.html' || data[0] === 'hydrogen'){
      filePath = 'hydrogen.html';
      fileType = 'html';
    } else if(data[0] === 'helium.html' || data[0] === 'helium'){
      filePath = 'helium.html';
      fileType = 'html';
    } else if(data[0] === ''){
      filePath = 'index.html';
      fileType = 'html';
    } else {
      filePath = '404.html';
      fileType = 'html';
    }


    // switch (data[0]){
    //   case 'css':
    //     filePath = './css/style.css';
    //     fileType = 'css';
    //     break;
    //   case 'hydrogen.html' || 'hydrogen':
    //     filePath = 'hydrogen.html';
    //     fileType = 'html';
    //     break;
    //   case 'helium.html' || 'helium':
    //     filePath = 'helium.html';
    //     fileType = 'html';
    //     break;
    //   case '':
    //     filePath = 'index.html';
    //     fileType = 'html';
    //     break;
    //   default:
    //     filePath = '404.html';
    //     fileType = 'html';

    // }


    fs.readFile(filePath, (err, file) => {
      if (err){
        console.error(err);
      } else {
        request.write('HTTP/1.1 200 OK');
        request.write('\n');
        request.write('Content-Type: text/' + fileType + '; charset=utf-8 \n');
        request.write('Status: 200 \n');
        request.write('\n');
        request.write(file.toString());
      }
        request.end();
    });

    //console.log(htmlData);
    //request.write(file.toString());
    //request.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>HTTP-Socket-Server</title></head><body><h1>HTTP-Socket-Server</h1></body></html>');

  });

  request.on('end', () => {
    console.log('connection terminated');
  });


});



server.listen({ port: 8080, host: '0.0.0.0'}, () => {
  const address = server.address();
  console.log(`Opened server on ${address.port}`);
});