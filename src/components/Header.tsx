import CartBadge from './CartBadge';

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="ShopCart home">
        <span className="brand-mark" aria-hidden="true">s.</span>
        <span>shopcart<span className="brand-period">.</span></span>
      </a>
      <Toolbar />
    </header>
  );
}

function Toolbar() {
  return (
    <nav className="toolbar" aria-label="Main navigation">
      <a href="#catalog">Shop all</a>
      <a href="#about">Our approach</a>
      <a className="cart-nav" href="#cart">
        Bag <CartBadge />
      </a>
    </nav>
  );
}

export default Header;
