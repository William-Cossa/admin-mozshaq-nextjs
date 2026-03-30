/**
 * Gera automaticamente um URL de avatar via ui-avatars.com
 * usando uma cor de fundo aleatória entre 10 cores predefinidas.
 */

const AVATAR_COLORS = [
  "E85D04", // laranja vivo
  "F48C06", // âmbar
  "0D8ABC", // azul
  "7B2FBE", // roxo
  "2D6A4F", // verde escuro
  "52B788", // verde claro
  "8B4513", // castanho
  "D62828", // vermelho
  "0077B6", // azul marinho
  "9B2226", // bordô
];

export function generateAvatarUrl(name: string): string {
  const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  const encodedName = encodeURIComponent(name.trim());
  return `https://ui-avatars.com/api/?name=${encodedName}&background=${color}&color=fff`;
}
