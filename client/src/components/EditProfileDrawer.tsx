// components/EditProfileDrawer.tsx
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

interface EditProfileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function EditProfileDrawer({ open, onClose }: EditProfileDrawerProps) {
  const { authUser } = useAuthStore();
  const [name, setName] = useState(authUser?.name ?? "");

  const handleSave = () => {
    // TODO: Implement backend call to update user profile
    console.log("Saving new name:", name);
    onClose();
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        </div>
        <DrawerFooter>
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
