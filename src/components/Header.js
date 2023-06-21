import logo from '../media/resup-logo.png';

function Header(params) {
  return (
    <div className="header">
      
        <img src={logo} className="logo" />
        <p className="logo_name">رس آپ</p>

    </div>
  );
}

export default Header;
