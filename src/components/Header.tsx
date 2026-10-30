import CartBadge from './CartBadge';

interface HeaderProps {
  itemCount: number;
}

function Header({ itemCount }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="ShopCart home">
        <span className="brand-mark" aria-hidden="true">s.</span>
        <span>shopcart<span className="brand-period">.</span></span>
      </a>
      <Toolbar itemCount={itemCount} />
    </header>
  );
}

function Toolbar({ itemCount }: HeaderProps) {
  return (
    <nav className="toolbar" aria-label="Main navigation">
      <a className="cart-nav" href="#cart">
        Bag <CartBadge itemCount={itemCount} />
      </a>
    </nav>
  );
}

export default Header;
