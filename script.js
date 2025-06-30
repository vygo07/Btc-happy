let lastPrice = null;
let priceEl = document.getElementById('price');
let emoji = document.getElementById('emoji');
let arrow = document.getElementById('arrow');

async function fetchPrice() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {cache: "no-store"});
    const data = await res.json();
    const price = data.bitcoin.usd;

    // Pokud cena nezměněna, nemusíme nic měnit, jen ukázat stále stejné hodnoty
    if (price === lastPrice) {
      arrow.style.opacity = '0';
      return;
    }

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
      }
    } else {
      // První načtení, smajlík neutrální a barva bílá
      emoji.textContent = '😐';
      emoji.className = 'emoji neutral';
      priceEl.style.color = '#fff';
      arrow.style.opacity = '0';
    }

    // Pomalu přechod zpět na bílou barvu za 1.5s (rychlejší než předtím)
    setTimeout(() => {
      priceEl.style.color = '#fff';
    }, 1500);

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

fetchPrice();
setInterval(fetchPrice, 1000);  // každou sekundu