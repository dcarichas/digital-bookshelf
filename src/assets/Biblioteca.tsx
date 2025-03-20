import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Database from "@tauri-apps/plugin-sql";
import { Book } from "../model/Book.ts";
import {Loading} from "./Loading.tsx";

export const Biblioteca: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]); // State for filtered books
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const navigate = useNavigate(); // Initialize navigation

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const db = await Database.load("sqlite:books.db");
                const result: Book[] = await db.select("SELECT * FROM books");

                const fetchedBooks = result.map((row: Book)  => (
                    new Book(
                        row.id,
                        row.name,
                        row.author,
                        row.year,
                        row.summary,
                        row.loanAmount
                    )
                ));

                // Sort the books by name in alphabetical order
                fetchedBooks.sort((a, b) => a.name.localeCompare(b.name));

                setBooks(fetchedBooks);
                setFilteredBooks(fetchedBooks); // Initially set filtered books to all books
            } catch (e) {
                console.error("Error fetching books:", e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter books based on search query
        const filtered = books.filter(book =>
            book.name.toLowerCase().includes(query)
        );
        setFilteredBooks(filtered);
    };

    if (isLoading) {
        return <Loading />;
    }

    // Divide filtered books into rows of 5
    const rows = [];
    for (let i = 0; i < filteredBooks.length; i += 5) {
        rows.push(filteredBooks.slice(i, i + 5));
    }

    return (
        books.length === 0 ?
            <div className={"bookshelfContainer fade-in"}>
                <div className="emptyShelf">
                    <p className="p-title">Biblioteca Vazia</p>
                    <a className={"a-info"} onClick={() => navigate("/adicionar")}>Adicione um livro</a>
                </div>
            </div>
            :
            <div className={"bookshelfContainer fade-in"}>
                <div className="searchBarContainer">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar livros..."
                        className="searchBar"
                    />
                </div>
                <button className="simpleButton" style={{marginBottom: "40px"}} onClick={() => navigate("/adicionar")}>
                    Adicionar um livro
                </button>
                {filteredBooks.length === 0 ? (
                    <div className="emptyShelf">
                        <p className="p-title">Nenhum livro encontrado</p>
                    </div>
                ) : (
                    rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="bookshelfRow">
                            {row.map((book) => (
                                <div
                                    key={book.id}
                                    className="bookItem"
                                    onClick={() => navigate(`/book/${book.id}`)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <p className="bookTitle">{book.name}</p>
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
    );
};
