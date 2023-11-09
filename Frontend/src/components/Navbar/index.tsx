import Dropdown from "./Dropdown";

export default function Navbar() {
  return (
    <div className="flex justify-end items-center px-10 py-3 shadow-lg bg-slate-100">
      <Dropdown />
    </div>
  );
}
