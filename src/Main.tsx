
import { Box, Button, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import '@fontsource/roboto';
import { useState } from 'react';

const elementos: any = ['Pedra', 'Papel', 'Tesoura']

export const Main = () => {

  
	const EnviarEscolhaComEnter = (event: any) => {
		if (event.key === 'Enter') {
			VerificarResultado();
		}
	}

  function delay(n: any) {
    return new Promise(function (resolve) {
      setTimeout(resolve, n * 1000);
    });
  }

  const [escolha, setEscolha]: any = useState()
  var [numero_computador, setNumero_computador]: any = useState()
  const [resultado, setResultado]: any = useState()
  async function VerificarResultado() {
    var numero_aleatorio: Array<any>[any] = Math.floor(Math.random() * 3);
    if (escolha?.length < 5) {
      setResultado('')
    }
    if (escolha?.toLowerCase() === 'pedra') {
      if (numero_aleatorio === 0) {
        setResultado('Empate!')
      }
      else if (numero_aleatorio === 1) {
        setResultado('Você perdeu!')
      }
      else {
        setResultado("Você ganhou!  ")
      }

    }
    if (escolha?.toLowerCase() === 'papel') {
      if (numero_aleatorio === 0) {
        setResultado('Você ganhou!')
      }
      else if (numero_aleatorio === 1) {
        setResultado('Empate!')
      }
      else {
        setResultado("Você perdeu!")
      }
    }
    if (escolha?.toLowerCase() === 'tesoura') {
      if (numero_aleatorio === 0) {
        setResultado('Você perdeu!')
      }
      else if (numero_aleatorio === 1) {
        setResultado('Você ganhou!')
      }
      else {
        setResultado("Empate!")
      }
    }

    setNumero_computador(numero_aleatorio)
    await delay(3)
    setEscolha('')
    setResultado('')
  }


  return (
    <>

      <VStack bgSize={'cover'} h={'100vh'} bgGradient={resultado === 'Você perdeu!' ? 'linear-gradient(90deg, rgba(190,48,48,0.8799894957983193) 55%, rgba(144,74,74,0.8575805322128851) 100%);' : resultado === 'Você ganhou!' ? 'linear-gradient(90deg, rgba(60,190,48,0.8799894957983193) 55%, rgba(74,144,77,0.7903536414565826) 100%);' : resultado === 'Empate!' ? 'linear-gradient(90deg, rgba(212,217,216,0.8407738095238095) 100%, rgba(172,172,172,0.8379726890756303) 100%);' : 'linear-gradient(90deg, rgba(71,48,190,0.700717787114846) 54%, rgba(152,59,147,0.6138830532212884) 100%);'}>

        <Box p={1} borderRadius={10} mt={'18%'} bg={'white'} w={'auto'} h={'auto'}>
          <VStack>

            <Input onKeyPress={(e: any) => EnviarEscolhaComEnter(e)} value={escolha} variant={'flushed'} _focus={{}} textTransform={'capitalize'} onChange={(e: any) => setEscolha(e.target.value)} textAlign={'center'} minW={'300px'} placeholder='Digite Pedra, Papel ou Tesoura'></Input>
            {escolha?.length > 0 &&
              <>
                <Button variant={'ghost'} colorScheme={'blue'} onClick={() => VerificarResultado()}>Enviar Resposta</Button>

                {resultado?.length > 0 &&
                  <>
                    <Text fontFamily={'Roboto, sans-serif'} fontSize={16}><b>{resultado}</b></Text>
                    <Text fontSize={16} fontFamily={'Roboto, sans-serif'}>O Computador tinha escolhido <b>{elementos[numero_computador]}</b></Text>
                    <Text textColor={'black'} fontSize={15}>Reiniciando ...</Text>
                    <Spinner top={2} />
                  </>
                }
              </>
            }
          </VStack>
        </Box>



      </VStack>

    </>
  )
}
