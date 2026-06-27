type GreetingProps = {
  name: string;
};

export function Greeting(props: GreetingProps) {
  return <p>สวัสดีครับ คุณ {props.name} 👋</p>;
}