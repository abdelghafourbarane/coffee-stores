import Link from "next/link";
import Image from "next/image";

import styles from "./Card.module.scss";

const Card = ({ name, imgUrl, href,handleClick }) => {
  return (
    <div>
      <Link href={href}>
        <a className={styles.card_link}>
          <div className={`glass ${styles.card}`} onClick={()=>{handleClick()}}>
            <h2 className={styles.card_header}>{name}</h2>
            <div className={styles.img_container}>
              <Image
                src={imgUrl}
                layout="fill"
                objectFit="cover"
                alt={name}
              />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Card;
