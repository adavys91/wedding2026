const cache = {};

async function showPage(id) {
  // A főoldal már benne van a HTML-ben, csak aktiválni kell
  if (id === 'main') {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-main').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Ha még nincs betöltve, fetch-eljük
  if (!cache[id]) {
    try {
      const res = await fetch(`pages/${id}.html`);
      if (!res.ok) throw new Error(`Nem található: pages/${id}.html`);
      cache[id] = await res.text();
    } catch (e) {
      console.error(e);
      return;
    }
  }

  // Eltávolítjuk a régi dinamikus oldalt, ha volt
  const old = document.getElementById('page-dynamic');
  if (old) old.remove();

  // Beillesztjük az új tartalmat
  const wrapper = document.createElement('div');
  wrapper.id = 'page-dynamic';
  wrapper.innerHTML = cache[id];
  document.body.appendChild(wrapper);

  // Aktiválás
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const newPage = wrapper.querySelector('.page');
  if (newPage) newPage.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Induláskor a főoldal aktív
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('page-main').classList.add('active');
});
