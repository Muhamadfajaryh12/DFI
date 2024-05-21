interface Header {
  title: string;
  toggle: () => void;
}

const Header = (props: Header) => {
  const { title, toggle } = props;
  return (
    <div id="header" className="w-full flex">
      <button className=" p-2 rounded-md" onClick={toggle}>
        <span className="pi pi-bars"></span>
      </button>
      <h1 className="text-2xl m-2 font-semibold">{title}</h1>
    </div>
  );
};

export default Header;
