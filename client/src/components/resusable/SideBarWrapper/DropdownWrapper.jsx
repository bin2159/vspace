import { Button } from "@/components/ui/button"; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DropdownWrapper({ buttonName, menuItems, onSelect }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>{buttonName}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {menuItems.map((item, index) => (
            <DropdownMenuItem
              key={index}
              value={item}
              onSelect={() => onSelect(item)}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
