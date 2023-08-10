import { TUsers, TProducts } from "./types";
import { users, products, data2 } from "./database";
import express, { Request, Response } from 'express';
import cors from 'cors';
import { knex } from "knex"

export const db = knex({
    client: "sqlite3",
    connection: {
        filename: "./src/database/labcommerce.db", 
    },
    useNullAsDefault: true, 
    pool: {
        min: 0, 
        max: 1,
				afterCreate: (conn: any, cb: any) => {
            conn.run("PRAGMA foreign_keys = ON", cb)
        } 
    }
})

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!");
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

app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users;
        `)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
});

app.get("/products", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM products;
        `)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.post("/users", async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
  
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'ID' precisa ser uma string.");
      }
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'Nome' precisa ser uma string.");
      }
      if (typeof email !== "string") {
        res.status(400);
        throw new Error("'Email' precisa ser uma string.");
      }
      if (typeof password !== "string") {
        res.status(400);
        throw new Error("'Senha' precisa ser uma string.");
      }
  
      const [existingID] = await db("users")
        .select()
        .where("id", "LIKE", `%${id}%`);
  
      if (existingID) {
        throw new Error("'ID' já existe.");
      }
  
      const [existingEmail] = await db("users")
        .select()
        .where("email", "LIKE", `%${email}%`);
  
      if (existingEmail) {
        throw new Error("'Email' já cadastrado.");
      }
  
      const newUser = {
        id: id,
        name: name,
        email: email,
        password: password,
        created_at: data2.toISOString(),
      };
  
      await db("users").insert(newUser);
  
      res.status(201).send("Cadastrado realizado com sucesso!");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send(error.message);
    }
  });

  app.post("/products", async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const name = req.body.name;
      const price = req.body.price;
      const description = req.body.description;
      const imageUrl = req.body.imageUrl;
  
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'ID' precisa ser uma string.");
      }
      if (typeof name !== "string") {
        res.status(400);
        throw new Error("'Nome' precisa ser uma string.");
      }
      if (typeof price !== "number") {
        res.status(400);
        throw new Error("'Preço' precisa ser um número.");
      }
      if (typeof description !== "string") {
        res.status(400);
        throw new Error("'Descrição' precisa ser uma string.");
      }
      if (typeof imageUrl !== "string") {
        res.status(400);
        throw new Error("'Imagem' precisa ser uma string.");
      }
  
      const [existingID] = await db("products")
        .select()
        .where("id", "LIKE", `%${id}%`);
  
      if (existingID) {
        throw new Error("'ID' já existe.");
      }
  
      const newProduct = {
        id: id,
        name: name,
        price: price,
        description: description,
        image_url: imageUrl,
      };
  
      await db("products").insert(newProduct);
      res.status(201).send("Produto cadastrado com sucesso!");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send(error.message);
    }
  });

  app.post("/purchases", async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      const buyer = req.body.buyer;
      const products = req.body.products;
  
      if (typeof id !== "string") {
        res.status(400);
        throw new Error("'ID' precisa ser uma string.");
      }
      if (typeof buyer !== "string") {
        res.status(400);
        throw new Error("'Comprador' precisa ser uma string.");
      }
  
      const [idPurchase] = await db("purchases").select().where({ id: id });
  
      if (idPurchase) {
        res.status(400);
        throw new Error("ID já cadastrada.");
      }
  
      const [buyerResult] = await db("purchases").select().where({ id: buyer });
  
      if (buyerResult) {
        res.status(400);
        throw new Error("Comprador não encontrado.");
      }
  
      const resultProducts = [];
      let totalPrice = 0;
      for (let product of products) {
        const [productId] = await db("products").where({ id: product.id });
  
        if (!productId) {
          res.status(400);
          throw new Error(`${product.id} não encontrado.`);
        }
        resultProducts.push({
          ...product,
          price: productId.price,
          quantity: product.quantity,
        });
      }
      console.table(resultProducts);
  
      for (let product of resultProducts) {
        totalPrice += product.price * product.quantity;
      }
  
      const newPurchase = {
        id,
        buyer,
        total_price: totalPrice,
        created_at: data2.toISOString(),
      };
  
      await db("purchases").insert(newPurchase);
  
      for (let product of products) {
        const newPurchaseProducts = {
          purchase_id: id,
          product_id: product.id,
          quantity: product.quantity,
        };
        await db("purchases_products").insert(newPurchaseProducts);
      }
  
      res.status(201).send("Compra realizada com sucesso.");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send(error.message);
    }
  });

  app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
      const idToDel = req.params.id;
  
      const [purchasesIndex] = await db("purchases").where({ id: idToDel });
      
      if (!purchasesIndex) {
        res.status(404);
        throw new Error("Compra não encontrada.");
      }
     
        await db("purchases").del().where({ id: idToDel });
      
      res.status(200).send("Compra deletada com sucesso!");
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
      res.send(error.message);
    }
  });