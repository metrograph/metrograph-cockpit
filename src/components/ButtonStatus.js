export default function ButtonStatus(props) {
  if (props.status === "ready") {
    return (
      <div className="bg-brand-dark-button h-12 w-28 grid place-content-center">
        <span className=" text-white text-md">READY</span>
      </div>
    );
  }
  return (
    <div className=" bg-cock-green h-12 w-28 grid place-content-center ">
      <span className=" text-white text-md">RUNNING</span>
    </div>
  );
}
