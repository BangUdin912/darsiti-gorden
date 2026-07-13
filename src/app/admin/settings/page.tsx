import AccountHeader from "@/components/admin/settings/AccountHeader";
import AvatarUpload from "@/components/admin/settings/AvatarUpload";
import ProfileCard from "@/components/admin/settings/ProfileCard";
import PasswordCard from "@/components/admin/settings/PasswordCard";
import LogoutCard from "@/components/admin/settings/LogoutCard";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <AccountHeader />

      {/* Profile & Avatar */}
      <div className="grid gap-8 lg:grid-cols-3">

        {/* Avatar */}
        <div>
          <AvatarUpload />
        </div>

        {/* Informasi Profil */}
        <div className="lg:col-span-2">
          <ProfileCard />
        </div>

      </div>

      {/* Password */}
      <PasswordCard />

      {/* Logout */}
      <LogoutCard />

    </div>
  );
}