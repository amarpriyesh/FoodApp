import logo from '../../logo.svg';
import './Header.scss';

function Header() {
  return (
    <div>
        <header className="header bg-midnight">
            <nav className="navbar">
                <div>
                  <img src={logo} className="App-logo navbar_logo" alt="logo" />
                </div>
                <ul className="nav-links navbar_list">
                  <li><a href="#" className="navbar_link text-slate-950 font-medium">Home</a></li>
                  <li><a href="#" className="navbar_link text-slate-950 font-medium">About</a></li>
                  <li><a href="#" className="navbar_link text-slate-950 font-medium">Services</a></li>
                  <li><a href="#" className="navbar_link text-slate-950 font-medium">Contact</a></li>
                </ul>
                <div>
                  <a href="#" className="navbar_link text-slate-950 font-medium">Login</a>
                </div>
            </nav>
        </header>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link bg-yellow-500 text-white p-4"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       We are in header
    //     </a>
    //   </header>
    // </div>
  );
}

export default Header;