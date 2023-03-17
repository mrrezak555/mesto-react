import logo from '../images/logo.svg'


function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Лого Место" className="header__logo" />
    </header>
  );
}

export default Header;