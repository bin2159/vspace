import Ticket from "./Ticket";
const ITEM_TYPE = "TICKET";
import { useDrop } from "react-dnd";
export default function TicketColumn({ status, tickets, moveTicket, setSelectedTicket }) {
  const [, dropRef] = useDrop({
    accept: ITEM_TYPE,
    drop: (item) => moveTicket(item, status),
  });

  return (
    <div
      ref={dropRef}
      className="flex flex-col w-1/3 bg-gray-100 p-4 rounded-lg shadow-md"
    >
      {/* Column Header */}
      <h2 className="text-lg font-semibold mb-4">{status}</h2>

      {/* Ticket List */}
      <div className="flex flex-col gap-2">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <Ticket
              key={index}
              ticket={ticket}
              setSelectedTicket={setSelectedTicket}
            />
          ))
        ) : (
          <div className="text-gray-500 italic">No tickets</div>
        )}
      </div>
    </div>
  );
}
