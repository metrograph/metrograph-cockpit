export default function TextInput(props) {
  return (
    <div className="w-96">
      <div class="w-96 border-2 border-t-0 border-brand-dark-button absolute mt-2">
        <input
          className=" bg-transparent focus:outline-none h-8 text-white px-4 my-2  w-full text-lg"
          placeholder={props.placeholder}
        />
      </div>
      <div className="flex flex-row items-center space-x-2">
        <div className="w-2 border-t-2 border-brand-dark-button" />
        <p className="text-brand-dark-button text-xs flex-shrink-0">
          {props.title}
        </p>
        <div className="w-full border-t-2 border-brand-dark-button" />
      </div>
    </div>
  );
}
