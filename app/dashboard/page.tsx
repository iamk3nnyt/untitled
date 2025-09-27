"use client";

import { cn } from "@/lib/utils";
import {
  ArrowUpDown,
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
import { useState } from "react";

type SidebarItem = {
  id: string;
  name: string;
  type: string;
  isActive?: boolean;
  isExpanded?: boolean;
  children?: { id: string; name: string; type: string }[];
};

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
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

  const files = [
    {
      id: "1",
      name: "old_resume.pdf",
      type: "PDF",
      size: "2.1MB",
      lastModified: "Mar. 15 2024",
    },
    {
      id: "2",
      name: "random_notes.txt",
      type: "TXT",
      size: "45KB",
      lastModified: "Jun. 08 2024",
    },
    {
      id: "3",
      name: "maybe_useful.zip",
      type: "ZIP",
      size: "156MB",
      lastModified: "Jan. 22 2024",
    },
    {
      id: "4",
      name: "forgotten_photos",
      type: "folder",
      size: "",
      lastModified: "Dec. 03 2023",
    },
    {
      id: "5",
      name: "old_presentations.pptx",
      type: "PPTX",
      size: "89MB",
      lastModified: "Nov. 14 2023",
    },
    {
      id: "6",
      name: "temp_download.dmg",
      type: "DMG",
      size: "1.2GB",
      lastModified: "Aug. 29 2024",
    },
    {
      id: "7",
      name: "unused_assets",
      type: "folder",
      size: "",
      lastModified: "May. 17 2024",
    },
    {
      id: "8",
      name: "Town hall",
      type: "PAGE",
      size: "5.6GB",
      lastModified: "Sep. 26 2025",
    },
  ];

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) =>
      prev.includes(fileId)
        ? prev.filter((id) => id !== fileId)
        : [...prev, fileId],
    );
  };

  const toggleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map((file) => file.id));
    }
  };

  const isAllSelected = selectedFiles.length === files.length;
  const isIndeterminate =
    selectedFiles.length > 0 && selectedFiles.length < files.length;

  const toggleSidebarItem = (itemId: string) => {
    setSidebarItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isExpanded: !item.isExpanded } : item,
      ),
    );
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return "📁";
      case "DOCX":
        return "📄";
      case "PNG":
        return "🖼️";
      case "CODE":
        return "💾";
      case "XLS":
        return "📊";
      case "MP3":
        return "🎵";
      case "ZIP":
        return "🗜️";
      case "PAGE":
        return "📄";
      default:
        return "📄";
    }
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
                  <span>Dispose</span>
                </button>
                <button className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <Search className="h-4 w-4" />
                  <span>Find</span>
                </button>
                <Link
                  href="/dashboard/settings"
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
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
                    Dispose
                  </button>
                </div>
              </div>

              {/* File List */}
              <div className="flex-1 overflow-auto py-3 pr-6 pl-3">
                <div className="overflow-x-auto py-3">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                        <th className="w-12 pb-3 pl-3 font-medium">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            ref={(el) => {
                              if (el) el.indeterminate = isIndeterminate;
                            }}
                            onChange={toggleSelectAll}
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                        </th>
                        <th className="pb-3 font-medium">
                          <div className="flex items-center space-x-2">
                            <span>Name</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </div>
                        </th>
                        <th className="pb-3 font-medium">Type</th>
                        <th className="pb-3 font-medium">Size</th>
                        <th className="pb-3 font-medium">Last modified</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {files.map((file) => (
                        <tr key={file.id} className="group hover:bg-gray-50">
                          <td className="py-4 pl-3">
                            <input
                              type="checkbox"
                              checked={selectedFiles.includes(file.id)}
                              onChange={() => toggleFileSelection(file.id)}
                              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">
                                {getFileIcon(file.type)}
                              </div>
                              <span className="text-sm font-medium text-gray-900">
                                {file.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            {file.type !== "folder" && (
                              <span
                                className={
                                  "inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600"
                                }
                              >
                                {file.type}
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-sm text-gray-500">
                            {file.size}
                          </td>
                          <td className="py-4 text-sm text-gray-500">
                            {file.lastModified}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
