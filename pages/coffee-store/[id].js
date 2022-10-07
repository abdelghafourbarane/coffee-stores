import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faLocationArrow,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

import { CoffeeStoresContext } from "../../store/store-context";
import Loader from "../../components/Loader/Loader";

import { getCoffeeStores } from "../../services/coffee-stores";
import { isEmpty } from "../../utils";

import styles from "../../styles/CoffeeStore.module.scss";

export async function getStaticProps({ params }) {
  const coffeeStores = await getCoffeeStores();
  const coffeeStore = coffeeStores.find(
    (coffee_store) => coffee_store.fsq_id === params.id
  );
  return {
    props: {
      coffeeStore: coffeeStore ? coffeeStore : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeStores = await getCoffeeStores();
  const paths = coffeStores.map((coffeeStore) => ({
    params: { id: coffeeStore.fsq_id },
  }));
  return {
    paths,
    fallback: true,
  };
}

function CoffeeStore(initialProps) {
  const [coffeeStore, setCoffeeStore] = useState(null);
  const [upvoteLoading, setUpvoteLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    state: { coffeeStores },
  } = useContext(CoffeeStoresContext);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const {
        fsq_id,
        name,
        location: { address, neighborhood },
        imgUrl,
      } = coffeeStore;
      const response = await fetch("/api/createCoffeeStores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: fsq_id,
          address: address || "",
          neighborhood: neighborhood !== undefined ? neighborhood[0] : "",
          voting: 0,
          name,
          imgUrl,
        }),
      });
      const createdCoffeeStore = await response.json();
      return createdCoffeeStore;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpVoteClick = async () => {
    setUpvoteLoading(true);
    const resp = await fetch(`/api/updateFavourite`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const record = await resp.json();
    setUpvoteLoading(false);

    setCoffeeStore({ ...coffeeStore, voting: record.voting });
  };

  useEffect(() => {
    if (isEmpty(initialProps.coffeeStore)) {
      if (coffeeStores.length > 0) {
        const coffeeStoreFromContext = coffeeStores.find((coffeeStore) => {
          return coffeeStore.fsq_id === id;
        });
        if (coffeeStoreFromContext) {
          setCoffeeStore(coffeeStoreFromContext);
          handleCreateCoffeeStore(coffeeStoreFromContext);
        }
      }
    } else {
      setCoffeeStore(initialProps.coffeeStore);
      handleCreateCoffeeStore(initialProps.coffeeStore);
    }
  }, [id, initialProps.coffeeStore, coffeeStores]);

  const { data } = useSWR(`/api/getCoffeeStoreById?id=${id}`, (url) =>
    fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      if (data.message === undefined) {
        setCoffeeStore({ ...data });
      }
    }
  }, [data]);


  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{coffeeStore?.name}</title>
      </Head>

      <main className={styles.main_container}>
        <div className={styles.img_section}>
          <Link href="/">
            <a className={styles.link}>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={{ marginRight: "1rem" }}
              />
              Back to home
            </a>
          </Link>
          <span className={styles.coffee_store_name}>{coffeeStore?.name}</span>
          <div className={styles.img_container}>
            <Image
              src={
                coffeeStore?.imgUrl ||
                "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              }
              layout="fill"
              objectFit="cover"
              alt={coffeeStore?.name}
              className={styles.img}
            />
          </div>
        </div>
        <div className={`glass ${styles.coffee_store_infos_container}`}>
          <div className={styles.info_container}>
            <FontAwesomeIcon icon={faLocationDot} className={styles.icon} />
            <span>
              {coffeeStore?.address ||
                coffeeStore?.location?.address ||
                "(No address found)"}
            </span>
          </div>

          {(coffeeStore?.neighborhood ||
            coffeeStore?.location?.neighborhood) && (
            <div className={styles.info_container}>
              <FontAwesomeIcon icon={faLocationArrow} className={styles.icon} />
              <span>
                {coffeeStore.address || coffeeStore.location.neighborhood}
              </span>
            </div>
          )}

          <div className={styles.info_container}>
            <FontAwesomeIcon icon={faStar} className={styles.icon} />
            <span className={styles.infos_text}>
              {coffeeStore !== null && coffeeStore.voting !== undefined
                ? coffeeStore.voting
                : 0}
            </span>
          </div>
          <button onClick={handleUpVoteClick}>
            {!upvoteLoading ? (
              "Up Vote!"
            ) : (
              <ClipLoader
                color="#fff"
                cssOverride={{ margin: "0 auto" }}
                size={20}
              />
            )}
          </button>
        </div>
      </main>
    </>
  );
}

export default CoffeeStore;
