// Encabezado del chat que muestra información del otro usuario

import { ArrowLeft, Info, Phone, VideoIcon, MoreVertical } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

interface Props {
  otherUser: {
    displayName: string;
    photoURL?: string;
  };
}

export default function ChatHeader({ otherUser }: Props) {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <Link href="/chats">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <Avatar>
          <AvatarImage src={otherUser.photoURL} />
          <AvatarFallback>{otherUser.displayName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">{otherUser.displayName}</h2>
          <p className="text-sm text-muted-foreground">En línea</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon"><VideoIcon className="h-5 w-5" /></Button>
        <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><MoreVertical className="h-5 w-5" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Ver perfil</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Bloquear usuario</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
