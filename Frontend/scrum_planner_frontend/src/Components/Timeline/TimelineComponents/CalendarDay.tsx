import styles from "./CalendarDay.module.css";

import HalfHourBlock from "./HourBlock";

const CalendarDay = () => {
  const getTimeBlocks = (isAM: boolean) => {
    const blocks = [];
    for (let i = 1; i < 13; i++) {
      const thisTime = Math.floor(i) + (isAM ? " AM" : " PM");
      blocks.push(<HalfHourBlock time={thisTime} key={"halfHourBlock-" + i} />);
    }

    return blocks;
  };

  return (
    <div className={styles.gridContainer}>
      {getTimeBlocks(true)}
      {getTimeBlocks(false)}
    </div>
  );
};

export default CalendarDay;
