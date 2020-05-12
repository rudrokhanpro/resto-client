import React from "react";
import SearchClient from "./search-client";
import ClientPage from "./client-page";
import ClientForm from "./client-form/ClientForm";
import "./styles/css/App.css";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Resto</h1>
          <Navigation />
        </header>
        <main>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/search-client" component={SearchClient} />
            <Route path="/client-form" component={ClientForm} />
            <Route path="/client/" component={ClientPage} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Acceuil</Link>
        </li>
        <li>
          <Link to="/search-client">Rechercher un client</Link>
        </li>
        <li>
          <Link to="/client-form">Nouveau client</Link>
        </li>
      </ul>
    </nav>
  );
}

function Home() {
  return (
    <div>
      <h2>Acceuil</h2>
    </div>
  );
}

export default App;
