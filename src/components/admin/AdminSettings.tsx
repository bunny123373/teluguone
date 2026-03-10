"use client";

import { useState } from "react";
import { Save, Globe, Mail, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  adminKey: string;
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: "TeluguDB",
    siteDescription: "Stream & Download Telugu Movies & Web Series",
    siteUrl: "https://teluguone.vercel.app",
    contactEmail: "contact@teluguone.com",
    adminKey: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      localStorage.setItem("siteSettings", JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your site settings</p>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Site Info */}
        <div className="bg-[#161f2e] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00a8e1] rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Site Information</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Site URL</label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => setSettings({ ...settings, siteUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#161f2e] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00a8e1] rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Contact</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Contact Email</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white focus:outline-none focus:border-[#00a8e1]"
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-[#161f2e] rounded-lg p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00a8e1] rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Admin Key</label>
            <input
              type="password"
              value={settings.adminKey}
              onChange={(e) => setSettings({ ...settings, adminKey: e.target.value })}
              placeholder="Enter new admin key to change"
              className="w-full px-4 py-2.5 rounded-md bg-[#0d1117] border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00a8e1]"
            />
            <p className="text-gray-500 text-xs mt-1">Leave blank to keep current key</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all ${
              saved
                ? "bg-green-600 text-white"
                : "bg-[#00a8e1] hover:bg-[#00b9f1] text-white"
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
          </button>
          {saved && (
            <span className="text-green-400 text-sm">Settings saved successfully!</span>
          )}
        </div>
      </div>
    </div>
  );
}
