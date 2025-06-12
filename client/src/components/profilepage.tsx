import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LogOut, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";


export default function ProfilePage() {
  const { authUser, logout,updateProfile } = useAuthStore();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [name, setName] = useState(authUser?.name || "");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(authUser?.profilePic || "");
 

  if (!authUser) {
    return (
      <div className="text-center text-muted-foreground mt-20">
        Please log in to view your profile.
      </div>
    );
  }
  const handleProfileUpdate =() => {
  try {
    const payload = {
      name,
      password,
      profilePic, // this is a base64 string, handled by backend Cloudinary upload
    };

     updateProfile(payload);
    toast.success("Profile updated!");
    setIsDrawerOpen(false);
  } catch (error) {
    console.error("Update failed", error);
    toast.error("Failed to update profile");
  }
};

  

  return (
    <div className="min-h-screen bg-background px-4 py-8 text-foreground max-w-2xl mx-auto">
      <Card className="p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <img
            src={authUser.profilePic}
            alt="User avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{authUser.name}</h2>
            <p className="text-muted-foreground text-sm">{authUser.email}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </div>

        <Separator className="my-6" />

        <div className="space-y-3">
          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="mr-2 h-4 w-4" /> Log Out
          </Button>
        </div>
      </Card>

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Profile</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 space-y-4">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="New username"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
            />
                                <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Picture</label>
                    {profilePic && (
                                    <img
                                    src={profilePic}
                                    alt="Profile preview"
                                    className="w-16 h-16 rounded-full object-cover"
                                    />
                                )}
                            <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setProfilePic(reader.result as string); // base64 string sent to backend
                                        };
                                        reader.readAsDataURL(file);
                                        }
                                    }}
                                    />

                    </div>

          </div>
          <DrawerFooter>
            <Button onClick={handleProfileUpdate}>Save Changes</Button>
            <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
