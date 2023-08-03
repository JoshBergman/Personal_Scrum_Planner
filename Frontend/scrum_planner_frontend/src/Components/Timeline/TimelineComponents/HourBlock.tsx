interface IHourBlock {
  time: string;
}

const HourBlock = ({ time }: IHourBlock) => {
  return <div>{time}</div>;
};

export default HourBlock;
