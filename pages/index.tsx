import { useAddress, useMetamask, useNetwork, useNetworkMismatch, useSignatureDrop } from "@thirdweb-dev/react";
import { ChainId} from "@thirdweb-dev/sdk";

import type { NextPage } from "next";
import { useState,useEffect } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import logo from "../public/cloudlogo.webp"
import Link from "next/link";
import Head from "next/head";





const Home: NextPage = () => {

  const [mintTime, setMintTime] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date("10/1/2022 23:21:00");

    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setMintTime(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  //smart contract integration

  const address = useAddress();
  const connectwithMetamask = useMetamask();
  const isMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();


  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMint, setSuccessMint] = useState(false);

  const signatureDrop = useSignatureDrop("0xB457384B7036CEF0d4f65FDC016E8D63Bc8D197f");

  
  function Loader(){
    setErrorMessage(false);
    setLoading(true); 
    
    return;
  }

  async function claim() {
    if (!address) {
      connectwithMetamask();
      return;
    }

    if (isMismatch) {
      switchNetwork?.(ChainId.Goerli);
      return;
    }

    try {
      const tx = await signatureDrop?.claimTo(address, 1);
      setSuccessMint(true);
      
    } catch (error: any) {
      alert(error?.message);
      setErrorMessage(true);
      
      
    }


  }
  async function claim2() {
    if (!address) {
      connectwithMetamask();
      return;
    }

    if (isMismatch) {
      switchNetwork?.(ChainId.Goerli);
      return;
    }

    try {
      const tx = await signatureDrop?.claimTo(address, 2);
      
      setSuccessMint(true);
    } catch (error: any) {
      alert(error?.message);
      setErrorMessage(true);
    }


  }



  return (
    <>
    <Head>
      <title>In The Clouds : Mint</title>
    </Head>
    <div className={styles.nav}>
      <div className={styles.navbarContainer}>
        <Link href="https://www.intheclouds.online/">
          <div className={styles.navLogo}>
           CL<Image src={logo} alt="logo" width="50px" height="50px" />UD
        </div>
        </Link>
      </div>
    </div>

    <div className={styles.HeroContainer}>
      <div className={styles.HeroBg}>
      <div className={styles.ImgBg} />
       <div className={styles.ImgBg1} />
        <div className={styles.ImgBg2} />
        
    {mintTime ? (
        <>
          <h1>Hello</h1>
          {address ? (
            <>
        

        // Display Content After Connecting Wallet

        <div className={styles.ImgBg} />
        <div className={styles.ImgBg1Move} />
        <div className={styles.ImgBg2Move} />
        <div className={styles.MintContainer}>
            <h1>In The Clouds</h1>
            <p>A &quot;Legacy&quot; Art Collection by @WGMIPsycho</p>
            {errorMessage? (
            <>
            <div className={styles.ErrorMessage}> 
             
            
              <p>Error! Try Again</p>
            </div>

            
            </>
            
            ) : null }

            {loading? (
              <div className={styles.ellipsisWrapper}>
              <div className={styles.ellipsis}><div></div><div></div><div></div><div></div></div>

              </div>

            ): null}
            

        
        <div className={styles.MintButtonContainer}>
          <button className={styles.buttonStyle} onClick={() => {claim() ; Loader()}} >Mint1</button>
          <button className={styles.buttonStyle} onClick={() => {claim2() ; Loader()}}>Mint2</button>
            

          </div>
          </div>
              
{successMint? (
          <>
          <div className={styles.ImgBgMint} />
          <div className={styles.ImgBg1MoveMint} />
          <div className={styles.ImgBg2MoveMint} />
            <div className={styles.successMintMessage}>
              <h1>Successfully Minted </h1>
            </div>
          </>

        ) : null}
              
        

         
        </> 
        
      ) : (
<div className={styles.containerConnect}>
        <button 
          className={styles.mainButton}
          onClick={() => connectwithMetamask()}
          >
            Connect Wallet
          </button>
          </div>

      ) }
      
      
        </>
    ):(
      <>
        <div className={styles.TimeSection}>
        <div className={styles.timerwrapper}>
            <div className={styles.timerinner}>
              <div className={styles.timersegment}>
                <span className={styles.time}>{days}</span>
                <span className={styles.label}>Days</span>
              </div>
              <span className={styles.divider}>:</span>
              <div className={styles.timersegment}>
                <span className={styles.time}>{hours}</span>
                <span className={styles.label}>Hrs</span>
              </div>
              <span className={styles.divider}>:</span>
              <div className={styles.timersegment}>
                <span className={styles.time}>{minutes}</span>
                <span className={styles.label}>Mins</span>
              </div>
              <span className={styles.divider}>:</span>
              <div className={styles.timersegment}>
                <span className={styles.time}>{seconds}</span>
                <span className={styles.label}>Secs</span>
              </div>
            </div>
          </div>
          </div>
      </>

    )}
      
    </div>
    </div>
    </>
  );
};

export default Home;
