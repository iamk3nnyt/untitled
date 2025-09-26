"use client";

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
      id: "q1",
      name: "Q1 overview",
      type: "folder",
      isActive: true,
      isExpanded: false,
    },
    { id: "team", name: "Team review", type: "file" },
    {
      id: "design",
      name: "Design",
      type: "folder",
      isExpanded: true,
      children: [
        { id: "fetch", name: "FetchTable.py", type: "file" },
        { id: "cap", name: "CapTable.xls", type: "file" },
        { id: "blonded", name: "Blonded", type: "file" },
        { id: "finances", name: "daily-finances", type: "folder" },
        { id: "town", name: "Town hall", type: "file" },
        { id: "milestones", name: "Milestones", type: "folder" },
        { id: "heavy", name: "Heavyweights", type: "folder" },
      ],
    },
  ]);

  const files = [
    {
      id: "1",
      name: "Q1 overview",
      type: "folder",
      size: "",
      lastModified: "Sep. 26 2025",
    },
    {
      id: "2",
      name: "Team review",
      type: "DOCX",
      size: "6.5KB",
      lastModified: "Sep. 26 2025",
    },
    {
      id: "3",
      name: "BG-02.png",
      type: "PNG",
      size: "5.5GB",
      lastModified: "Sep. 26 2025",
    },
    {
      id: "4",
      name: "FetchTable.py",
      type: "CODE",
      size: "7.5MB",
      lastModified: "Sep. 26 2025",
    },
    {
      id: "5",
      name: "CapTable.xls",
      type: "XLS",
      size: "7.0GB",
      lastModified: "Sep. 26 2025",
    },
    {
      id: "6",
      name: "Blonded",
      type: "MP3",
      size: "4.5MB",
      lastModified: "Sep. 26 2025",
    },
    {
      id: "7",
      name: "daily-finances",
      type: "ZIP",
      size: "8.0KB",
      lastModified: "Sep. 26 2025",
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

  const getTypeColor = (type: string) => {
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="h-screen">
        <div className="h-full overflow-hidden">
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="h-full w-64 border-r border-gray-200 bg-gray-50">
              {/* Sidebar Header */}
              <div className="flex h-16 items-center border-b border-gray-200 px-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
                    <span className="text-sm font-medium text-white">DB</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Digital Bin</div>
                    <div className="text-xs text-gray-500">5 GB storage</div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="space-y-1 px-4 py-3">
                <button className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <Upload className="h-4 w-4" />
                  <span>Upload</span>
                </button>
                <button className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
                <button className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
              </div>

              {/* File Tree */}
              <div className="px-4 py-2">
                <div className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase">
                  GENERAL
                </div>
                <div className="space-y-0.5">
                  {sidebarItems.map((item, index) => (
                    <div key={item.id}>
                      <div
                        className={`flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-sm ${
                          item.isActive
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex flex-1 items-center space-x-2">
                          {item.type === "folder" ? (
                            <Folder className="h-4 w-4" />
                          ) : (
                            <File className="h-4 w-4" />
                          )}
                          <span>{item.name}</span>
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
            </div>

            {/* Main Content Area */}
            <div className="flex h-full flex-1 flex-col">
              {/* Content Header */}
              <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 px-6">
                <div className="flex items-center">
                  <h2 className="text-base font-medium text-gray-900">
                    Design
                  </h2>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                    Share
                  </button>
                  <button className="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800">
                    Upload
                  </button>
                </div>
              </div>

              {/* File List */}
              <div className="flex-1 overflow-auto py-3 pr-6 pl-3">
                <div className="overflow-hidden py-3">
                  <table className="w-full">
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
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getTypeColor(file.type)}`}
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
