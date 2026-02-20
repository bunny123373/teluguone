"use client";

import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, LayoutDashboard, Film, Tv, List } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setContent,
  addContent,
  updateContent,
  removeContent,
} from "@/redux/slices/contentSlice";
import { IContent } from "@/models/Content";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminStats from "@/components/admin/AdminStats";
import UploadMovieForm from "@/components/admin/UploadMovieForm";
import UploadSeriesForm from "@/components/admin/UploadSeriesForm";
import AdminContentTable from "@/components/admin/AdminContentTable";
import EditContentModal from "@/components/admin/EditContentModal";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<IContent | null>(null);

  const dispatch = useAppDispatch();
  const content = useAppSelector((state) => state.content.list);

  useEffect(() => {
    if (isAuthenticated) {
      fetchContent();
    }
  }, [isAuthenticated]);

  const fetchContent = async () => {
    try {
      const response = await fetch("/api/content");
      const data = await response.json();
      if (data.success) {
        dispatch(setContent(data.data));
      }
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Validate admin key by making a test request
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ test: true }),
      });

      if (response.status === 401) {
        setLoginError("Invalid admin key");
        return;
      }

      // Store the key for future requests
      localStorage.setItem("adminKey", adminKey);
      setIsAuthenticated(true);
    } catch (error) {
      setLoginError("An error occurred. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminKey");
    setIsAuthenticated(false);
    setAdminKey("");
    setActiveTab("dashboard");
  };

  const getAdminKey = () => {
    return localStorage.getItem("adminKey") || "";
  };

  const handleUploadMovie = async (data: any) => {
    setIsLoading(true);
    console.log("Uploading movie data:", data);
    try {
      const adminKey = getAdminKey();
      console.log("Admin key:", adminKey ? "present" : "missing");
      
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);
      
      if (result.success) {
        dispatch(addContent(result.data));
        alert("Movie uploaded successfully!");
        setActiveTab("manage");
      } else {
        alert(result.error || "Failed to upload movie");
      }
    } catch (error) {
      console.error("Error uploading movie:", error);
      alert("An error occurred while uploading: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadSeries = async (data: any) => {
    setIsLoading(true);
    console.log("Uploading series data:", data);
    try {
      const adminKey = getAdminKey();
      console.log("Admin key:", adminKey ? "present" : "missing");
      
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);
      
      if (result.success) {
        dispatch(addContent(result.data));
        alert("Series uploaded successfully!");
        setActiveTab("manage");
      } else {
        alert(result.error || "Failed to upload series");
      }
    } catch (error) {
      console.error("Error uploading series:", error);
      alert("An error occurred while uploading: " + (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: IContent) => {
    setSelectedContent(item);
    setEditModalOpen(true);
  };

  const handleUpdate = async (data: any) => {
    if (!selectedContent) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/${selectedContent._id.toString()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": getAdminKey(),
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        dispatch(updateContent(result.data));
        setEditModalOpen(false);
        setSelectedContent(null);
        alert("Content updated successfully!");
      } else {
        alert(result.error || "Failed to update content");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      alert("An error occurred while updating");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (item: IContent) => {
    setSelectedContent(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedContent) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/content/${selectedContent._id.toString()}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": getAdminKey(),
        },
      });

      const result = await response.json();
      if (result.success) {
        dispatch(removeContent(selectedContent._id.toString()));
        setDeleteModalOpen(false);
        setSelectedContent(null);
        alert("Content deleted successfully!");
      } else {
        alert(result.error || "Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("An error occurred while deleting");
    } finally {
      setIsLoading(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-text mb-2">Admin Access</h1>
              <p className="text-muted text-sm">
                Enter your admin key to access the dashboard
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {loginError && (
                <p className="text-red-500 text-sm text-center">{loginError}</p>
              )}

              <Button type="submit" size="lg" className="w-full">
                Access Dashboard
              </Button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // Admin Dashboard
  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-text mb-2">Dashboard</h1>
            <p className="text-muted">Overview of your content library</p>
          </div>
          <AdminStats content={content} />
        </div>
      )}

      {activeTab === "upload-movie" && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text mb-2">Upload Movie</h1>
            <p className="text-muted">Add a new movie to your library</p>
          </div>
          <UploadMovieForm onSubmit={handleUploadMovie} isLoading={isLoading} />
        </div>
      )}

      {activeTab === "upload-series" && (
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-text mb-2">Upload Series</h1>
            <p className="text-muted">Add a new web series with seasons and episodes</p>
          </div>
          <UploadSeriesForm onSubmit={handleUploadSeries} isLoading={isLoading} />
        </div>
      )}

      {activeTab === "manage" && (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-text mb-2">Manage Content</h1>
            <p className="text-muted">Edit or delete existing content</p>
          </div>
          <AdminContentTable
            content={content}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        </div>
      )}

      {/* Edit Modal */}
      <EditContentModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedContent(null);
        }}
        content={selectedContent}
        onSave={handleUpdate}
        isLoading={isLoading}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedContent(null);
        }}
        content={selectedContent}
        onConfirm={handleDeleteConfirm}
        isLoading={isLoading}
      />
    </AdminLayout>
  );
}
