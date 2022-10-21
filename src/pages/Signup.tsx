/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, ChakraProvider, Image, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { message } from 'antd';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login.css';
export  const firebaseApp = initializeApp({
      apiKey: "AIzaSyCYmc9RCriKEU7AH8IMP54dwkI4D5gcC10",
      authDomain: "projeto-ppt.firebaseapp.com",
      projectId: "projeto-ppt",
      storageBucket: "projeto-ppt.appspot.com",
      messagingSenderId: "154044979189",
      appId: "1:154044979189:web:436e72706a76f2b08ff2bc",


  })
  export const db = getFirestore(firebaseApp)

export const Signup = () => {


    const useCollectionRef = collection(db, "users")

    const navigate = useNavigate();

    const [id, setId]: any = useState(0)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loginIsLoading, setIsLoadingLogin] = useState(false);


    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            RegisterUser()
        }
    }

    const toast = useToast()

    async function RegisterUser() {
        setIsLoadingLogin(true)
        const user = await addDoc(useCollectionRef, {
            id,
            nome,
            email,
            senha
        }).then(() => {
            message.destroy()
            message.success("Usuário cadastrado com sucesso!")
            localStorage.clear()
            localStorage.setItem('logged', '1')
            localStorage.setItem('NomeUser', nome)
            setIsLoadingLogin(false)
            navigate('/main')
        }).catch((e: any) => {
            message.destroy();
            message.error("Não foi possível realizar seu cadastro, por favor verifique com a administração!");
            setIsLoadingLogin(false)
        })

    }

    return (
        <ChakraProvider>

            <Image w={'full'} h={'full'} position={'absolute'} src='/stars.jpg'></Image>
            <VStack pt={'15%'} >

                <Text position={'relative'} textColor={'white'} align={'center'} fontFamily={'Roboto, sans-serif'} fontSize={30}>Cadastro</Text>
                <Input textColor={'white'} w={'100%'} maxW={'500px'} _focus={{}} borderRadius={3} type="text" onChange={((e: any) => setNome(e.target.value))} placeholder="Digite seu nome aqui" />
                <Input textColor={'white'} w={'100%'} maxW={'500px'} _focus={{}} borderRadius={3} type="text" onChange={((e: any) => setEmail(e.target.value))} placeholder="Cadastre seu Email aqui" />
                <Input textColor={'white'} w={'100%'} maxW={'500px'} _focus={{}} borderRadius={3} onKeyPress={handleKeyPress} onChange={((e: any) => setSenha(e.target.value))} type="password" placeholder="Cadastre sua senha aqui" />

                <Button w={'100%'} colorScheme={'blue'} maxW={'500px'} _loading={{ bgColor: '#163391' }} onClick={() => RegisterUser()} isLoading={loginIsLoading}>Cadastrar</Button>
                <Text position={'relative'} textColor={'white'}>Já possui uma conta? Faça login <Button onClick={() => navigate('/') } fontSize={16} colorScheme={'blue'} variant={'link'}>aqui</Button></Text>

            </VStack>


        </ChakraProvider>

    )
}