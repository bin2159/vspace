import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TicketDialog } from "./TicketDialogue";
import SideBarWrapper from "@/components/resusable/SideBarWrapper/SideBarWrapper";

export default function TicketBoard() {
  const statuses = ["To Do", "In Progress", "Done"]; // Ticket statuses

  const tickets = {
    "To Do": [
      { title: "Task 1", assignee: "John Doe" },
      { title: "Task 2", assignee: "Alice Smith" },
    ],
    "In Progress": [{ title: "Task 3", assignee: "Michael Brown" }],
    Done: [{ title: "Task 4", assignee: "Emma Johnson" }],
  }; // Example ticket data

  const allAssignees = [
    ...new Set(
      Object.values(tickets)
        .flat()
        .map((ticket) => ticket.assignee)
    ),
  ]; // Unique list of all assignees

  const [selectedAssignee, setSelectedAssignee] = useState("All"); // Current filter

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

  return (
    <SideBarWrapper>
      <div className="flex flex-col h-full p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Ticket Board</h1>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>{selectedAssignee}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  {allAssignees.map((assignee, index) => (
                    <DropdownMenuItem
                      key={index}
                      value={assignee}
                      onSelect={() => {setSelectedAssignee(assignee)}}
                    >
                      {assignee}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Create Ticket Button */}
            <TicketDialog />
          </div>
        </div>

        {/* Ticket Board */}
        <div className="flex flex-1 gap-4 overflow-x-auto">
          {statuses.map((status) => (
            <div
              key={status}
              className="flex flex-col w-1/3 bg-gray-100 p-4 rounded-lg shadow-md"
            >
              {/* Column Header */}
              <h2 className="text-lg font-semibold mb-4">{status}</h2>

              {/* Ticket List */}
              <div className="flex flex-col gap-2">
                {filteredTickets[status]?.length > 0 ? (
                  filteredTickets[status].map((ticket, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm border hover:shadow-md"
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
                  ))
                ) : (
                  <div className="text-gray-500 italic">No tickets</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SideBarWrapper>
  );
}
