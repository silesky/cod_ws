// types
type BinaryChar = '1' | '0';

// constants
const canvasWidth: number = 800;
const canvasHeight: number = 100;

const canvas: HTMLCanvasElement = document.getElementById(
  'app',
) as HTMLCanvasElement;
canvas.setAttribute('width', `${canvasWidth}`);
canvas.setAttribute('height', `${canvasHeight}`);
const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

const convertHexToBinary = (hex: string): string => {
  const hex2bin = (hex: string) =>
    Number.parseInt(hex, 16)
      .toString(2)
      .padStart(8, '0');

  const isEven = n => n % 2 === 0;

  const binaryStr: string = hex.split('').reduce((accum, _, idx) => {
    return isEven(idx)
      ? accum.concat(hex2bin(hex[idx - 1] + hex[idx]))
      : accum;
  }, '');
  return binaryStr;
};

const init: void = (() => {
  const socket: WebSocket = new WebSocket('ws://localhost:8080/');
  socket.onopen = () => console.log('ws opened.');
  socket.onclose = () => console.log('ws closed.');
  socket.onmessage = msg => {
    const bits: string = convertHexToBinary(msg.data);
    draw(bits);
  };
})();

const fillInPixel = (
  [x, y]: [number, number],
  binaryChar: BinaryChar,
): void => {
  ctx.fillStyle = binaryChar === '1' ? 'white' : 'black';
  ctx.fillRect(x, y, 1, 1);
};

const draw = (bits: string): void => {
  let c = 0;
  // normally would avoid using a for loop
  for (var y = 0; y < canvasHeight; y++) {
    for (var x = 0; x < canvasWidth; x++) {
      fillInPixel([x, y], bits[c] as BinaryChar);
      c++;
    }
  }
};
