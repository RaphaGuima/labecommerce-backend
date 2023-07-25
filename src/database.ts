import { TUsers, TProducts } from "./types"


let data = new Date();


export let data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);

export function creatUser(id: string, name: string, email: string, password: string): string {
    const createdAt: string = new Date().toDateString()

    const newUser: TUsers = {
        id: id,
        name: name,
        email: email,
        password: password,
        createdAt: createdAt,
    }
    users.push(newUser)
    return "cadastro realizado com sucesso"
}

creatUser("u003", "Astrodev", "astrodev@email.com", "astrodev99")

export function getAllUsers(): TUsers[] {
    return users
}
export const allUsers = getAllUsers()

export function createProduct(id: string, name: string, price: number, desciption: string, imageUrl: string) {
    const newProduct: TProducts = {
        id: id,
        name: name,
        price: price,
        desciption: desciption,
        imageUrl: imageUrl,
    }
    products.push(newProduct)
    return ("Produto criado com sucesso")
}
createProduct("prdo003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://www.google.com/search?client=opera-gx&hs=vjf&sxsrf=AB5stBjDLQRtDzeyp8Y65F0wQSjknZtuHw:1690286819264&q=ssd+gamer&tbm=isch&source=lnms&sa=X&ved=2ahUKEwij3riL6amAAxVPs5UCHX70D0oQ0pQJegQICxAB&biw=1325&bih=627&dpr=1#imgrc=5QMLN-mcBxMBuM")

export function getAllProducts(): TProducts[] {
    return products
}
export const allProducts = getAllProducts()

export function searchProductsByName(name: string): TProducts[] {
    const searchTerm = name.toLowerCase();
    const foundProducts: TProducts[] = [];
  
    products.forEach((product) => {
      const productName = product.name.toLowerCase();
      if (productName.includes(searchTerm)) {
        foundProducts.push(product);
      }
    });
  
    return foundProducts;
  }
  

const searchResult = searchProductsByName("gamer")
console.log(searchResult)

export const users: TUsers[] = [{
    id: "Marilia07",
    name: "Marilia",
    email: "mariliaandrade07@gamil.com",
    password: "andradesma",
    createdAt: data2.toISOString()
},
{
    id: "geraldinho55",
    name: "Gerald",
    email: "geraldoo25@yahoo.com",
    password: "betebicho",
    createdAt: data2.toISOString()
}
]

export const products: TProducts[] = [{
    id: "bolsa12",
    name: "Bolsa Constance",
    price: 449.99,
    desciption: "Nossa mais nova bolsa lançada pós a linha Constance Advenced",
    imageUrl: "https://www.google.com/search?client=opera-gx&hs=yqZ&hl=pt-BR&sxsrf=AB5stBgQKzuh8qVNPIzgVnPp4ue_ldu7kw:1689390352183&q=bolsa+constance+lançada+recentemente&tbm=isch&sa=X&ved=2ahUKEwiBpNC-3Y-AAxV0rZUCHU7uADIQ0pQJegQICxAB&biw=925&bih=927&dpr=1#imgrc=GhTvZwQ1XWKtJM"
},
{
    id: "Galo na Veia",
    name: "Camisa Atletico Mineirao 2023/2",
    price: 299.99,
    desciption: "Lançamentos das novas camisas do clube Atletico Mineiro para a segunda fase de 2023",
    imageUrl: "https://www.google.com/search?q=camisa+atletico+mineiro+2023%2F2&tbm=isch&ved=2ahUKEwjX29rB3Y-AAxV0qJUCHdfeDocQ2-cCegQIABAA&oq=camisa+atletico+mineiro+2023%2F2&gs_lcp=CgNpbWcQAzoECCMQJzoHCAAQigUQQzoFCAAQgAQ6CAgAEIAEELEDOggIABCxAxCDAToNCAAQigUQsQMQgwEQQzoKCAAQigUQsQMQQzoECAAQAzoECAAQHjoGCAAQBRAeOgcIABAYEIAEUM8HWIFFYIRIaABwAHgAgAHEAYgBvxySAQQwLjMxmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=Fg2yZNf4JvTQ1sQP1727uAg&bih=927&biw=925&client=opera-gx&hs=yqZ&hl=pt-BR#imgrc=dXDVwTFzqWs5qM"
}]