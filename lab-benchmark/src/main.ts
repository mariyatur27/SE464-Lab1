import express from 'express';
import expressWs from 'express-ws';
import path from 'path';
import { runTests } from './testing';
import { TestResult } from './types';

const { app } = expressWs(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resultsCache: { [key: string]: TestResult } = {};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/viewResults', (req, res) => {
    const url = req.body.url;
    const id = btoa(url);
    res.redirect(`/viewResults/${id}`);
});

app.get('/viewResults/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'results.html'));
});

app.ws('/results/:id', async (ws, req) => {
    const awsUrl = atob(req.params.id);
    const iterations: number = Number(req.query.iterations) || 1;
    if (resultsCache[awsUrl]) {
        ws.send(JSON.stringify(resultsCache[awsUrl]));
    } else {
        runTests(awsUrl, resultsCache, iterations, ws);
    }

    ws.onmessage = (msg) => {
        const iterations = Number(msg.data);
        runTests(awsUrl, resultsCache, iterations, ws);
    };
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
