// Toggle side menu
document.getElementById('shopping-card').addEventListener('click', () => {
  document.getElementById('shopping-side-menu').classList.toggle('active');
});

// Broj u košarici
function setShopIconCount() {
  const countCircle = document.getElementById('shopping-count');
  let totalCount = 0;
  document.querySelectorAll('#shopping-side-menu .shopping-item .amount-box p').forEach(p => {
    totalCount += parseInt(p.textContent);
  });
  countCircle.textContent = totalCount;
}

// Dodavanje pizze
document.querySelectorAll('article button.pizza-button').forEach(button => {
  button.addEventListener('click', (e) => {
    const pizzaCard = e.currentTarget.parentElement;
    const pizzaName = pizzaCard.querySelector('h3').textContent;
    const pizzaPrice = pizzaCard.querySelector('span > em').textContent;

    const pizzaData = { name: pizzaName, price: pizzaPrice };

    createNewShopItem(pizzaData);
  });
});

function createNewShopItem(pData) {
  const pizzaId = pData.name.toLowerCase();
  let existingItem = document.getElementById(pizzaId);

  if (existingItem) {
    let qty = existingItem.querySelector('.amount-box p');
    qty.textContent = parseInt(qty.textContent) + 1;
  } else {
    const shopItem = document.createElement('div');
    shopItem.classList.add('shopping-item');
    shopItem.setAttribute('id', pizzaId);

    shopItem.innerHTML = `
      <h3>${pData.name}</h3>
      <div class="description">
        <div class="cijena">
          <small>Cijena:</small>
          <p>${pData.price}</p>
        </div>
        <div class="kolicina">
          <small>Količina:</small>
          <div class="amount-box">
            <button class="minus">-</button>
            <p>1</p>
            <button class="plus">+</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('side-menu-items').appendChild(shopItem);

    // plus/minus gumbi
    shopItem.querySelector('.minus').addEventListener('click', () => {
      let qty = shopItem.querySelector('.amount-box p');
      if (parseInt(qty.textContent) > 1) qty.textContent = parseInt(qty.textContent) - 1;
      else shopItem.remove();
      setShopIconCount();
      calculateTotalPrice();
    });
    shopItem.querySelector('.plus').addEventListener('click', () => {
      let qty = shopItem.querySelector('.amount-box p');
      qty.textContent = parseInt(qty.textContent) + 1;
      setShopIconCount();
      calculateTotalPrice();
    });
  }

  setShopIconCount();
  calculateTotalPrice();
}

function calculateTotalPrice() {
  let total = 0;
  document.querySelectorAll('#shopping-side-menu .shopping-item').forEach(item => {
    const price = parseFloat(item.querySelector('.cijena p').textContent.replace(',', '.'));
    const qty = parseInt(item.querySelector('.amount-box p').textContent);
    total += price * qty;
  });
  document.querySelector('#side-menu-action em').textContent = total.toFixed(2);
}

// Slanje narudžbe
const naruciForm = document.querySelector('#side-menu-action form');
const narudzbaInput = document.getElementById('narudzba-input');

naruciForm.addEventListener('submit', function(e) {
  const items = document.querySelectorAll('#side-menu-items .shopping-item');
  if (items.length === 0) {
    e.preventDefault();
    alert("Košarica je prazna!");
    return;
  }

  let narudzbaArray = [];
  items.forEach(item => {
    narudzbaArray.push({
      name: item.querySelector('h3').textContent,
      price: item.querySelector('.cijena p').textContent,
      quantity: item.querySelector('.amount-box p').textContent
    });
  });

  narudzbaInput.value = JSON.stringify(narudzbaArray);
});