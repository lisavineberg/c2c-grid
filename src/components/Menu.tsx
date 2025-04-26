import Link from "next/link";

const Menu = () => {
  return (
    <div className="menu">
      <Link href="/">Home</Link>
      <Link href="/accounts">Accounts</Link>
    </div>
  );
};
export default Menu;
