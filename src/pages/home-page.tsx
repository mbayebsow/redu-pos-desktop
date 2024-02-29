import { Fullscreen, HandCoins, ScanBarcode, ScrollText, Settings, Store, User, UsersRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "../components/ui/button";
import Calculator from "../components/calculator/calculator";
import logo from "../assets/logo-black.png";

const NAVIGATIONS = [
  {
    name: "Point de vente",
    path: "/i/pos",
    icon: <Store size="100%" />,
  },
  {
    name: "Produits",
    path: "/i/products",
    icon: <ScanBarcode size="100%" />,
  },
  {
    name: "Ventes",
    path: "/i/sales",
    icon: <HandCoins size="100%" />,
  },
  {
    name: "Clients",
    path: "/i/clients",
    icon: <UsersRound size="100%" />,
  },
  {
    name: "Stock",
    path: "/i/stock",
    icon: <ScrollText size="100%" />,
  },
  {
    name: "Parametres",
    path: "/",
    icon: <Settings size="100%" />,
  },
];

function HomePage() {
  return (
    <div className="w-full h-full bg-[url('https://images6.alphacoders.com/132/1322314.jpeg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-full flex justify-center items-center bg-primary-100/30">
        <div className="flex flex-col justify-between h-full w-full items-center">
          <div className="w-full flex bg-gradient-to-b from-primary-50 p-3">
            <div className="w-1/3 flex justify-start items-start">Boutique</div>

            <div className="text-center w-2/3 font-bold flex flex-col justify-center items-center">
              <img className=" h-20" src="https://seeklogo.com/images/B/black-company-logo-C40022C4D5-seeklogo.com.png" />
            </div>

            <div className="w-1/3 flex justify-end items-start">
              <div className="flex items-center gap-3">
                <Calculator />
                <Button roundedBorder="full" variant="icon" icon={<User />} />
                <Button roundedBorder="full" variant="icon" icon={<Fullscreen />} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {NAVIGATIONS.map((nav, i) => (
              <NavLink
                key={i}
                to={nav.path}
                className="aspect-square w-36 bg-primary-50 p-0 rounded-xl fill-primary-600 flex flex-col gap-4 justify-center items-center  scale-100 hover:shadow-xl hover:scale-110"
              >
                <div className="w-14 h-14">{nav.icon}</div>
                <div className="text-xs">{nav.name}</div>
              </NavLink>
            ))}
          </div>
          <div className="w-full flex flex-col gap-1 justify-center items-center bg-gradient-to-t from-primary-50 p-5">
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
