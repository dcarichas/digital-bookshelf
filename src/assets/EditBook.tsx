import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Database from "@tauri-apps/plugin-sql";
import {Loading} from "./Loading.tsx";
import {Book} from "../model/Book.ts";

export const EditBook: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get book ID from URL
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState<number | string>("");
    const [summary, setSummary] = useState("");
    const [loanAmount, setLoanAmount] = useState<number | string>("");
    const [isSummaryView, setIsSummaryView] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const db = await Database.load("sqlite:books.db");
                const result: Book[] = await db.select("SELECT * FROM books WHERE id = ?", [id]);

                if (result.length > 0) {
                    const book = result[0];
                    setTitle(book.name);
                    setAuthor(book.author);
                    setYear(book.year);
                    setSummary(book.summary || "");
                    setLoanAmount(book.loanAmount.toString());
                } else {
                    alert("Livro não encontrado.");
                    navigate("/biblioteca");
                }
            } catch (e) {
                console.error("Erro ao buscar detalhes do livro:", e);
                alert("Erro ao carregar detalhes do livro.");
                navigate("/biblioteca");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation: Ensure all fields are filled
        if (!title || !author || !year) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const db = await Database.load('sqlite:books.db');
            const parsedAmount = loanAmount === "" ? 0 : parseFloat(loanAmount as string);
            await db.execute(`
                UPDATE books SET name = ?, author = ?, year = ?, summary = ?, loanAmount = ? WHERE id = ?`,
                [title, author, parseInt(year as string), summary, parsedAmount, id]
            );
            console.log("Livro atualizado com sucesso");
            navigate(`/book/${id}`);
        } catch (error) {
            console.error("Erro ao atualizar o livro:", error);
            alert("Erro ao atualizar o livro. Tente novamente.");
        }
    };

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="formContainer">
            <div className={"formWrapper fade-in"}>
                <form onSubmit={handleSubmit}>
                    {isSummaryView ?
                        <div className="form-group">
                            <textarea
                                style={{
                                    height: "300px",
                                    width: "300px"
                                }}
                                id="summary"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="Resumo do livro (Opcional)"
                            />
                        </div>
                        :
                        <>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Título do livro"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    id="author"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="Autor(es) do livro"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="year"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    placeholder="Ano de publicação"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="number"
                                    id="loanAmount"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(e.target.value)}
                                    placeholder="Empréstimo (Opcional)"
                                />
                            </div>
                        </>
                    }
                    <button
                        className="toggleSummaryButton"
                        onClick={() => setIsSummaryView(!isSummaryView)}
                        type="button"
                    >
                        {isSummaryView ? 'Voltar' : 'Inserir Resumo'}
                    </button>
                    <div className={"detail-buttons"}>
                        <button className={"genericButton"} type={"button"} onClick={() => navigate(-1)}>
                            Voltar
                        </button>
                        <button className={"genericButton"} type="submit">Guardar Alterações</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
