import React from "react";
import styles from "./TimeKey.module.css";

interface ITimeKeyProps {
  time: string;
  show: boolean;
}

const TimeKey = ({ time, show }: ITimeKeyProps) => {
  const styleObj: React.CSSProperties = {};
  if (!show) {
    styleObj["visibility"] = "hidden";
  }
  return (
    <label className={styles.timeLabel} style={styleObj}>
      {time}
    </label>
  );
};

export default TimeKey;
