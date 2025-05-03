
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { User } from "@/types/hierarchy";
import { useUsers } from "@/hooks/useUsers";

export function useUserDetails(userId: string | undefined) {
  const { t } = useTranslation();
  const { users, updateUser: updateUserInList } = useUsers();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    // Simulate API loading delay
    const timer = setTimeout(() => {
      const foundUser = users.find(u => u.id === userId) || null;
      setUser(foundUser);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId, users]);

  const updateUser = (userData: Partial<User>) => {
    if (user && userId) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      updateUserInList(userId, userData);
    }
  };

  return {
    user,
    isLoading,
    updateUser
  };
}
