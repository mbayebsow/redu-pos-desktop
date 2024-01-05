interface CardNumberProps {
  title: string;
  content: number;
  bg?: string;
}

function CardNumber({ title, content, bg }: CardNumberProps) {
  return (
    <div className={`m-2 rounded-md w-auto text-white font-semibold py-2 px-2 ${bg ? bg : "bg-zinc-700"}`}>
      <div className="text-xs">{title}</div>
      <div>
        <div className="text-3xl -mt-1 text-right font-bold"> {content} </div>
      </div>
    </div>
  );
}

export default CardNumber;
