
import { useState, useCallback, ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmDialogOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function useConfirmDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmDialogOptions>({
    title: '',
    description: '',
    confirmLabel: 'Continue',
    cancelLabel: 'Cancel',
    variant: 'default',
  });

  const showConfirmDialog = useCallback((dialogOptions: ConfirmDialogOptions) => {
    setOptions(dialogOptions);
    setIsOpen(true);
  }, []);

  const handleConfirm = useCallback(() => {
    if (options.onConfirm) {
      options.onConfirm();
    }
    setIsOpen(false);
  }, [options]);

  const handleCancel = useCallback(() => {
    if (options.onCancel) {
      options.onCancel();
    }
    setIsOpen(false);
  }, [options]);

  const ConfirmDialog = useCallback(() => {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
            <AlertDialogDescription>{options.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>{options.cancelLabel}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={options.variant === 'destructive' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
            >
              {options.confirmLabel}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }, [isOpen, options, handleConfirm, handleCancel]);

  return {
    showConfirmDialog,
    ConfirmDialog,
  };
}
