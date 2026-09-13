"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


export const Sidebar = () => {

  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/shop/dashboard" },
    { name: "Orders", href: "/shop/orders" },
    { name: "Products", href: "/shop/products" },
    { name: "Settings", href: "/shop/settings" },
  ];

  return (
    <div className="w-64 h-screen p-4 bg-slate-900 text-slate-100 border-r border-slate-800">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Sidebar</h2>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {

           const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={item.name}
              className={`
                p-2 rounded-md transition ${
                    isActive ? "bg-white text-black font-semibold" : "hover:bg-gray-700"
                }
                `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};