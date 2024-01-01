export default function RootHeader() {
  return (
    <div className="relative h-12 p-3 bg-white shadow">
      <div className="h-full flex relative gap-10 items-center">
        <div>Salut, Babacar</div>

        <input type="text" className="bg-blue-gray-50 rounded-md text-sm w-1/3 p-2" placeholder="Rechercher un produit" />
      </div>
    </div>
  );
}
