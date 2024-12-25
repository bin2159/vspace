import { useState } from "react";
import { DndProvider} from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropdownWrapper from "@/components/resusable/SideBarWrapper/DropdownWrapper";
import { TicketDialog } from "./TicketDialogue";
import SideBarWrapper from "@/components/resusable/SideBarWrapper/SideBarWrapper";
import TicketDetailsModal from "./TicketDetailsModal";
import TicketColumn from "./TicketColumn";

export default function TicketBoard() {
  const statuses = ["To Do", "In Progress", "Done"]; // Ticket statuses

  const [tickets, setTickets] = useState({
    "To Do": [
      { title: "Task 1", assignee: "John Doe", description: "This is Task 1 description." },
      { title: "Task 2", assignee: "Alice Smith", description: "This is Task 2 description." },
    ],
    "In Progress": [
      { title: "Task 3", assignee: "Michael Brown", description: "This is Task 3 description." },
    ],
    Done: [{ title: "Task 4", assignee: "Emma Johnson", description: "This is Task 4 description." }],
  });

  const [selectedTicket, setSelectedTicket] = useState(null); // Ticket for modal display
  const allAssignees = [
    ...new Set(
      Object.values(tickets)
        .flat()
        .map((ticket) => ticket.assignee)
    ),
  ];

  const [selectedAssignee, setSelectedAssignee] = useState("All");

  // Filter tickets by assignee
  const filteredTickets =
    selectedAssignee === "All"
      ? tickets
      : Object.fromEntries(
          Object.entries(tickets).map(([status, ticketList]) => [
            status,
            ticketList.filter((ticket) => ticket.assignee === selectedAssignee),
          ])
        );

  // Handle ticket status change
  const moveTicket = (ticket, newStatus) => {
    setTickets((prevTickets) => {
      const updatedTickets = { ...prevTickets };

      // Remove ticket from the current status
      for (const status in updatedTickets) {
        updatedTickets[status] = updatedTickets[status].filter(
          (t) => t.title !== ticket.title
        );
      }

      // Add ticket to the new status
      updatedTickets[newStatus] = [...updatedTickets[newStatus], ticket];

      return updatedTickets;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <SideBarWrapper>
        <div className="flex flex-col h-full p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Ticket Board</h1>
            <div className="flex items-center gap-4">
              <DropdownWrapper
                buttonName={selectedAssignee}
                menuItems={["All", ...allAssignees]}
                onSelect={setSelectedAssignee} // Pass the setter function
              />
              {/* Create Ticket Button */}
              <TicketDialog setterFunction={setTickets} />
            </div>
          </div>

          {/* Ticket Board */}
          <div className="flex flex-1 gap-4 overflow-x-auto">
            {statuses.map((status) => (
              <TicketColumn
                key={status}
                status={status}
                tickets={filteredTickets[status] || []}
                moveTicket={moveTicket}
                setSelectedTicket={setSelectedTicket}
              />
            ))}
          </div>
        </div>

        {/* Ticket Details Modal */}
        {selectedTicket && (
          <TicketDetailsModal
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </SideBarWrapper>
    </DndProvider>
  );
}

// function Column({ status, tickets, moveTicket, setSelectedTicket }) {
//   const [, dropRef] = useDrop({
//     accept: ITEM_TYPE,
//     drop: (item) => moveTicket(item, status),
//   });

//   return (
//     <div
//       ref={dropRef}
//       className="flex flex-col w-1/3 bg-gray-100 p-4 rounded-lg shadow-md"
//     >
//       {/* Column Header */}
//       <h2 className="text-lg font-semibold mb-4">{status}</h2>

//       {/* Ticket List */}
//       <div className="flex flex-col gap-2">
//         {tickets.length > 0 ? (
//           tickets.map((ticket, index) => (
//             <Ticket
//               key={index}
//               ticket={ticket}
//               setSelectedTicket={setSelectedTicket}
//             />
//           ))
//         ) : (
//           <div className="text-gray-500 italic">No tickets</div>
//         )}
//       </div>
//     </div>
//   );
// }

// function Ticket({ ticket, setSelectedTicket }) {
//   const [{ isDragging }, dragRef] = useDrag({
//     type: ITEM_TYPE,
//     item: ticket,
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={dragRef}
//       onClick={() => setSelectedTicket(ticket)}
//       className={`flex items-center justify-between p-4 bg-white rounded-md shadow-sm border hover:shadow-md cursor-pointer ${
//         isDragging ? "opacity-50" : "opacity-100"
//       }`}
//     >
//       {/* Ticket Title */}
//       <div className="text-sm font-medium">{ticket.title}</div>

//       {/* Assignee Circle */}
//       <div
//         className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-xs"
//         title={ticket.assignee}
//       >
//         {ticket.assignee
//           .split(" ")
//           .map((name) => name[0])
//           .join("")
//           .toUpperCase()}
//       </div>
//     </div>
//   );
// }
