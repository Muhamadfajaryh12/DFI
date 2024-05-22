interface Header {
  title: string;
  toggle: () => void;
}

const Header = (props: Header) => {
  const { title, toggle } = props;
  return (
    <div id="header" className="w-full flex bg-white p-1">
      <button className=" p-2 rounded-md" onClick={toggle}>
        <span className="pi pi-bars"></span>
      </button>
      <h3 className="text-xl m-2 font-semibold">{title}</h3>
    </div>
  );
};

export default Header;
