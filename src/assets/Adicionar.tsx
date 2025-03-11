import React, { useState } from "react";
import Database from "@tauri-apps/plugin-sql";
import {useNavigate} from "react-router-dom";

export const Adicionar: React.FC = () => {
    // State to track the form inputs
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState<number | string>("");
    const [summary, setSummary] = useState("");
    const [loanAmount, setLoanAmount] = useState<number | string>("");
    const [isSummaryView, setIsSummaryView] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation: Ensure all fields are filled
        if (!title || !author || !year || !loanAmount) {
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
                                    placeholder="Valor do empréstimo"
                                    required
                                />
                            </div>
                        </>
                    }
                    <button className={"genericButton"} style={{margin: "30px auto 0"}} type="submit">Adicionar Livro</button>
                </form>
                <button
                    className="toggleSummaryButton"
                    onClick={() => setIsSummaryView(!isSummaryView)}
                >
                    {isSummaryView ? '←' : '→'}
                </button>
            </div>

        </div>
    );
};
