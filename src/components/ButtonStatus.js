export default function ButtonStatus(props) {
  if (props.status === "ready") {
    return (
      <div className="bg-brand-dark-button h-12 w-28 grid place-content-center hover:bg-zinc-500 cursor-default">
        <p className=" text-white text-md">READY</p>
      </div>
    );
  }
  return (
    <div className=" bg-green-600 h-12 w-28 grid place-content-center hover:bg-green-400 cursor-default">
      <p className=" text-white text-md">RUNNING</p>
    </div>
  );
}
