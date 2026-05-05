import SidebarNav from "./SidebarNav";
import SidebarFooter from "./SidebarFooter";
import Image from "next/image";
import logo from "@/public/images/mozshaq-logo.png";

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-64 border-r border">
      <div className="flex flex-col h-full w-full">
        {/* Logo */}
        {/* <div className="h-16 flex items-center px-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="font-bold text-base">Mozshaq</h1>
              <p className="text-[10px] text-slate-400 uppercase">
                Gestão do portal
              </p>
            </div>
          </div>
        </div> */}

        <div className="flex items-center justify-center py-3.5 border-b border-slate-200">
          <Image src={logo} alt="MozShaq Logo" width={160} />
        </div>
        <SidebarNav />
        <SidebarFooter />
      </div>
    </aside>
  );
}
