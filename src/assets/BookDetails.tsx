import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Database from "@tauri-apps/plugin-sql";
import { Book } from "../model/Book.ts";
import {Loading} from "./Loading.tsx";

export const BookDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get book ID from URL
    const navigate = useNavigate();
    const [book, setBook] = useState<Book | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const db = await Database.load("sqlite:books.db");
                const result: Book[] = await db.select("SELECT * FROM books WHERE id = ?", [id]);

                if (result.length > 0) {
                    const row = result[0];
                    setBook(new Book(row.id, row.name, row.author, row.year, row.summary, row.loanAmount));
                }
            } catch (e) {
                console.error("Error fetching book details:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookDetails().then(r => console.log(r));
    }, [id]);

    const handleDelete = async () => {
        try {
            const db = await Database.load("sqlite:books.db");
            await db.execute("DELETE FROM books WHERE id = ?", [id]);
            navigate("/biblioteca");
        } catch (e) {
            console.error("Error deleting book:", e);
        }
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (!book) {
        return <p>Livro não encontrado.</p>;
    }

    return (
        <div className="bookDetailsContainer fade-in">
            <h2 className="bookTitle">{book.name}</h2>
            <p><strong>Autor:</strong> {book.author}</p>
            <p><strong>Ano:</strong> {book.year}</p>
            {book.summary && (
                <div className="summaryContainer">
                    <p><strong>Resumo:</strong></p>
                    <p className="summaryText">{book.summary}</p>
                </div>
            )}
            <p><strong>Empréstimo:</strong> {book.loanAmount.toFixed(2)}€</p>
            <div className={"detail-buttons"}>
                <button className="genericButton" onClick={() => navigate("/biblioteca")}>&lt; Voltar</button>
                <button className="genericButton" onClick={() => navigate(`/edit-book/${id}`)}>Editar</button>
                <button className="deleteButton" onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
    );
};
