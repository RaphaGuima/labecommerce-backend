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
    try {
        res.status(200).send(users)
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

app.get("/products", (req: Request, res: Response) => {
    try {
        const name = req.query.name as string;

        if (!name || name.trim().length === 0) {
            throw new Error("O parâmetro 'name' deve possuir pelo menos um caractere.");
        }

        const result = products.filter((product) => product.name.includes(name));
        res.status(200).send(result);
    } catch (error: any) {
        res.status(400).send({ error: error.message });
    }
});


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
    try {
        const id = req.query.id as string;
        const name = req.query.name as string;
        const email = req.query.email as string;
        const password = req.query.password as string;

        if (users.some(user => user.id === id)) {
            throw new Error("Já existe um usuário com este ID")
        }
        if (users.some(user => user.email === email)) {
            throw new Error("Já existe um usuário com esse e-mail")
        }

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
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
});

app.post("/products", (req: Request, res: Response) => {
    try {
        const id = req.query.id as string;
        const name = req.query.name as string;
        const price = parseFloat(req.query.price as string)
        const description = req.query.description as string;
        const imageUrl = req.query.imageUrl as string;

        if (products.some(product => product.id === id)) {
            throw new Error("Já existe um produto com essa ID.");
        }

        const newProduct: TProducts = {
            id,
            name,
            price,
            description,
            imageUrl,
        }

        products.push(newProduct);
        res.status(201).send("Cadastro realizado com sucesso");
    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
});

app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id;
        const userIndex = users.findIndex((user) => user.id === idToDelete);

        if (userIndex === -1) {
            res.status(404).send("Usuário não encontrado");
            return;
        }

        users.splice(userIndex, 1);
        res.status(200).send("Usuário apagado com sucesso");
    } catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});


app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id;
        const productIndex = products.findIndex((product) => product.id === idToDelete);

        if (productIndex === -1) {
            res.status(404).send("Produto não encontrado");
            return;
        }

        products.splice(productIndex, 1);
        res.status(200).send("Produto apagado com sucesso");
    } catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
});



app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const idToFind = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.url as string | undefined

    const product = products.find((product) => product.id === idToFind)

    if (product) {
        product.id = newId || product.id
        product.name = newName || product.name
        product.price = newPrice || product.price
        product.description = newDescription || product.description
        product.imageUrl = newImageUrl || product.imageUrl
    }
    res.status(200).send("Produto atualizado com sucesso")
    }  catch (error: any) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        res.send(error.message);
    }
    
})




