import React from 'react';
import logo from './logo.svg';
import './App.css';
import Data from './result.json';

function App() {
  return (
    <html>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
    <div className="App">
      <header className="App-header">
        <p className="main_subject">
          BibGourmand et Maîtres Restaurateurs
        </p>
        <a
          className="App-link"
          href="https://guide.michelin.com/fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Michelin website
        </a>
        <a
          className="App-link"
          href="https://www.maitresrestaurateurs.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          Maîtres Restaurateurs website
        </a>
      </header>
      <body className="App-maincontent">
        <img src={logo} className="App-logo" alt="logo" />
        <div class="App-maincontent">
          <div>
            <br />
            <p>

            </p>
            <ul className="liste_resto">          
                  {Data.map((resto,index) => {
                  return <li align="left">
                    <p align="left" className="title">
                    {resto.name}
                    </p>
                    <p align="left">
                    {resto.phone}
                    </p>
                    <p>
                    {resto.address}
                    </p>
                  </li>
                })}
            </ul>
          </div>
        </div>
      </body>
      <footer>
        <p>
          Léa YOUSSEF project
        </p>
      </footer>
    </div>
    </html>
  );
}



export default App;
