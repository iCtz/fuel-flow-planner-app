
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useZones } from "@/hooks/useZones";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => void;
}

export function AddUserDialog({ open, onOpenChange, onSubmit }: AddUserDialogProps) {
  const { t } = useTranslation();
  const { zones } = useZones();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "field_team",
      zoneId: "",
    },
  });

  const handleSubmit = (data: any) => {
    onSubmit({
      id: `user-${Date.now()}`,
      ...data,
    });
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("users.addUser")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("users.name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("users.namePlaceholder")} {...field} />
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
                    <Input type="email" placeholder={t("users.emailPlaceholder")} {...field} />
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
            <DialogFooter>
              <Button type="submit">{t("common.save")}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
