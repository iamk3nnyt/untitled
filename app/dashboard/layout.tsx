"use client";

import { cn } from "@/lib/utils";
import {
  ChevronRight,
  File,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type SidebarItem = {
  id: string;
  name: string;
  type: string;
  isActive?: boolean;
  isExpanded?: boolean;
  children?: { id: string; name: string; type: string }[];
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([
    {
      id: "old-projects",
      name: "Old Projects",
      type: "folder",
      isActive: true,
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

  const toggleSidebarItem = (itemId: string) => {
    setSidebarItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isExpanded: !item.isExpanded } : item,
      ),
    );
  };

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
                <button className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <Upload className="h-4 w-4" />
                  <span>Import</span>
                </button>
                <button className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <Search className="h-4 w-4" />
                  <span>Find</span>
                </button>
                <Link
                  href="/dashboard/settings"
                  className={cn(
                    "flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm",
                    pathname === "/dashboard/settings"
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
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
                          item.isActive && pathname === "/dashboard"
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
                              <MoreHorizontal className="h-3 w-3" />
                            </button>
                            <button className="rounded p-0.5 hover:bg-gray-200">
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              className="rounded p-0.5 hover:bg-gray-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSidebarItem(item.id);
                              }}
                            >
                              <ChevronRight
                                className={`h-3 w-3 transition-transform ${
                                  item.isExpanded ? "rotate-90" : ""
                                }`}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      {item.children && item.isExpanded && (
                        <div className="mt-0.5 ml-6 space-y-0.5">
                          {item.children.map((child) => (
                            <div
                              key={child.id}
                              className="flex cursor-pointer items-center space-x-2 rounded-md px-2 py-0.5 text-sm text-gray-600 hover:bg-gray-100"
                            >
                              {child.type === "folder" ? (
                                <Folder className="h-3 w-3" />
                              ) : (
                                <File className="h-3 w-3" />
                              )}
                              <span>{child.name}</span>
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

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
