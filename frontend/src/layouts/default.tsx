import { Link } from "@heroui/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3 border-t border-white/10">
        
          <div className="max-w-6xl mx-auto text-center">
            <div className="text-2xl mb-4">🐾</div>
            <p className="text-gray-400 mb-4">
              Meme Pet League - Where $GUI becomes culture
            </p>
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Discord</span>
              <span>Twitter</span>
            </div>
          </div>
        
      </footer>
    </div>
  );
}
