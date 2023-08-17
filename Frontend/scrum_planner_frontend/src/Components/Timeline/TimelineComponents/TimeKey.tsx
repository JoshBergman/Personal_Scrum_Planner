import styles from "./TimeKey.module.css";

interface ITimeKeyProps {
  time: string;
}

const TimeKey = ({ time }: ITimeKeyProps) => {
  return <label className={styles.timeLabel}>{time}</label>;
};

export default TimeKey;
