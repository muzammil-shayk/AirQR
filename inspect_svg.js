const QRCode = require('qrcode');

async function test() {
  const svg = await QRCode.toString('test', { type: 'svg', margin: 4 });
  console.log(svg);
}

test();
