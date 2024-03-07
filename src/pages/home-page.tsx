import { HandCoins, ScanBarcode, ScrollText, Settings, Store, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-black.png";
import HeaderActionIcons from "../layout/header-action-icons";
import Clock from "../components/clock";
import useTheme from "../stores/theme";

const NAVIGATIONS = [
  {
    name: "Point de vente",
    path: "/dash/pos",
    icon: <Store size="100%" />,
  },
  {
    name: "Produits",
    path: "/dash/products",
    icon: <ScanBarcode size="100%" />,
  },
  {
    name: "Ventes",
    path: "/dash/sales",
    icon: <HandCoins size="100%" />,
  },
  {
    name: "Clients",
    path: "/dash/clients",
    icon: <UsersRound size="100%" />,
  },
  {
    name: "Stock",
    path: "/dash/stock",
    icon: <ScrollText size="100%" />,
  },
  {
    name: "Parametres",
    path: "/",
    icon: <Settings size="100%" />,
  },
];

function HomePage() {
  const { activeTheme, headerStyle } = useTheme();
  return (
    <div style={{ color: activeTheme[800] }} className="w-full h-full">
      <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col justify-between h-full w-full items-center">
          <div style={headerStyle} className="relative w-full flex p-3">
            <div id="dragRegion" className="absolute left-0 top-0 w-full h-full bg-red-0 z-0" />

            <div className="w-full flex items-center">
              <Clock />
            </div>

            <div className="w-fit flex justify-end items-start">
              <HeaderActionIcons />
            </div>
          </div>

          <div style={{ backgroundColor: activeTheme[50] }} className="flex flex-col items-center  rounded-2xl divide-y">
            <div className="font-bold text-2xl p-5 w-2/3 mx-auto text-center">NOM STRUCTURE</div>
            <div className="grid grid-cols-3 gap-5 p-5">
              {NAVIGATIONS.map((nav, i) => (
                <NavLink
                  key={i}
                  to={nav.path}
                  style={{ backgroundColor: activeTheme[100] }}
                  className="aspect-square w-36 p-0 rounded-xl flex flex-col gap-4 justify-center items-center  scale-100 hover:shadow-lg hover:scale-110"
                >
                  <div className="w-14 h-14">{nav.icon}</div>
                  <div className="text-xs">{nav.name}</div>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="w-full flex flex-col gap-1 justify-center items-center p-5 text-black">
            <div>
              <img src={logo} className="h-6" />
            </div>
            <div className="text-xs">Developper par Babacar, Tout les droits sont reserver</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
