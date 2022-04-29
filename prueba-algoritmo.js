const sumPower = (base, exp) => {
  if(exp < 2) throw Error("Exponent must be 2 or higher")
  if(typeof base !== "number") throw Error("Base must be a number")
  if(typeof exp !== "number" || parseInt(exp) !== exp) throw Error("Base must be an integer")

  let output = base
  for (let i = 0; i < exp - 1; i++) {
    let addend = 0
    for (let j = 0; j < base; j++) {
      addend += output
    }
    output = addend
  }

  return output
}

const testSumPower = (base, exp) => {
  const power = sumPower(base, exp)
  const actualPower = base ** exp
  const isCorrect = power === actualPower
  console.log(`${base}^${exp} = ${power} ? ${isCorrect ? "Correct" : "Wrong!! It's " + actualPower}`)
}

testSumPower(2, 2)
testSumPower(2, 3)
testSumPower(2, 4)
testSumPower(3, 2)
testSumPower(3, 3)
testSumPower(2, 5)
testSumPower(2, 10)
testSumPower(3, 5)
testSumPower(3, 8)
testSumPower(4, 10)
testSumPower(5, 8)
testSumPower(8, 5)
testSumPower(10, 10)
testSumPower(50, 10)
