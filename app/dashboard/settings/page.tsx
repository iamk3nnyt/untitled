"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Bell,
  ChevronRight,
  Download,
  File,
  Folder,
  Plus,
  Search,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SidebarItem = {
  id: string;
  name: string;
  type: string;
  isActive?: boolean;
  isExpanded?: boolean;
  children?: { id: string; name: string; type: string }[];
};

export default function SettingsPage() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([
    {
      id: "old-projects",
      name: "Old Projects",
      type: "folder",
      isActive: false,
      isExpanded: false,
    },
    { id: "random-docs", name: "Random Docs", type: "file" },
    {
      id: "maybe-later",
      name: "Maybe Later",
      type: "folder",
      isExpanded: true,
      children: [
        { id: "old-resume", name: "old_resume.pdf", type: "file" },
        { id: "random-notes", name: "random_notes.txt", type: "file" },
        { id: "maybe-useful", name: "maybe_useful.zip", type: "file" },
        { id: "forgotten-photos", name: "forgotten_photos", type: "folder" },
        {
          id: "old-presentations",
          name: "old_presentations.pptx",
          type: "file",
        },
        { id: "unused-assets", name: "Unused Assets", type: "folder" },
        { id: "temp-downloads", name: "Temp Downloads", type: "folder" },
      ],
    },
  ]);

  const [notifications, setNotifications] = useState(true);
  const [autoDispose, setAutoDispose] = useState(false);

  const toggleSidebarItem = (id: string) => {
    setSidebarItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item,
      ),
    );
  };

  const settingSections = [
    {
      title: "General",
      settings: [
        {
          id: "notifications",
          icon: <Bell className="h-5 w-5" />,
          title: "Notifications",
          description: "Get notified when items are disposed or restored",
          type: "toggle",
          value: notifications,
          onChange: setNotifications,
        },
        {
          id: "auto-dispose",
          icon: <Trash2 className="h-5 w-5" />,
          title: "Auto Dispose",
          description:
            "Automatically dispose items after 90 days of inactivity",
          type: "toggle",
          value: autoDispose,
          onChange: setAutoDispose,
        },
      ],
    },
    {
      title: "Storage",
      settings: [
        {
          id: "storage-usage",
          icon: <Folder className="h-5 w-5" />,
          title: "Storage Usage",
          description: "2.4 GB of 15 GB used",
          type: "info",
          value: "16% used",
        },
        {
          id: "export-data",
          icon: <Download className="h-5 w-5" />,
          title: "Export Data",
          description: "Download all your disposed items",
          type: "button",
          action: "Export",
        },
      ],
    },
    {
      title: "Danger Zone",
      settings: [
        {
          id: "delete-account",
          icon: <Trash2 className="h-5 w-5" />,
          title: "Delete Account",
          description:
            "Permanently delete your account and all disposed items. This action cannot be undone.",
          type: "danger-button",
          action: "Delete Account",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="h-screen">
        <div className="h-full overflow-x-auto overflow-y-hidden">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-gray-50">
              {/* Sidebar Header */}
              <div className="flex h-16 items-center border-b border-gray-200 px-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
                    <span className="text-sm font-medium text-white">DS</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Disposal Space</div>
                    <div className="text-xs text-gray-500">Hidden Archive</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-1 px-4 py-3">
                <Link
                  href="/dashboard"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <Upload className="h-4 w-4" />
                  <span>Dispose</span>
                </Link>
                <button className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <Search className="h-4 w-4" />
                  <span>Find</span>
                </button>
                <button className="flex w-full items-center space-x-2 rounded-md bg-gray-200 px-2 py-1 text-sm text-gray-900">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>

              {/* File Tree */}
              <div className="px-4 py-2">
                <div className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase">
                  DISPOSED
                </div>
                <div className="space-y-0.5">
                  {sidebarItems.map((item) => (
                    <div key={item.id}>
                      <div
                        className={cn(
                          "flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm",
                          item.isActive
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100",
                        )}
                      >
                        <div className="flex flex-1 items-center space-x-2 truncate">
                          {item.type === "folder" ? (
                            <Folder className="h-4 w-4 shrink-0" />
                          ) : (
                            <File className="h-4 w-4 shrink-0" />
                          )}
                          <span className="truncate whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                        {item.type === "folder" && (
                          <div className="flex items-center space-x-1">
                            <button className="rounded p-0.5 hover:bg-gray-200">
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => toggleSidebarItem(item.id)}
                              className="rounded p-0.5 hover:bg-gray-200"
                            >
                              <ChevronRight
                                className={cn(
                                  "h-3 w-3 transition-transform",
                                  item.isExpanded && "rotate-90",
                                )}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      {item.isExpanded && item.children && (
                        <div className="ml-6 space-y-0.5">
                          {item.children.map((child) => (
                            <div
                              key={child.id}
                              className="flex cursor-pointer items-center space-x-2 rounded-md px-2 py-0.5 text-sm text-gray-600 hover:bg-gray-100"
                            >
                              {child.type === "folder" ? (
                                <Folder className="h-3 w-3 shrink-0" />
                              ) : (
                                <File className="h-3 w-3 shrink-0" />
                              )}
                              <span className="truncate whitespace-nowrap">
                                {child.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Details */}
              <div className="mt-auto border-t border-gray-200 p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Storage Used</span>
                    <span>2.4 GB of 15 GB</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div className="h-1.5 w-1/6 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Items Disposed</span>
                    <span>247</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex h-full flex-1 flex-col">
              {/* Content Header */}
              <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 px-6">
                <div className="flex items-center space-x-3">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Dashboard</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                    Reset
                  </button>
                  <button className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Settings Content */}
              <div className="flex-1 overflow-auto px-6 py-6">
                <div className="max-w-4xl">
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                      Settings
                    </h1>
                    <p className="mt-2 text-gray-600">
                      Manage your disposal space preferences and account
                      settings.
                    </p>
                  </div>

                  <div className="space-y-8">
                    {settingSections.map((section) => (
                      <div key={section.title}>
                        <h2
                          className={cn(
                            "mb-4 text-lg font-medium",
                            section.title === "Danger Zone"
                              ? "text-red-600"
                              : "text-gray-900",
                          )}
                        >
                          {section.title}
                        </h2>
                        <div className="space-y-4">
                          {section.settings.map((setting) => (
                            <div
                              key={setting.id}
                              className={cn(
                                "flex items-center justify-between rounded-lg border p-4",
                                setting.type === "danger-button"
                                  ? "border-red-200 bg-red-50"
                                  : "border-gray-200",
                              )}
                            >
                              <div className="flex items-start space-x-3">
                                <div
                                  className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-lg",
                                    setting.type === "danger-button"
                                      ? "bg-red-100 text-red-600"
                                      : "bg-gray-100 text-gray-600",
                                  )}
                                >
                                  {setting.icon}
                                </div>
                                <div>
                                  <h3 className="font-medium text-gray-900">
                                    {setting.title}
                                  </h3>
                                  <p className="text-sm text-gray-500">
                                    {setting.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                {setting.type === "toggle" && (
                                  <button
                                    onClick={() =>
                                      setting.onChange?.(!setting.value)
                                    }
                                    className={cn(
                                      "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                      setting.value
                                        ? "bg-green-500"
                                        : "bg-gray-200",
                                    )}
                                  >
                                    <span
                                      className={cn(
                                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                        setting.value
                                          ? "translate-x-6"
                                          : "translate-x-1",
                                      )}
                                    />
                                  </button>
                                )}
                                {setting.type === "info" && (
                                  <span className="text-sm font-medium text-gray-900">
                                    {setting.value}
                                  </span>
                                )}
                                {setting.type === "button" && (
                                  <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                                    {setting.action}
                                  </button>
                                )}
                                {setting.type === "danger-button" && (
                                  <button className="rounded-md bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700">
                                    {setting.action}
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
