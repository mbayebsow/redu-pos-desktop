interface CardNumberProps {
  title: string;
  content: number;
  focus?: boolean;
}

function CardNumber({ title, content, focus = false }: CardNumberProps) {
  return (
    <div className={`m-2 rounded-md w-auto text-white font-semibold py-2 px-2 ${focus ? "bg-primary-200 text-primary-900" : " bg-primary-700"}`}>
      <div className="text-xs">{title}</div>
      <div>
        <div className="text-3xl -mt-1 text-right font-bold"> {content} </div>
      </div>
    </div>
  );
}

export default CardNumber;
