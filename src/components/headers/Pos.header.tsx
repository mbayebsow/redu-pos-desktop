export default function PosHeader() {
  return (
    <div className="relative h-12 p-3 bg-white shadow">
      <div className="h-full flex font-bold flex-row relative gap-3">
        <button className="rounded-md flex flex-row justify-center items-center bg-green-500 text-white">
          <div className="text-xs px-2 font-semibold">Produits</div>
          <div className="h-full bg-blue-gray-900 w-7 px-2 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M11.499 12.03v11.971l-10.5-5.603v-11.835l10.5 5.467zm11.501 6.368l-10.501 5.602v-11.968l10.501-5.404v11.77zm-16.889-15.186l10.609 5.524-4.719 2.428-10.473-5.453 4.583-2.499zm16.362 2.563l-4.664 2.4-10.641-5.54 4.831-2.635 10.474 5.775z" />
            </svg>
          </div>
        </button>

        <button className="rounded-md flex flex-row justify-center items-center bg-blue-600 text-white">
          <div className="text-xs px-2 font-semibold">Ventes</div>
          <div className="h-full bg-blue-gray-900 w-7 px-2 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M18.799 7.038c-.496-.535-.799-1.252-.799-2.038 0-1.656 1.344-3 3-3s3 1.344 3 3-1.344 3-3 3c-.146 0-.29-.01-.431-.031l-3.333 6.032c.475.53.764 1.231.764 1.999 0 1.656-1.344 3-3 3s-3-1.344-3-3c0-.583.167-1.127.455-1.587l-2.565-3.547c-.281.087-.58.134-.89.134l-.368-.022-3.355 6.069c.451.525.723 1.208.723 1.953 0 1.656-1.344 3-3 3s-3-1.344-3-3 1.344-3 3-3c.186 0 .367.017.543.049l3.298-5.967c-.52-.539-.841-1.273-.841-2.082 0-1.656 1.344-3 3-3s3 1.344 3 3c0 .617-.187 1.191-.507 1.669l2.527 3.495c.307-.106.637-.164.98-.164.164 0 .325.013.482.039l3.317-6.001zm-3.799 7.962c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-6-8c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
            </svg>
          </div>
        </button>

        <button className="rounded-md flex flex-row justify-center items-center bg-pink-500 text-white">
          <div className="text-xs px-2 font-semibold">Clients</div>
          <div className="h-full bg-blue-gray-900 w-7 px-2 text-white rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" />
            </svg>
          </div>
        </button>

        <input
          type="text"
          className="bg-blue-gray-50 rounded-md text-sm w-full p-2 transition-shadow focus:shadow-2xl focus:outline-none"
          placeholder="Recherche"
        />
      </div>
    </div>
  );
}
