#!/usr/bin/env node
// conversor.js
// Uso: node conversor.js <valor> <origem> <destino>
// Ex.: node conversor.js 10 km milhas
//      node conversor.js 50 celsius fahrenheit

const args = process.argv.slice(2);
if (args.length !== 3) {
  console.log('Uso: node conversor.js <valor> <unidade_origem> <unidade_destino>');
  process.exit(1);
}

const [valorStr, origemRaw, destinoRaw] = args;
const valor = Number(valorStr);
if (Number.isNaN(valor)) {
  console.error('Erro: <valor> deve ser numérico.');
  process.exit(1);
}

const norm = s => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

const origem = norm(origemRaw);
const destino = norm(destinoRaw);

const round = n => Math.round(n * 100) / 100;

function convert(v, from, to) {
  // Distância
  const isKm = ['km','quilometro','quilometros','quilometro(s)','quilometros(s)'].includes(from);
  const isMi = ['milha','milhas','mi'].includes(from);

  if (isKm && ['milha','milhas','mi'].includes(to)) return v * 0.621371;      // km -> mi
  if (isMi && ['km','quilometro','quilometros'].includes(to)) return v / 0.621371; // mi -> km

  // Temperatura
  const isC = ['c','celsius','graus c','grausc','graus celsius'].includes(from);
  const isF = ['f','fahrenheit','graus f','grausf'].includes(from);

  if (isC && ['f','fahrenheit','graus f','grausf'].includes(to)) return (v * 9/5) + 32; // C -> F
  if (isF && ['c','celsius','graus c','grausc','graus celsius'].includes(to)) return (v - 32) * 5/9; // F -> C

  throw new Error(`Conversão não suportada: ${from} -> ${to}`);
}

let convertido;
try {
  convertido = convert(valor, origem, destino);
} catch (e) {
  console.error(e.message);
  process.exit(1);
}

function labelDist(u) {
  if (['km','quilometro','quilometros'].includes(u)) return 'quilômetros';
  if (['milha','milhas','mi'].includes(u)) return 'milhas';
  return u;
}
function labelTemp(u) {
  if (['c','celsius','graus c','grausc','graus celsius'].includes(u)) return 'graus Celsius';
  if (['f','fahrenheit','graus f','grausf'].includes(u)) return 'graus Fahrenheit';
  return u;
}
function label(u) {
  // tenta distância, senão temperatura
  if (['km','quilometro','quilometros','milha','milhas','mi'].includes(u)) return labelDist(u);
  return labelTemp(u);
}

const origemLabel = label(origem);
const destinoLabel = label(destino);

console.log(`${valor} ${origemLabel} é igual a ${round(convertido)} ${destinoLabel}.`);
