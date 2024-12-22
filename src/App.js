import React, {useEffect, useState, useRef} from 'react';
import NET from "vanta/dist/vanta.net.min"
import mm from "./assets/metamask.png"
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal,useWeb3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import Typewriter from 'typewriter-effect';
import img1 from "./assets/Minefy.jpeg";


const chains = [arbitrum, mainnet, polygon]
const projectId = '6e379d8d93b0dc2a895679375452bfa2'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)


function App() {

  const { open } = useWeb3Modal()
  const [form,setForm] = useState(true)
  const [type, setType] = useState('')

  const [vantaEffect, setVantaEffect] = useState(0);

  const myRef = useRef(null);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        NET({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x6e5fff,
          backgroundColor: 0x0,
          points: 9.00,
          spacing: 17.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const setEmpType = () => {
    setForm(false)
    setType('employee')
  }
  const setCustType = () => {
    setForm(false)
    setType('customer')
  }

  const clearSt = () =>{
    setForm(true)
    setType()
  }

  return (
    <>
    <div ref={myRef} className='h-screen'>
    <WagmiConfig config={wagmiConfig}>

        

{form ? (<div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space items-center">

<div className=" max-w-sm basis-1/2 text-center">
      <img src={img1} alt='Minefy' className=' rounded-3xl'></img>
  </div>
  <div className='text-3xl text-white basis-1/2 text-center'>
    <Typewriter
  options={{
    strings: ['Are you a company or an employee?'],
    autoStart: true,
    loop: true,
  }}
/>
    
    <div className='pt-4'>
    <button onClick={setEmpType} className='text-black text-2xl bg-white p-4 rounded-full'>
          Employee
    </button>
    <button onClick={setCustType} className='text-black text-2xl bg-white p-4 ml-6 rounded-full'>
          Company
      </button>
      </div>

  </div>

    
</div>):(<div className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space items-center">
      <div className="md:w-1/3 max-w-sm">
      </div>
    type === 'employee' (<div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">        
        </div>



      </div>):(<div>
        <div className="text-center md:text-left">        
        </div>
        <h1 className='text-2xl text-white'><div >
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">Or</p>
        </div>
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" />
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" />
        <div className="mt-4 flex justify-between font-semibold text-sm">
          <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a>
        </div>
        <div className="text-center md:text-left">
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Signup</button>
        </div>
        
        <button onClick={clearSt} className='underline text-xl text-white px-4 mt-5 rounded-xl'>
        &lt; Back
          </button>
      </div></h1>
      </div>)}
      
    </div>)}
   
      </WagmiConfig>
      </div>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </>
  );
}

export default App;