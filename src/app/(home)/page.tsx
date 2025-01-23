'use client'

import { usePaginatedQuery } from "convex/react";
import Navbar from "./navbar";
import { TemplateGallery } from "./templatesGallery";
import { api } from "../../../convex/_generated/api";
import DocumentsTable from "./documents-table";

export default function Home() {

  const { results, status, loadMore } = usePaginatedQuery(api.documents.get, {}, { initialNumItems: 5 });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 left-0 h-16px bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
      </div>
    </div>

  );
}
