import Search from "../Search/Search";

const Header = (props: any) => {
  return (
    <div className="flex items-center">
      <h1 className="w-[300px]">{props.title}</h1>
      <div className="w-full flex justify-end gap-4">
        <Search slug={props.slug} handleSearch={props.handleSearch} />
      </div>
    </div>
  );
};

export default Header;
