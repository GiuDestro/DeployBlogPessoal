import React, { useContext, useEffect, useState } from 'react';
import CardPostagem from '../cardPostagem/CardPostagem';
import Postagem from '../../../models/Postagem';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar } from '../../../services/Service';
import { Oval } from 'react-loader-spinner';
import { toastAlerta } from '../../../util/toastAlerta';


function ListaPostagens() {
    const [postagens, setPostagens] = useState<Postagem[]>([]);

    let navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
        if (token === '') {
        toastAlerta('Você precisa estar logado', 'info');
        navigate('/');
        }
    }, [token]);

    async function buscarPostagens() {
        try {
        await buscar('/postagens', setPostagens, {
            headers: {
            Authorization: token,
            },
        });
        } catch (error: any) {
        if (error.toString().includes('403')) {
            toastAlerta('O token expirou, favor logar novamente', 'info')
            handleLogout()
        }
        }
    }
    useEffect(() => {
        buscarPostagens();
    }, [postagens.length]);

return (
    <>
    {postagens.length === 0 && (
    <Oval
    visible={true}
    height="100"
    width="100"
    ariaLabel="dna-loading"
    wrapperStyle={{}}
    wrapperClass="dna-wrapper mx-auto"
    color='#e63946'
/>
    )}
    <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
    {postagens.map((postagem) => (
        <CardPostagem key={postagem.id} post={postagem} />
        ))}
    </div>
    </>
);
}

export default ListaPostagens;