export default function PageTitle(props) {
  return (
    <div className="flex items-start space-x-4">
      <img src={props.icon} height="24" width="24" />
      <p className="text-2xl text-white font-Rajdhani font-bold">
        {props.text}
      </p>
    </div>
  );
}
