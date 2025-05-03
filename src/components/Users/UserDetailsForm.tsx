
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useZones } from "@/hooks/useZones";
import { User } from "@/types/hierarchy";

interface UserDetailsFormProps {
  user: User;
  isEditing: boolean;
  onSubmit: (data: any) => void;
}

export function UserDetailsForm({ user, isEditing, onSubmit }: UserDetailsFormProps) {
  const { t } = useTranslation();
  const { zones } = useZones();
  
  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      zoneId: user.zoneId || "",
    },
  });

  return (
    <Form {...form}>
      <form id="user-details-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("users.name")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("users.namePlaceholder")}
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("users.email")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("users.emailPlaceholder")}
                        disabled={!isEditing}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("users.role")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("users.selectRole")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">{t("users.roles.admin")}</SelectItem>
                        <SelectItem value="supervisor">{t("users.roles.supervisor")}</SelectItem>
                        <SelectItem value="field_team">{t("users.roles.field_team")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zoneId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("users.assignedZone")}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!isEditing}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("users.selectZone")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">{t("users.noZone")}</SelectItem>
                        {zones.map((zone) => (
                          <SelectItem key={zone.id} value={zone.id}>
                            {typeof zone.name === 'string' ? zone.name : zone.name.en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
