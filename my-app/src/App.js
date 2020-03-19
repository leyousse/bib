import React from 'react';
import logo from './logo_bib_maitresR.svg';
import './App.css';
import Data from './result.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageBackground from 'react-bootstrap/Image'
import restaurant_img from './restaurant-3.jpg'

function App() {
  return (
    <html>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <div className="App">
    <ImageBackground src={restaurant_img} fluid/>
      <header className="App-header">
        <p className="main_subject">
          Maîtres Gourmands
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
        <p>
          
        </p>
        <div class="App-maincontent">
          <script src='./filtering.js'/>
          <input class="form-control" id="my_input" type="text" placeholder="Search.." onKeuUp="myFunction()"/>
          <p></p>
            <table class="table table-dark" id="my_table"> 
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Adress</th>
                <th>Price</th>
                <th>Experience</th>
              </tr>
            </thead>         
                  {Data.map((resto,index) => {
                  return <tr>
                    <td><a className="App-link" href={resto.url} target="_blank" rel="noopener noreferrer">{resto.name}</a></td>
                    <td>{resto.phone}</td>
                    <td>{resto.address}</td>
                    <td>{resto.price}</td>
                    <td>{resto.experience}</td>
                  </tr>
                })}
            </table>
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
