import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

import Banner from "../components/Banner/Banner";
import styles from "../styles/Home.module.scss";
import Card from "../components/Card/Card";

import { getCoffeeStores } from "../services/coffee-stores";
import useTrackLocation from "../hooks/useTrackLocation";
import { ACTION_TYPE, CoffeeStoresContext } from "../store/store-context";
import Loader from "../components/Loader/Loader";


export async function getStaticProps(context) {
  const coffeeStores = await getCoffeeStores();
  return {
    props: {
      coffeStores: coffeeStores,
    },
  };
}

export default function Home({ coffeStores }) {
  const [isNearbyCoffeeLoading,setIsNearbyCoffeeLoading]=useState(false)
  const [coffeeCardClicked,setCoffeeCardClicked]=useState(false)
  const { errorMsg, isLocationLoading, handleGetCurrentLocation } =
    useTrackLocation();

  const { state, dispatch } = useContext(CoffeeStoresContext);
  const nearbyCoffeeStores = state.coffeeStores;

  useEffect(() => {
    const fetchCoffeeStores = async () => {
      if (state.latLong) {
        try {
          setIsNearbyCoffeeLoading(true)
          const fetchedCoffeeStores = await getCoffeeStores(state.latLong,20);
          
          // const response=await fetch(`/api/getCoffeeStores?latLong=33.60734503640306,-7.6321352045511945&limit=15`);
          // const fetchedCoffeeStores= await response.json()
          
          // const fetchedCoffeeStores = await getCoffeeStores("48.865157818849575,2.302057317839051",20);
          dispatch({
            type: ACTION_TYPE.SET_COFFEE_STORES,
            payload: fetchedCoffeeStores.coffeeStores,
          });
          setIsNearbyCoffeeLoading(false)
        } catch (error) {
          setIsNearbyCoffeeLoading(false)
        }
      }
    };
    fetchCoffeeStores();
  }, [state.latLong,dispatch]);

  const handleCoffeeCardClick=()=>{
    setCoffeeCardClicked(true)
  }

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Loader/> */}
      <div className={styles.container}>
      
        <main className={styles.main}>
          <Banner
          buttonTitle={isNearbyCoffeeLoading ? "Locating..." : "View Stores Nearby"}
            handleClick={handleGetCurrentLocation}
          />
          {errorMsg && <p>Location error : {errorMsg}</p>}
          <div className={styles.heroImage}>
            <Image
              src="/static/hero-image.png"
              width={700}
              height={400}
              alt="coffee-stores"
            />
          </div>
          {nearbyCoffeeStores?.length > 0 && (
            <>
              <h2 className={styles.heading2}>Stores near me</h2>
              <div className={styles.cards_container}>
                {nearbyCoffeeStores.map((coffeeStore) => (
                  <Card
                    key={coffeeStore.fsq_id + "_card"}
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    className={styles.card}
                    handleClick={handleCoffeeCardClick}
                  />
                ))}
              </div>
            </>
          )}
          {coffeStores.length > 0 && (
            <>
              <h2 className={styles.heading2}>Toronto</h2>
              <div className={styles.cards_container}>
                {coffeStores.map((coffeeStore) => (
                  <Card
                    key={coffeeStore.fsq_id + "_card"}
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.fsq_id}`}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    className={styles.card}
                    // handleClick={handleCoffeeCardClick}
                  />
                ))}
              </div>
            </>
          )}
          {coffeeCardClicked && <Loader/>}
        </main>
      </div>
    </>
  );
}
