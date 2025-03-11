import React from "react";
import ReactDOM from "react-dom/client";
import AppInit from "./AppInit.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import {Adicionar} from "./assets/Adicionar.tsx";
import {Sobre} from "./assets/Sobre.tsx";
import {Biblioteca} from "./assets/Biblioteca.tsx";
import Sidebar from "./assets/Sidebar.tsx";
import {BookDetails} from "./assets/BookDetails.tsx";
import {EditBook} from "./assets/EditBook.tsx";

const MainLayout: React.FC = () => {
    return (
        <>
            <Sidebar />
            <div className="mainContainer">
                <Outlet />
            </div>
        </>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    //<React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<AppInit />} />
                    <Route path="/biblioteca" element={<Biblioteca />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/edit-book/:id" element={<EditBook />} />
                    <Route path="/adicionar" element={<Adicionar />} />
                    <Route path="/sobre" element={<Sobre />} />
                </Route>
            </Routes>
        </BrowserRouter>
    //</React.StrictMode>
);
