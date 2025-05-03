
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { Edit, ChevronLeft, Save } from "lucide-react";
import { UserDetailsForm } from "@/components/Users/UserDetailsForm";
import { useUserDetails } from "@/hooks/useUserDetails";

const UserDetailsPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user, isLoading, updateUser } = useUserDetails(userId);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = (userData: any) => {
    updateUser(userData);
    setIsEditing(false);
    toast({
      title: t("users.updateSuccess"),
      description: t("users.userUpdated"),
    });
  };

  if (isLoading) {
    return (
      <DashboardLayout title={t("users.loading")} description="">
        <div className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">{t("common.loading")}</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout title={t("users.notFound")} description="">
        <div className="flex flex-col items-center justify-center h-40 space-y-4">
          <p className="text-muted-foreground">{t("users.userNotFound")}</p>
          <Button onClick={() => navigate("/users")}>
            {t("common.goBack")}
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title={user.name}
      description={t("users.userDetails")}
      actions={
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => navigate("/users")}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t("common.back")}
          </Button>
          {isEditing ? (
            <Button form="user-details-form" type="submit">
              <Save className="h-4 w-4 mr-1" />
              {t("common.save")}
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" />
              {t("common.edit")}
            </Button>
          )}
        </div>
      }
    >
      <UserDetailsForm 
        user={user} 
        isEditing={isEditing} 
        onSubmit={handleSaveChanges} 
      />
    </DashboardLayout>
  );
};

export default UserDetailsPage;
