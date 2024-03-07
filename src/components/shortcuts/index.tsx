import { useNavigate } from "react-router-dom";
import Dropdown from "../ui/dropdown";

const SHORTCUTS = [
  {
    name: "Point de vente",
    group: "pages",
    action: "/i/pos",
    icon: "",
  },
  {
    name: "Produits",
    group: "pages",
    action: "/i/products",
    icon: "",
  },
  {
    name: "Ventes",
    group: "pages",
    action: "/i/sales",
    icon: "",
  },
  {
    name: "Clients",
    group: "pages",
    action: "/i/clients",
    icon: "",
  },
  {
    name: "Stock",
    group: "pages",
    action: "/i/stock",
    icon: "",
  },
];

function Shortcuts() {
  const navigate = useNavigate();

  return (
    <div>
      <Dropdown variant="tonal" label="Racourcis">
        <div>
          <div className="opacity-50">Pages</div>
          <div className="pl-2 mt-1">
            {SHORTCUTS.map((shortcut, i) => (
              <button
                key={i}
                onClick={() => navigate(shortcut.action)}
                className="text-left w-full whitespace-nowrap py-1 px-2 rounded-md hover:bg-primary-50"
              >
                {shortcut.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="opacity-50">Actions</div>
          <ul className="pl-2 mt-1">
            <li className="whitespace-nowrap">A venir</li>
          </ul>
        </div>
      </Dropdown>
    </div>
  );
}

export default Shortcuts;
