import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

export function NavMenuBar({ children,userRole }) {
    const {logout} = useContext(AuthContext);
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger>{children}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem><Link to={`${userRole=="Admin"?"/admin":"/user"}`}> Profile</Link></MenubarItem>
          <MenubarItem> <span onClick={()=>logout()}>Log out </span></MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
