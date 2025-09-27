"use client";

import { ArrowUpDown, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      // Here you would typically upload the files
      console.log("Files dropped for disposal:", droppedFiles);
      // For demo purposes, we'll just show an alert
      alert(`${droppedFiles.length} file(s) disposed successfully!`);
    }
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
    <>
      {/* Main Content Area */}
      <div className="flex h-full flex-1 flex-col">
        {/* Content Header */}
        <div className="flex h-16 w-full items-center justify-between border-b border-gray-200 px-6">
          <div className="flex items-center">
            <h2 className="text-base font-medium text-gray-900">Maybe Later</h2>
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

        {/* File List */}
        <div
          className="relative flex-1 overflow-auto py-3 pr-6 pl-3"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
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
                        <div className="text-2xl">{getFileIcon(file.type)}</div>
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
                    <td className="py-4 text-sm text-gray-500">{file.size}</td>
                    <td className="py-4 text-sm text-gray-500">
                      {file.lastModified}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Drag Overlay */}
          {isDragOver && (
            <div className="bg-opacity-90 absolute inset-0 flex items-center justify-center rounded-lg border-2 border-dashed border-green-300 bg-green-50">
              <div className="text-center">
                <Upload className="mx-auto mb-4 h-12 w-12 text-green-500" />
                <h3 className="mb-2 text-lg font-medium text-green-700">
                  Drop files to dispose
                </h3>
                <p className="text-sm text-green-600">
                  Release to add files to your disposal space
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
