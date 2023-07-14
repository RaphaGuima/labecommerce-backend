function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const numeroAleatorioEntreZeroEDez = getRndInteger(0, 10)
console.log(numeroAleatorioEntreZeroEDez)

const numeroAleatorioEntreUmENove = getRndInteger(1, 9)
console.log(numeroAleatorioEntreUmENove)

const numeroAleatorioEntreDezEQuinze = getRndInteger(10, 15)
console.log(numeroAleatorioEntreDezEQuinze)