const http = require('http');

const data = [
    {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net",
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "Julianne.OConner@kory.org",
  },
]

const onRequest = (req, res) =>{

    const segments = req.url.split('/').filter(segment => segment !== '');
    const method = req.method;

    if (segments.length === 0) {
        res.end('hello word');
        return;
    }

     switch(segments[0]) {
        case 'about':
            res.end('this is about');
            return;
        case 'people':
            if (segments.length === 1) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
                return;
            } else if (segments.length === 2) {
                const id = parseInt(segments[1], 10);
                switch(method) {
                    case 'GET':
                        const person = data.find(p => p.id === id);
                        if (person) {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify(person));
                        } else {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('Person not found');
                        }
                        return;
                    case 'DELETE':
                        const initialLength = data.length;
                        data = data.filter(p => p.id !== id);
                        if (data.length < initialLength) {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Person deleted');
                        } else {
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end('Person not found');
                        }
                        return;
                    default:
                        res.writeHead(405, { 'Content-Type': 'text/plain' });
                        res.end('Method Not Allowed');
                        return;
                }
            }
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            return;
    }
    res.writeHead(200)
    res.end('hello word')
}

const server = http.createServer(onRequest)

server.listen(8000, 'localhost', ()=>console.log('Server is Running'))

//get list people : /people
//get detail people : /people/1
//delete people :  /people/1