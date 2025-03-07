import React, { useEffect, useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import {Book} from "../model/Book.ts";

export const Biblioteca: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const db = await Database.load('sqlite:books.db');
                const result = await db.select('SELECT * FROM books');

                const fetchedBooks = result.map((row: any) => ({
                    id: row.id,
                    name: row.name,
                    author: row.author,
                    year: row.year,
                    summary: row.summary,
                    loanAmount: row.loanAmount
                }));

                setBooks(fetchedBooks);
            } catch (e) {
                console.error("Error fetching books:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (isLoading) {
        return (
            <div className="loadingContainer">
                {/* Add your loading spinner here */}
                Loading...
            </div>
        );
    }

    return (
        <div className="infoContainer">
            {books.length === 0 ? (
                <div className="infoBox fade-in">
                    <p className="p-title">Biblioteca Vazia</p>
                    <p className="p-info">Adicione um livro</p>
                </div>
            ) : (
                <div className="infoBox fade-in">
                    <p className="p-title">{books.length} livros presente(s)</p>
                </div>
            )}
        </div>
    );
};
