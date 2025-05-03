
import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { UserTable } from "@/components/Users/UserTable";
import { AddUserDialog } from "@/components/Users/AddUserDialog";
import { useUsers } from "@/hooks/useUsers";

const UsersPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { users, isLoading, addUser, deleteUser } = useUsers();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddUser = (userData: any) => {
    addUser(userData);
    setIsAddDialogOpen(false);
    toast({
      title: t("users.addSuccess"),
      description: t("users.userAdded"),
    });
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
    toast({
      title: t("users.deleteSuccess"),
      description: t("users.userDeleted"),
    });
  };

  return (
    <DashboardLayout
      title={t("users.title")}
      description={t("users.description")}
      actions={
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-1" />
          {t("users.addUser")}
        </Button>
      }
    >
      <UserTable 
        users={users} 
        isLoading={isLoading} 
        onDeleteUser={handleDeleteUser} 
      />
      
      <AddUserDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddUser}
      />
    </DashboardLayout>
  );
};

export default UsersPage;
