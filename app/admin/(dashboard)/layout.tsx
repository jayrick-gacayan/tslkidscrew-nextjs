import { ReactNode } from "react";
import DrawerRoot from "./_sections/drawer-root";

export default function Layout({ children }: { children: ReactNode }) {

  return (<DrawerRoot>{children}</DrawerRoot>);
}