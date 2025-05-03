
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { User } from "@/types/hierarchy";

// Mock data for users
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "admin",
  },
  {
    id: "user-2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "supervisor",
    zoneId: "zone-1"
  },
  {
    id: "user-3",
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    role: "field_team",
    zoneId: "zone-2"
  },
  {
    id: "user-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "field_team",
    zoneId: "zone-1"
  }
];

export function useUsers() {
  const { t } = useTranslation();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const addUser = (userData: User) => {
    setUsers([...users, userData]);
  };

  const updateUser = (userId: string, userData: Partial<User>) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return {
    users,
    isLoading,
    addUser,
    updateUser,
    deleteUser
  };
}
