import express from "express";
const app = express();


app.use(express.json());            //Informar que aplicação usa JSON, contrario ira retornar null
    const users = []

app.post('/users', (req, res) => {

    const body = req.body
    users.push(body);
    res.status(201).send('usuario criado com sucesso');
});

app.get('/users', (req, res) => {
    res.send({users})
})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
});