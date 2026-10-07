/* Shared cart: slide-out drawer + localStorage. Include on every page AFTER products.js.
   Exposes window.Cart: add, setQty, remove, clear, lines, count, total, open, close. */
(function () {
  var KEY = 'montgomery_cart';
  var money = function (n) { return '$' + n.toFixed(2); };
  var find = function (sku) { return (window.products || []).find(function (p) { return p.sku === sku; }); };
  var unit = function (p) { return typeof p.price === 'number' ? p.price : parseFloat(String(p.price).replace(/[^0-9.]/g, '')) || 0; };
  var imgOf = function (p) { return p.image || 'images/' + p.sku + '/000001.jpg'; };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };

  function read() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(raw) ? raw.filter(function (i) { return i && find(i.sku) && i.quantity > 0; }) : [];
    } catch (e) { return []; }
  }
  function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} render(); }

  var Cart = {
    lines: function () {
      return read().map(function (i) {
        var p = find(i.sku), u = unit(p);
        return { sku: i.sku, quantity: i.quantity, product: p, unit: u, line: u * i.quantity };
      });
    },
    count: function () { return read().reduce(function (s, i) { return s + i.quantity; }, 0); },
    total: function () { return Cart.lines().reduce(function (s, l) { return s + l.line; }, 0); },
    add: function (sku, qty) {
      if (!find(sku)) return;
      var c = read(), hit = c.find(function (i) { return i.sku === sku; });
      if (hit) hit.quantity += qty || 1; else c.push({ sku: sku, quantity: qty || 1 });
      save(c);
    },
    setQty: function (sku, q) {
      var c = read().map(function (i) { if (i.sku === sku) i.quantity = q; return i; }).filter(function (i) { return i.quantity > 0; });
      save(c);
    },
    remove: function (sku) { save(read().filter(function (i) { return i.sku !== sku; })); },
    clear: function () { save([]); },
    open: function () { document.body.classList.add('ma-open'); drawer().setAttribute('aria-hidden', 'false'); },
    close: function () { document.body.classList.remove('ma-open'); drawer().setAttribute('aria-hidden', 'true'); }
  };
  window.Cart = Cart;

  function drawer() { return document.getElementById('ma-drawer'); }

  var CSS = '\
.ma-overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .25s,visibility .25s;z-index:1000}\
.ma-drawer{position:fixed;top:0;right:0;height:100%;width:min(420px,100%);background:#121824;border-left:1px solid rgba(223,178,96,.25);display:flex;flex-direction:column;transform:translateX(100%);visibility:hidden;transition:transform .3s,visibility .3s;z-index:1001;color:#f4f5f7;font-family:"Segoe UI",sans-serif}\
.ma-open .ma-overlay{opacity:1;visibility:visible}\
.ma-open .ma-drawer{transform:none;visibility:visible}\
.ma-head{display:flex;justify-content:space-between;align-items:center;padding:18px 20px;border-bottom:1px solid rgba(223,178,96,.25)}\
.ma-head h2{font-size:1.15rem;color:#dfb260;margin:0}\
.ma-x{background:none;border:0;color:#9ca3af;font-size:1.8rem;line-height:1;cursor:pointer}.ma-x:hover{color:#dfb260}\
.ma-body{flex:1;overflow-y:auto;padding:6px 20px}\
.ma-empty{color:#9ca3af;text-align:center;padding:40px 0}\
.ma-row{display:grid;grid-template-columns:64px 1fr auto;gap:12px;padding:14px 0;border-bottom:1px solid #2a3441;align-items:start}\
.ma-row img{width:64px;height:64px;object-fit:contain;background:#fff;border-radius:4px}\
.ma-t{font-size:.88rem;font-weight:600;line-height:1.3;margin-bottom:4px}\
.ma-u{font-size:.8rem;color:#9ca3af}\
.ma-q{display:inline-flex;align-items:center;gap:4px;margin-top:8px;border:1px solid rgba(223,178,96,.25);border-radius:4px;background:#0b0e14}\
.ma-q button{background:none;border:0;color:#f4f5f7;width:28px;height:28px;font-size:1rem;cursor:pointer}.ma-q button:hover{color:#dfb260}\
.ma-q span{min-width:22px;text-align:center;font-size:.9rem}\
.ma-line{text-align:right;font-weight:700;font-size:.95rem}\
.ma-rm{display:block;margin-top:8px;background:none;border:0;color:#e74c3c;font-size:.78rem;text-decoration:underline;cursor:pointer;margin-left:auto}\
.ma-foot{padding:18px 20px;border-top:1px solid rgba(223,178,96,.25);background:#1a2130}\
.ma-sub{display:flex;justify-content:space-between;font-size:1.1rem;margin-bottom:6px}.ma-sub strong{color:#dfb260}\
.ma-note{font-size:.78rem;color:#9ca3af;margin-bottom:14px}\
.ma-checkout{display:block;text-align:center;background:#dfb260;color:#0b0e14;font-weight:800;padding:13px;border-radius:4px;text-decoration:none}\
.ma-checkout:hover{background:#f3c272}.ma-checkout.is-disabled{background:#333;color:#777;pointer-events:none}\
.ma-open{overflow:hidden}';

  function build() {
    var s = document.createElement('style'); s.textContent = CSS; document.head.appendChild(s);
    var w = document.createElement('div');
    w.innerHTML = '<div class="ma-overlay" data-ma="close"></div>' +
      '<aside class="ma-drawer" id="ma-drawer" role="dialog" aria-label="Shopping cart" aria-hidden="true">' +
      '<div class="ma-head"><h2>Your cart</h2><button class="ma-x" data-ma="close" aria-label="Close cart">&times;</button></div>' +
      '<div class="ma-body" id="ma-body"></div>' +
      '<div class="ma-foot"><div class="ma-sub"><span>Subtotal</span><strong id="ma-total">$0.00</strong></div>' +
      '<p class="ma-note">Tax and shipping are calculated at checkout.</p>' +
      '<a class="ma-checkout" id="ma-checkout" href="checkout.html">Checkout</a></div></aside>';
    while (w.firstChild) document.body.appendChild(w.firstChild);
  }

  function render() {
    var lines = Cart.lines(), n = Cart.count();
    document.querySelectorAll('#cart-counter').forEach(function (el) { el.textContent = n; });
    var body = document.getElementById('ma-body'); if (!body) return;
    body.innerHTML = lines.length ? lines.map(function (l) {
      return '<div class="ma-row"><img src="' + esc(imgOf(l.product)) + '" alt="" onerror="this.src=\'https://placehold.co/64x64/ffffff/000000?text=MA\'">' +
        '<div><div class="ma-t">' + esc(l.product.title) + '</div><div class="ma-u">' + money(l.unit) + ' each</div>' +
        '<div class="ma-q"><button data-ma="dec" data-sku="' + esc(l.sku) + '" aria-label="Decrease quantity">&minus;</button><span>' + l.quantity +
        '</span><button data-ma="inc" data-sku="' + esc(l.sku) + '" aria-label="Increase quantity">+</button></div></div>' +
        '<div><div class="ma-line">' + money(l.line) + '</div><button class="ma-rm" data-ma="rm" data-sku="' + esc(l.sku) + '">Remove</button></div></div>';
    }).join('') : '<div class="ma-empty">Your cart is empty.</div>';
    document.getElementById('ma-total').textContent = money(Cart.total());
    var co = document.getElementById('ma-checkout');
    co.classList.toggle('is-disabled', !lines.length); co.setAttribute('aria-disabled', String(!lines.length));
  }

  function init() {
    build(); render();
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-ma]');
      if (btn) {
        var sku = btn.dataset.sku, line = Cart.lines().find(function (l) { return l.sku === sku; });
        var a = btn.dataset.ma;
        if (a === 'close') Cart.close();
        else if (a === 'inc') Cart.setQty(sku, line.quantity + 1);
        else if (a === 'dec') Cart.setQty(sku, line.quantity - 1);
        else if (a === 'rm') Cart.remove(sku);
        return;
      }
      if (e.target.closest('#cart-button')) { e.preventDefault(); Cart.open(); }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') Cart.close(); });
    window.addEventListener('storage', render); // keeps other open tabs in sync
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
