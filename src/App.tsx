import React, {useEffect, useState} from 'react';
import "./App.css";
import Sidebar from "./assets/Sidebar.tsx";
import Database from "@tauri-apps/plugin-sql";
import {Loading} from "./assets/Loading.tsx";



function App() {

    const [isLoading, setIsLoading] = useState(true);

    // Initialize Database
    useEffect(() => {
        const initDatabase = async () => {
            try {
                const db = await Database.load('sqlite:books.db');
                await db.execute(`
                  CREATE TABLE IF NOT EXISTS books (
                    id INTEGER PRIMARY KEY,
                    name TEXT NOT NULL,
                    author TEXT NOT NULL,
                    year INTEGER NOT NULL,
                    summary TEXT,
                    loanAmount REAL
                  )
                `);
                console.log('Database initialized');
            } catch (e) {
                console.error('Failed to initialize database', e);
            } finally {
                setIsLoading(false);
            }
        };

        initDatabase().then(r => console.log(r));
    }, []);

    // Loading effect
    if (isLoading) {
        return (
            <div className={"mainContainer"}>
                <Loading/>
            </div>
        );
    }

    // Main App Content
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
