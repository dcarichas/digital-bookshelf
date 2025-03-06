import React from 'react';
import "./App.css";
import Sidebar from "./assets/Sidebar.tsx";

function App() {

  return (
      <>
          <Sidebar/>
          <div className={"mainContainer"}>
              <div className={"infoContainer"}>
                  <div className={"infoBox"}>
                      <p className={"p-title"}> Biblioteca Vazia </p>
                      <p className={"p-info"}> Adicione um livro</p>
                  </div>
              </div>
          </div>
      </>
);
}

export default App;
