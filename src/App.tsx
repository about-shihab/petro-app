import React from "react";
import "./App.css";
import ContactList from "./components/ContactList";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Petro Professionals</h1>
        <p>
          ১ দফা ১ দাবি। <br /> স্বতন্ত্র বেতন কাঠামো চাই।
        </p>
        <div className="waves"></div>
      </header>
      <ContactList />
    </div>
  );
};

export default App;
