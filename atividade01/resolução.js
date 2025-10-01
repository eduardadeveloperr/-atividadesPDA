const usuarios = [
  {
    nome: "Carlos",
    idade: 28,
    email: "carlos@exemplo.com",
    cidade: "São Paulo",
    interesses: ["Música", "Tecnologia", "Fotografia"]
  },
  {
    nome: "Beatriz",
    idade: 22,
    email: "beatriz@exemplo.com",
    cidade: "Rio de Janeiro",
    interesses: ["Viagens", "Leitura", "Cinema"]
  }
];

/* 
Desafio 1: Usar destructuring para extrair apenas 
nome e cidade do primeiro usuário do array 
*/
const { nome, cidade } = usuarios[0];
console.log("Usuário:", nome, "Cidade:", cidade);

/* 
Desafio 2: Criar um novo array copiando todos os usuários originais 
e adicionando um novo usuário com spread operator 
*/
const usuariosDoNorte = [
  ...usuarios,
  {
    nome: "Ana",
    idade: 25,
    email: "ana@exemplo.com",
    cidade: "Manaus",
    interesses: ["Natureza", "Artesanato"]
  }
];
console.log("Usuarios do Norte:", usuariosDoNorte);

/* 
Desafio 3: Criar um novo objeto para Beatriz, 
copiando todos os dados originais e alterando apenas o email 
*/
const beatrizAtualizada = {
  ...usuarios[1],        // copia todas as propriedades do objeto original
  email: "bia.dev@exemplo.com" // sobrescreve apenas o email
};
console.log("Beatriz Atualizada:", beatrizAtualizada);

/* 
Desafio 4: Criar uma função que receba um usuário 
e use destructuring para extrair nome e interesses. 
Depois, imprimir uma frase listando os interesses desse usuário.
*/
function mostrarInteresses({ nome, interesses }) {
  console.log(nome, "tem interesse em:", interesses.join(", "));
}

// Testando a função
mostrarInteresses(usuarios[0]);
mostrarInteresses(beatrizAtualizada);
