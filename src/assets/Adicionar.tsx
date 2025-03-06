import React, { useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import {useNavigate} from "react-router-dom";


/* TEMPORARY DESIGN FOR TESTING PURPOSES */
export const Adicionar: React.FC = () => {
    // State to track the form inputs
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState<number | string>(""); // We allow empty initially
    const [summary, setSummary] = useState("");
    const [loanAmount, setLoanAmount] = useState<number | string>("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation: Ensure all fields are filled
        if (!title || !author || !year || !summary || !loanAmount) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const db = await Database.load('sqlite:books.db');
            await db.execute(`
                INSERT INTO books (name, author, year, summary, loanAmount) 
                VALUES ($1, $2, $3, $4, $5)`,
                [title, author, parseInt(year as string), summary, parseFloat(loanAmount as string)]
            );
            console.log("Livro adicionado com sucesso");
            navigate("/biblioteca");
        } catch (error) {
            console.error("Erro ao adicionar o livro:", error);
            alert("Erro ao adicionar o livro. Tente novamente.");
        }
    };

    return (
        <div className="infoContainer">
            <div className="infoBox">
                <p className="p-title">Adicionar Livro</p>
                <p className="p-info">Preencha os dados do livro</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
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
                        <label htmlFor="author">Autor(es)</label>
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
                        <label htmlFor="year">Ano</label>
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
                        <label htmlFor="summary">Resumo</label>
                        <textarea
                            id="summary"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="Resumo do livro"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="loanAmount">Empréstimo (€)</label>
                        <input
                            type="number"
                            id="loanAmount"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            placeholder="Valor do empréstimo"
                            required
                        />
                    </div>

                    <button type="submit">Adicionar Livro</button>
                </form>
            </div>
        </div>
    );
};
