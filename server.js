// // ---------------Exemple Utilisation de HTTP-------------
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3000;

// // Middleware
// app.use(cors());
// //simplifier le traitement des données du corps des requêtes
// app.use(bodyParser.json());

// // Stocker les messages
// const messages = [];

// // Récupérer les messages
// app.get('/getMessages', (req, res) => {
//     res.json(messages);
// });

// // Ajouter un nouveau message
// app.post('/sendMessage', (req, res) => {
//     if(req.body.timerec==null){
//         const { from, message, time, timerec } = req.body;
//         messages.push({ from, message, time, timerec });
//         res.status(200).json({ success: true });
//     }else{
//         messages.map((msg)=>{
//             if(msg.message==req.body.message && msg.time==req.body.time && msg.timerec==null){
//                 msg.timerec=req.body.timerec;
//             }
//         })
//         res.status(200).json({ success: true });
//     }
   
// });

// // Démarrer le serveur
// app.listen(port, () => {
//     console.log(`HTTP server running on http://localhost:${port}`);
// });

//---------------Exemple Utilisation de webSocket-------------

const WebSocket = require('ws');
const port = 3001;

const wss = new WebSocket.Server({ port });

const messages = [];

// Gérer les connexions
wss.on('connection', (ws) => {
    // Envoyer l'historique des messages au nouveau client
    messages.forEach(msg => ws.send(JSON.stringify(msg)));

    // Gérer les messages reçus
    ws.on('message', (data) => {
        const message = JSON.parse(data);
        messages.push(message);

        // Diffuser le message à tous les clients
        wss.clients.forEach(client => {
            // Vérifie que le client est encore connecté et prêt à recevoir des messages
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    });
});

console.log(`WebSocket server running on ws://localhost:${port}`);

