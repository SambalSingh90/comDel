import React from "react";
import { useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MapPin } from "lucide-react";

// User interface definition
interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  location?: string;
}

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void; // Callback to update the UI after delete
}

// UserCard component with DELETE functionality
export const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/people`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id }),
        });

        if (response.ok) {
          onDelete(user.id); // Update UI using the parent callback
        } else {
          console.error("Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
            alt={user.name}
          />
          <AvatarFallback>
            {user.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <Badge variant="secondary" className="w-fit mt-1">
            ID: {user.id}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-muted-foreground" />
          <span>{user.phoneNumber}</span>
        </div>
        {user.email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
        )}
        {user.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{user.location}</span>
          </div>
        )}
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="delete-button mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </CardContent>
    </Card>
  );
};
