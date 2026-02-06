import Image from "next/image";

export default function SidebarFooter() {
  return (
    <div className=" border-t">
      <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50  rounded-lg">
        <Image
          src="https://picsum.photos/id/64/100/100"
          className="w-10 h-10 rounded-full"
          alt="User Avatar"
          width={40}
          height={40}
        />
        <div>
          <p className="text-sm font-bold">William Cossa</p>
          <p className="text-xs text-slate-400">williamcossa@mozshaq.com</p>
        </div>
      </div>
    </div>
  );
}
