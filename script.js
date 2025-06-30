let lastPrice = null;
let priceEl = document.getElementById('price');
let emoji = document.getElementById('emoji');
let arrow = document.getElementById('arrow');

async function fetchPrice() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const data = await res.json();
    const price = data.bitcoin.usd;
    priceEl.textContent = price.toLocaleString();

    if (lastPrice !== null) {
      if (price > lastPrice) {
        // Růst
        priceEl.style.color = '#00ff00';
        emoji.textContent = '😊';
        emoji.className = 'emoji up';

        arrow.textContent = '▲';
        arrow.className = 'arrow up';
        arrow.style.opacity = '1';
        fadeOutArrow();
      } else if (price < lastPrice) {
        // Pokles
        priceEl.style.color = '#ff3300';
        emoji.textContent = '😠';
        emoji.className = 'emoji down';

        arrow.textContent = '▲';
        arrow.className = 'arrow down';
        arrow.style.opacity = '1';
        fadeOutArrow();
      } else {
        // Beze změny
        emoji.textContent = '😐';
        emoji.className = 'emoji neutral';

        arrow.style.opacity = '0';
        priceEl.style.color = '#fff';
      }
    }

    // Pomalu přechod zpět na bílou barvu za 3s
    setTimeout(() => {
      priceEl.style.color = '#fff';
    }, 3000);

    lastPrice = price;
  } catch (err) {
    console.error('Chyba při načítání ceny:', err);
  }
}

function fadeOutArrow() {
  setTimeout(() => {
    arrow.style.opacity = '0';
  }, 3000);
}

// Start aktualizace
fetchPrice();
setInterval(fetchPrice, 3000);