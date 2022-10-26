/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ChakraProvider, Image, Input, Text, VStack } from '@chakra-ui/react';
import { message } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';
import { db } from './Signup';
export const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail]: any = useState();
    const [senha, setSenha] = useState();
    const [user, setUser]: any = useState();
    const [loginIsLoading, setIsLoadingLogin] = useState(false);

    const useCollectionRef = collection(db, "users");

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            LoginUser()
        }
    }

    useEffect(() => {

        const getUsers = async () => {
            const data = await getDocs(useCollectionRef);
            setUser(data.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })))
        };
        getUsers()
    })

    function LoginUser() {

        setIsLoadingLogin(true)
        if (user?.filter((getemail: any) => getemail.email?.includes(email) && getemail.senha?.includes(senha)).length > 0) {
            message.destroy();
            localStorage.clear();
            localStorage.setItem('logged', '1');
            localStorage.setItem('NomeUser', (user?.filter((getuser: any) => getuser.email?.includes(email))?.[0]?.nome))
            navigate('main');
            message.success("Logado com sucesso!");
            setIsLoadingLogin(false);
            return 1;
        }
        else
            message.destroy();
        message.error("Erro ao fazer login!");
        setIsLoadingLogin(false);
    }

    return (
        <ChakraProvider>

            <Image w={'full'} h={'full'} position={'absolute'} src='/stars.jpg'></Image>
            <VStack pt={'15%'} >

                <Text position={'relative'} textColor={'white'} align={'center'} fontFamily={'Roboto, sans-serif'} fontSize={30}>Login</Text>
                <Input textColor={'white'} w={'100%'} maxW={'500px'} _focus={{}} borderRadius={3} type="text" onChange={((e: any) => setEmail(e.target.value))} placeholder="Email" />
                <Input textColor={'white'} w={'100%'} maxW={'500px'} _focus={{}} borderRadius={3} onKeyPress={handleKeyPress} onChange={((e: any) => setSenha(e.target.value))} type="password" placeholder="Senha" />

                <Button w={'100%'} colorScheme={'blue'} maxW={'500px'} _loading={{ bgColor: '#163391' }} isLoading={loginIsLoading} onClick={LoginUser}>Entrar</Button>
                <Text position={'relative'} textColor={'white'}>Ainda não possui uma conta? Registre se <Button onClick={() => navigate('/signup')} fontSize={16} colorScheme={'blue'} variant={'link'}>aqui</Button></Text>

            </VStack>

        </ChakraProvider>

    )
}