"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = exports.users = exports.data2 = void 0;
// data e hora atual a região
let data = new Date();
// O data.valueOf() irá retornar a data em ms (milissegundos). Então é preciso converter o GMT também em milissegundos: data.getTimezoneOffset() * 60000.
exports.data2 = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
exports.users = [{
        id: "Marilia07",
        name: "Marilia",
        email: "mariliaandrade07@gamil.com",
        password: "andradesma",
        createdAt: exports.data2.toISOString()
    },
    {
        id: "geraldinho55",
        name: "Gerald",
        email: "geraldoo25@yahoo.com",
        password: "betebicho",
        createdAt: exports.data2.toISOString()
    }
];
exports.products = [{
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
    }];
