import { Outlet } from "react-router";
import { Header } from "../headers/Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
