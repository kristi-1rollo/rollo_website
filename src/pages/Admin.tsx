import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AdminBlogTab } from "@/components/admin/AdminBlogTab";
import { AdminCareersTab } from "@/components/admin/AdminCareersTab";
import { AdminRegistrationsTab } from "@/components/admin/AdminRegistrationsTab";
import { AdminUsersTab, AdminAuditTab } from "@/components/AdminUsersTab";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";

const Admin = () => {
  const { user, loading, isAdmin, signOut } = useAuth();

  if (loading) {
    return <div className="pt-24 pb-16 text-center text-muted-foreground">Loading…</div>;
  }
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) {
    return (
      <div className="pt-24 pb-16 text-center">
        <p className="text-muted-foreground">You do not have admin access.</p>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-foreground">Admin</h1>
        <Button
          variant="outline"
          onClick={signOut}
          className="border-border text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4 mr-1" /> Sign Out
        </Button>
      </div>

      <Tabs defaultValue="blog">
        <TabsList className="bg-muted/50 border border-border mb-6">
          <TabsTrigger
            value="blog"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Blog
          </TabsTrigger>
          <TabsTrigger
            value="careers"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Careers
          </TabsTrigger>
          <TabsTrigger
            value="registrations"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Registrations
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Users
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Audit Log
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog">
          <AdminBlogTab />
        </TabsContent>
        <TabsContent value="careers">
          <AdminCareersTab />
        </TabsContent>
        <TabsContent value="registrations">
          <AdminRegistrationsTab />
        </TabsContent>
        <TabsContent value="users">
          <AdminUsersTab />
        </TabsContent>
        <TabsContent value="audit">
          <AdminAuditTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
