interface Header {
  title: string;
}

const Header = (props: Header) => {
  const { title } = props;
  return (
    <div id="header" className="w-full">
      <h1 className="text-2xl m-2 font-semibold">{title}</h1>
    </div>
  );
};

export default Header;
