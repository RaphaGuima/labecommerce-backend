import { TUsers, TProducts } from "./types";
import { users, products, data2 } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { privateDecrypt } from "crypto";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/product", (req: Request, res: Response) => {
    const name = req.query.name as string

    if (!name) {
        return res.status(200).send(products)
    }
    const result = products.filter((product) => product.name.includes(name))
    if (result.length === 0) {
        return res.status(404).send("Nenhum produto encontrado")
    }

    res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response) => {
    const id = req.query.id as string;
    const name = req.query.name as string;
    const email = req.query.email as string;
    const password = req.query.password as string;

    const createdAt: string = new Date().toISOString();

    const newUser: TUsers = { 
        id,
        name,
        email,
        password,
        createdAt
    };

    users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});

app.post("/products", (req: Request, res: Response) => {
    const id = req.query.id as string;
    const name = req.query.name as string;
    const price = parseFloat(req.query.price as string)
    const description = req.query.description as string;
    const imageUrl = req.query.imageUrl as string;

    const newProduct: TProducts = { 
        id,
        name,
        price,
        description,
        imageUrl,
    }

    products.push(newProduct);
    res.status(201).send("Cadastro realizado com sucesso");
});

app.delete("/users/:id", (req: Request, res: Response)=>{
    const idToDelete = req.params.id
    const userIndex = users.findIndex((user)=> user.id === idToDelete)
    if (userIndex >= 0){
        users.splice(userIndex, 1)
    }
    res.status(200).send("User apagado com sucesso")
})

app.delete("/products/:id", (req: Request, res: Response)=>{
    const idToDelete = req.params.id
    const productIndex = products.findIndex((product)=> product.id === idToDelete)
    if (productIndex >= 0){
        users.splice(productIndex, 1)
    }
    res.status(200).send("Produto apagado com sucesso")
})

app.put("/products/:id", (req: Request, res: Response)=>{
    const idToFind = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.url as string | undefined
    
    const product = products.find((product)=> product.id === idToFind)

    if(product){
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }
    res.status(200).send("Produto atualizado com sucesso")
})

function testImports(): void {
    console.log("Users:")
    console.log(users)

    console.log("Products:")
    console.log(products)

    console.log("Data de criação:")
    console.log(data2)
}

//testImports()


