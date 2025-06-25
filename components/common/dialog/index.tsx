import React from "react";
import {
  Dialog as DialogUI,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import { Cross1Icon } from "@radix-ui/react-icons";
// import "./style.scss";
const Dialog = ({
  open,
  handleClose,
  title,
  children,
  className,
  hideCloseButton,
}: {
  open: boolean;
  handleClose: (open: boolean) => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
}) => {
  return (
    <div>
      <DialogUI open={open} onOpenChange={handleClose}>
        <DialogContent className={`${className}`}>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogDescription>{children}</DialogDescription>
          </DialogHeader>
          {/* {!hideCloseButton && (
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <Cross1Icon />
              <span className="sr-only">Close</span>
            </DialogClose>
          )} */}
        </DialogContent>
      </DialogUI>
    </div>
  );
};

export default Dialog;
