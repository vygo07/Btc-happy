let lastPrice = null;

async function fetchPrice() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await res.json();
    const price = data.bitcoin.usd;
    document.getElementById('price').textContent = price.toLocaleString();

    const emoji = document.getElementById('emoji');
    if (lastPrice !== null) {
      if (price > lastPrice) {
        emoji.textContent = "😊";
        emoji.className = "emoji up";
      } else if (price < lastPrice) {
        emoji.textContent = "😠";
        emoji.className = "emoji down";
      } else {
        emoji.textContent = "😐";
        emoji.className = "emoji neutral";
      }
    }
    lastPrice = price;
  } catch (err) {
    console.error(err);
  }
}

fetchPrice();
setInterval(fetchPrice, 60 * 1000);