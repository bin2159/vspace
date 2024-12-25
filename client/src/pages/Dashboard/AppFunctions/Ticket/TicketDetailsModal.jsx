import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TicketDetailsModal({ ticket, onClose }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{ticket.title}</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Description:</strong> {ticket.description}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Assignee:</strong> {ticket.assignee}
          </p>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
