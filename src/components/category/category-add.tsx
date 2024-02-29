import { CategoryType } from "../../utils/types";
import TextField from "../ui/text-field";

interface CategoryAddProps {
  categorySate: CategoryType;
  setCategoryState: (category: any) => any;
}

const COLOR = [
  "#917a97",
  "#9299b1",
  "#ae3ce5",
  "#d8fe9f",
  "#27216c",
  "#3d22fb",
  "#72241f",
  "#1e8275",
  "#634747",
  "#6cd7e8",
  "#5aacc8",
  "#e41351",
  "#90d19c",
  "#937591",
  "#18d420",
  "#0a7b75",
  "#dc27f4",
  "#4e5421",
  "#a57ef3",
  "#dbfcff",
  "#312345",
  "#144dc8",
  "#759338",
  "#c9d265",
  "#ee9f50",
  "#b2c12a",
  "#5612fe",
  "#cd973b",
  "#5225da",
  "#770112",
  "#ad8401",
  "#52223f",
  "#3f4df8",
  "#6754ab",
  "#97dcb7",
  "#78a4bc",
  "#a57d3f",
  "#a19b47",
  "#625511",
  "#ba005a",
];

function CategoryAdd({ categorySate, setCategoryState }: CategoryAddProps) {
  return (
    <div className="p-3 flex flex-col gap-5">
      <div className="grid grid-cols-8 gap-3">
        {COLOR.map((color, i) => (
          <div
            key={i}
            onClick={() => setCategoryState((prev: any) => ({ ...prev, color: color }))}
            className={`w-9 h-9  rounded-full p-1 ${categorySate.color === color && "border-2 border-red-500"}`}
          >
            <div style={{ backgroundColor: color }} className="w-full h-full rounded-full" />
          </div>
        ))}
      </div>
      <TextField
        label="Nom de la categorie"
        name="name"
        type="text"
        value={categorySate.name}
        onChange={(e) => setCategoryState((prev: any) => ({ ...prev, name: e.target.value }))}
      />
    </div>
  );
}

export default CategoryAdd;
