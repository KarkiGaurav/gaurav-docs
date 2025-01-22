'use client'

import { useQuery } from "convex/react";
import Navbar from "./navbar";
import { TemplateGallery } from "./templatesGallery";
import { api } from "../../../convex/_generated/api";

export default function Home() {

  const documents = useQuery(api.documents.get);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 left-0 h-16px bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
         <TemplateGallery />
         {documents?.map((doc, index) => (
          <span key={index} className="">{doc.title}</span>
         )
        )}
      </div>
    </div>
   
  );
}
