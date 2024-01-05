import { NavLink } from "react-router-dom";

const NAVIGATIONS = [
  {
    name: "PDV",
    path: "/",
    color: "green",
    icon: (
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path
          d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z"
          fillRule="nonzero"
        />
      </svg>
    ),
  },
  {
    name: "Produits",
    path: "/products",
    color: "red",
    icon: (
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path d="M11.499 12.03v11.971l-10.5-5.603v-11.835l10.5 5.467zm11.501 6.368l-10.501 5.602v-11.968l10.501-5.404v11.77zm-16.889-15.186l10.609 5.524-4.719 2.428-10.473-5.453 4.583-2.499zm16.362 2.563l-4.664 2.4-10.641-5.54 4.831-2.635 10.474 5.775z" />
      </svg>
    ),
  },
  {
    name: "Ventes",
    path: "/sales",
    color: "blue",
    icon: (
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.304-15l-3.431 12h-2.102l2.542-9h-16.813l4.615 11h13.239l3.474-12h1.929l.743-2h-4.196z" />{" "}
      </svg>
    ),
  },
  {
    name: "Clients",
    path: "/clients",
    color: "pink",
    icon: (
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path d="M10.644 17.08c2.866-.662 4.539-1.241 3.246-3.682-3.932-7.427-1.042-11.398 3.111-11.398 4.235 0 7.054 4.124 3.11 11.398-1.332 2.455.437 3.034 3.242 3.682 2.483.574 2.647 1.787 2.647 3.889v1.031h-18c0-2.745-.22-4.258 2.644-4.92zm-12.644 4.92h7.809c-.035-8.177 3.436-5.313 3.436-11.127 0-2.511-1.639-3.873-3.748-3.873-3.115 0-5.282 2.979-2.333 8.549.969 1.83-1.031 2.265-3.181 2.761-1.862.43-1.983 1.34-1.983 2.917v.773z" />{" "}
      </svg>
    ),
  },
  {
    name: "Stock",
    path: "/stock",
    color: "orange",
    icon: (
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path d="M3.44 1.999l-.439-1.999h17.994l-.439 1.999h-17.116zm-3.44 6.001l2.035 16h19.868l2.097-16h-24zm22.255-2l.371-2h-21.256l.371 2h20.514z" />{" "}
      </svg>
    ),
  },
];

function ApptNav() {
  return (
    <div className="w-20 h-full bg-black flex flex-col gap-10">
      <div className="aspect-square w-full  flex justify-center items-center text-white/50 h-12 bg-emerald-500 p-3">
        <div className="text-xl font-bold">REDU</div>
      </div>

      <div className="h-full flex flex-col justify-center items-center gap-5 p-2">
        {NAVIGATIONS.map((nav, i) => (
          <NavLink
            key={i}
            to={nav.path}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-slate-50 text-black translate-x-2 rounded-tl-md rounded-bl-md"
                  : `bg-${nav.color}-500/0 text-white fill-white translate-x-0 rounded-md`
              } aspect-square p-2  w-full flex flex-col gap-2 justify-center items-center transition-all`
            }
          >
            {nav.icon}
            <span className="text-xs"> {nav.name} </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ApptNav;
