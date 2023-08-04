import styles from "./HourBlock.module.css";

interface IHourBlock {
  time: string;
}

const HourBlock = ({ time }: IHourBlock) => {
  return <div className={styles.hourBlock}>{time}</div>;
};

export default HourBlock;
