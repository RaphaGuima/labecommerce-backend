import { TUsers, TProducts } from "./types";
import { users, products, data2 } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';

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

function testImports(): void {
    console.log("Users:")
    console.log(users)

    console.log("Products:")
    console.log(products)

    console.log("Data de criação:")
    console.log(data2)
}

//testImports()


