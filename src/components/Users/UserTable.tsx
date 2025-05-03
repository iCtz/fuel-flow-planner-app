
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Edit, Trash2, User } from "lucide-react";
import { User as UserType } from "@/types/hierarchy";
import { Badge } from "@/components/ui/badge";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";

interface UserTableProps {
  users: UserType[];
  isLoading: boolean;
  onDeleteUser: (userId: string) => void;
}

export function UserTable({ users, isLoading, onDeleteUser }: UserTableProps) {
  const { t } = useTranslation();
  const { showConfirmDialog } = useConfirmDialog();

  const handleDeleteClick = (user: UserType) => {
    showConfirmDialog({
      title: t("users.confirmDelete"),
      description: t("users.deleteConfirmText", { name: user.name }),
      confirmLabel: t("common.delete"),
      cancelLabel: t("common.cancel"),
      variant: "destructive",
      onConfirm: () => onDeleteUser(user.id),
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-500";
      case "supervisor": return "bg-blue-500";
      case "field_team": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("users.name")}</TableHead>
            <TableHead>{t("users.email")}</TableHead>
            <TableHead>{t("users.role")}</TableHead>
            <TableHead>{t("users.zone")}</TableHead>
            <TableHead className="text-right">{t("common.actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                {t("users.noUsers")}
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    {user.name}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                    {t(`users.roles.${user.role}`)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.zoneId ? (
                    <Link to={`/zones/${user.zoneId}`} className="text-blue-500 hover:underline">
                      {t("users.viewZone")}
                    </Link>
                  ) : (
                    <span className="text-muted-foreground">{t("users.noZone")}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link to={`/users/${user.id}`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">{t("common.edit")}</span>
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">{t("common.delete")}</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
