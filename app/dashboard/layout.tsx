"use client";

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ChevronRight,
  File,
  Folder,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Mock search results
  const mockSearchResults = [
    {
      id: "1",
      name: "old_resume.pdf",
      type: "PDF",
      size: "2.1MB",
      location: "Maybe Later",
      lastModified: "Mar. 15 2024",
    },
    {
      id: "2",
      name: "random_notes.txt",
      type: "TXT",
      size: "45KB",
      location: "Maybe Later",
      lastModified: "Jun. 08 2024",
    },
    {
      id: "3",
      name: "project_proposal.docx",
      type: "DOCX",
      size: "1.2MB",
      location: "Old Projects",
      lastModified: "Feb. 10 2024",
    },
    {
      id: "4",
      name: "vacation_photos",
      type: "folder",
      size: "",
      location: "Random Docs",
      lastModified: "Dec. 03 2023",
    },
    {
      id: "5",
      name: "maybe_useful.zip",
      type: "ZIP",
      size: "156MB",
      location: "Maybe Later",
      lastModified: "Jan. 22 2024",
    },
    {
      id: "6",
      name: "old_presentations.pptx",
      type: "PPTX",
      size: "89MB",
      location: "Maybe Later",
      lastModified: "Nov. 14 2023",
    },
  ];

  const filteredResults = searchQuery
    ? mockSearchResults.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : mockSearchResults;

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return "📁";
      case "PDF":
        return "📄";
      case "TXT":
        return "📝";
      case "DOCX":
        return "📄";
      case "ZIP":
        return "🗜️";
      case "PPTX":
        return "📊";
      default:
        return "📄";
    }
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isSearchModalOpen) {
        setIsSearchModalOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen]);

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
                <button
                  onClick={() => setIsSearchModalOpen(true)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
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

            {/* Main Content Area */}
            <div className="flex h-full flex-1 flex-col">
              {/* Content Header */}
              {pathname === "/dashboard/settings" ? (
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
                  {/* <div className="flex items-center space-x-3">
                    <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                      Reset
                    </button>
                    <button className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800">
                      Save Changes
                    </button>
                  </div> */}
                </div>
              ) : (
                <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 px-6">
                  <div className="flex items-center">
                    <h2 className="text-base font-medium text-gray-900">
                      Maybe Later
                    </h2>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/dashboard/settings"
                      className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Settings
                    </Link>
                    <button className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800">
                      Import
                    </button>
                  </div>
                </div>
              )}

              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-6 w-full max-w-2xl rounded-xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
              <div className="flex items-center space-x-3">
                <Search className="h-5 w-5 text-gray-600" />
                <h2 className="text-base font-medium text-gray-900">
                  Find Disposed Items
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsSearchModalOpen(false);
                  setSearchQuery("");
                }}
                className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="px-6 py-4">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, type, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-80 overflow-y-auto">
              {filteredResults.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {filteredResults.map((item) => (
                    <div
                      key={item.id}
                      className="group flex cursor-pointer items-center justify-between px-6 py-3 hover:bg-gray-50"
                      onClick={() => {
                        // Handle item selection
                        console.log("Selected item:", item);
                        setIsSearchModalOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">{getFileIcon(item.type)}</div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                          <div className="truncate text-xs text-gray-500">
                            in {item.location} • {item.lastModified}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {item.type !== "folder" && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                            {item.type}
                          </span>
                        )}
                        {item.size && (
                          <span className="text-xs text-gray-500">
                            {item.size}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center">
                  <Search className="mx-auto h-8 w-8 text-gray-300" />
                  <h3 className="mt-3 text-sm font-medium text-gray-900">
                    No items found
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {searchQuery
                      ? `No disposed items match "${searchQuery}"`
                      : "Start typing to search your disposed items"}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
              <span className="text-xs text-gray-500">
                {filteredResults.length} items found
              </span>
              <span className="text-xs text-gray-400">Press ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
