import React from "react";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./paginas/login/Login";
import Cadastro from "./paginas/cadastro/Cadastro";
import ListaTemas from "./components/temas/listaTemas/ListaTemas";
import Home from "./paginas/home/Home";
import FormularioTema from "./components/temas/formularioTema/FormularioTema";
import DeletarTema from "./components/temas/deletarTema/DeletarTema";
import Footer from "./components/footer/Footer";
import ListaPostagens from "./components/postagens/listaPostagens/ListaPostagem";
import FormularioPostagem from "./components/postagens/formularioPostagem/FormularioPostagem";
import DeletarPostagem from "./components/postagens/deletarPostagem/DeletarPostagem";
import Perfil from "./paginas/perfil/Perfil";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <AuthProvider>
    <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
              <Route path="/temas" element={<ListaTemas />} />
              <Route path="/cadastroTema" element={<FormularioTema />} />
              <Route path="/editarTema/:id" element={<FormularioTema />} />
              <Route path="/deletarTema/:id" element={<DeletarTema />} />
              <Route path="/postagens" element={<ListaPostagens />} />
              <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
              <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
              <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>
    </>
  );
}
export default App;