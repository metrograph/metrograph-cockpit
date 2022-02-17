export default function ButtonCreate(props) {
  return (
    <div className="bg-brand-dark-button h-12  w-40 border-2 border-white grid place-content-center cursor-pointer hover:bg-zinc-500">
      <p className=" text-white px-4 text-md">{props.text}</p>
    </div>
  );
}
