import React, { useEffect, useState } from 'react';
import "./App.css";
import Database from "@tauri-apps/plugin-sql";
import { Loading } from "./assets/Loading";
import {Biblioteca} from "./assets/Biblioteca.tsx";

function AppInit() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initDatabase = async () => {
            try {
                // Load or create the database
                const db = await Database.load("sqlite:books.db");

                console.log("Creating books table...");
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
                console.log("Table created successfully");

            } catch (e) {
                console.error("Database error:", e);
                alert("Failed to initialize database");
            } finally {
                setIsLoading(false);
            }
        };

        initDatabase();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        );
    }

    return (
        <Biblioteca/>
    );
}

export default AppInit;
