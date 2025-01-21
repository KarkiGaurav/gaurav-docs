import Navbar from "./navbar";
import { TemplateGallery } from "./templatesGallery";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 right-0 left-0 h-16px bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
         <TemplateGallery />
      </div>
    </div>
   
  );
}
