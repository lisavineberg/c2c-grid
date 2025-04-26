import Link from "next/link";

function Menu() {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Link href="/">Home</Link>
      <Link href="/accounts">Accounts</Link>
    </div>
  );
}

export default Menu;
