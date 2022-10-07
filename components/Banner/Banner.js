import React from "react";

import LocationLoader from "../LocationLoader/LocationLoader";

import styles from "./Banner.module.scss";

const Banner = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Store</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops</p>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.button}
          onClick={props.handleClick}
        >
          {props.buttonTitle}
        </button>
      </div>
    </div>
  );
};

export default Banner;
