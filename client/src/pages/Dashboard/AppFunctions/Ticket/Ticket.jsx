import { useDrag } from "react-dnd";
const ITEM_TYPE = "TICKET";

export default function Ticket({ ticket, setSelectedTicket }) {
  const [{ isDragging }, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: ticket,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      onClick={() => setSelectedTicket(ticket)}
      className={`flex items-center justify-between p-4 bg-white rounded-md shadow-sm border hover:shadow-md cursor-pointer ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Ticket Title */}
      <div className="text-sm font-medium">{ticket.title}</div>

      {/* Assignee Circle */}
      <div
        className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs"
        title={ticket.assignee}
      >
        {ticket.assignee
          .split(" ")
          .map((name) => name[0])
          .join("")
          .toUpperCase()}
      </div>
    </div>
  );
}
