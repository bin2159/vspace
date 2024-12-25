import Ticket from "./Ticket";

export default function TicketColumn({ status, tickets, setTickets }) {
  return (
    <div className="flex flex-col w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
      {/* Column Header */}
      <h2 className="text-lg font-semibold mb-4">{status}</h2>

      {/* Ticket List */}
      <div className="flex flex-col gap-2">
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <Ticket
              key={index}
              ticket={ticket}
              setTickets={setTickets}
              currentStatus={status}
            />
          ))
        ) : (
          <div className="text-gray-500 italic">No tickets</div>
        )}
      </div>
    </div>
  );
}
