const resultado = document.getElementById("result");
const generate_boton = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");

const printChar = (idx, wordArray) => {
  if (wordArray.length === idx) return;
  resultado.textContent = resultado.textContent.substring(1);
  const spanChar = document.createElement("span");
  resultado.appendChild(spanChar);
  animatePrint(spanChar, wordArray[idx]).then(() => {
    printChar(idx + 1, wordArray);
  });
};

const animatePrint = (spanChar, char) => {
  return new Promise((res) => {
    let cambioLetra = 0;
    const intervalo = setInterval(() => {
      if (cambioLetra === 2) {
        clearInterval(intervalo);
        res();
      } else {
        spanChar.innerHTML = char;
        cambioLetra++;
      }
    }, 50);
  });
};

generate_boton.addEventListener("click", () => {
  const char =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNSOPQRSTUVWXYZ()=-*+/?$%#@!^&*_01234567889";
  let password = "";
  for (let I = 0; I <= 18; I++) {
    password += char[Math.floor(Math.random() * char.length)];
  }
  const wordArray = [...password];
  printChar(0, wordArray);
});

clipboard.addEventListener("click", () => {
  if (resultado.textContent !== "Generate a Password") {
    navigator.clipboard.writeText(resultado.textContent);
  }
});
