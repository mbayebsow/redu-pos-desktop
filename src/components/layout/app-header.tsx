import Calculator from "../calculator/calculator";
import LoadSample from "../load-sample";
import Button from "../ui/button";
import Chips from "../ui/chips";

function AppHeader() {
  return (
    <div className="relative h-18 p-3">
      <div className="h-full flex justify-between relative gap-10 items-center">
        <div className="flex gap-3 items-center text-sm">
          <div className="flex items-center gap-1">
            <div>19 Janvier 2024</div>
            <div>-</div>
            <div>14:30</div>
          </div>
          <div>|</div>
          <div className="flex items-center gap-1">
            <div>20</div>
            <div>-</div>
            <div>Ventes</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LoadSample />
          <Calculator />
          <Button
            separator
            roundedBorder="full"
            variant="tonal"
            text="Salut, Babacar"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
          <Button
            separator
            roundedBorder="full"
            variant="tonal"
            text="Verouiller"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
          />
        </div>
      </div>
    </div>
  );
}
export default AppHeader;
