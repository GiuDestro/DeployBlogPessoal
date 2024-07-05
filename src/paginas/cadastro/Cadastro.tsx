import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import './Cadastro.css';
import React from 'react';
import { toastAlerta } from '../../util/toastAlerta';

function Cadastro() {
const navigate = useNavigate();

  // criamos um estado para poder pegar o valor do campo "confirmar senha", para comparar as senhas antes de enviar o cadastro
const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  // armazenar os dados que o usuario digitou no form
const [usuario, setUsuario] = useState<Usuario>({
    // iremos iniciar o objeto usuário, com todos os seus valores em branco
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
});

  // criamos aqui um novo estado de usuário, para receber a resposta do backend e tratar ela de forma correta
const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
});

  // a função atualizarEstado irá receber o evento de mudança dos inputs, e para cada novo caractere digitado, iremos atualizar o estado de usuario criado acima, atualizando o campo correto, de acordo com o atributo "name" da tag html
function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
    ...usuario,
    [e.target.name]: e.target.value,
    });
}

  // a função abaixo, tem a mesma proposta da anterior, mas será exclusiva para o campo de confirmar senha
function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
}

  // a função "cadastrarNovoUsuario" será responsavel por entender que o formulário está sendo enviado, e fazer a comunicação com o nosso backend
async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    //inicialmente, iremos prevenir o comportamento padrão de um formulário, que seria atualizar a página
    e.preventDefault();

    // depois de prevenir a atualização, iremos fazer uma validação dos campos de senha
    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      // depois, iremos tentar cadastrar o usuário no backend, e caso tudo de certo, encerramos o código dentro do TRY
    try {
        // iremos aguardar a Promisse do Axios, de que ele levará nossos dados ao servidor, e se tudo der certo, damos o toastAlertaa e fim.
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuarioResposta);
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso');
    } catch (error) {
        // caso de algum erro no cadastro que tentamos no TRY, a parte do Catch irá reconhecer isso, e dar um toastAlertaa diferente para o nosso usuário
        toastAlerta('Cadastro não foi finalizado', 'info');
    }
    } else {
      // caso tenha algum problema na validação das senhas, toda a parte acima será desconsiderada, e iremos para esse ELSE
    toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'info')
      setUsuario({ ...usuario, senha: "" }) // Reinicia o campo de Senha
      setConfirmarSenha("")                 // Reinicia o campo de Confirmar Senha
    }
}

  // função de navegação, que levara nosso usuário de volta para a tela de login
function back() {
    navigate('/login')
}

  // criamos um useEffect, que irá verificar o id recebido no estado "usuarioResposta", e caso ele seja diferente de zero, que significa que o usuário foi cadastrado corretamente no servidor, iremos navegar ele para o login
useEffect(() => {
    if (usuarioResposta.id !== 0) {
    back()
    }
}, [usuarioResposta])

return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form
        className="flex justify-center items-center flex-col w-2/3 gap-3"
        onSubmit={cadastrarNovoUsuario}
        >
        <h2 className="text-slate-900 text-5xl">Cadastrar</h2>
        <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
            }
            />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="usuario">E-mail</label>
            <input
            type="text"
            id="usuario"
            name="usuario"
            placeholder="Usuario"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.usuario}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
            }
            />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
            type="text"
            id="foto"
            name="foto"
            placeholder="Foto"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.foto}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
            }
            />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={usuario.senha}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
}
            />
        </div>
        <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
            type="password"
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirmar Senha"
            className="border-2 border-slate-700 rounded p-2"
            value={confirmarSenha}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
            }
            />
        </div>
        <div className="flex justify-around w-full gap-8">
            <button className="rounded text-white bg-red-400 hover:bg-red-700 w-1/2 py-2" onClick={back}>
            Cancelar
            </button>
            <button
            className="rounded text-white bg-indigo-400 hover:bg-indigo-900 w-1/2 py-2"
            type="submit"
            >
            Cadastrar
            </button>
        </div>
        </form>
    </div>
    </>
);
}

export default Cadastro;