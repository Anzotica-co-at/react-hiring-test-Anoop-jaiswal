import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          if (scrollY > 60 && !isSticky) {
            setIsSticky(true);
          } else if (scrollY < 40 && isSticky) {
            setIsSticky(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  return (
    <header className="w-full top-0 z-50 transition-all duration-0 ease-in-out md:sticky">
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isSticky ? "max-h-0 opacity-0" : "max-h-56 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto py-6 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <span className="text-xl font-serif tracking-wide">
            THE RITZ-CARLTON
          </span>
          <div className="flex items-center space-x-4">
            <button className="text-sm text-black flex items-center space-x-1">
              <span role="img" aria-label="Globe">
                🌐
              </span>{" "}
              English
            </button>
            <button className="border px-5 py-2 text-sm font-medium rounded">
              Sign in or Join
            </button>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out bg-white shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-lg font-serif block md:hidden">
            THE RITZ-CARLTON
          </span>

          <nav className="hidden md:flex space-x-6 text-sm font-medium text-black">
            <a href="#">HOTELS & RESORTS</a>
            <a href="#">RITZ-CARLTON RESERVE</a>
            <a href="#">RESIDENCES</a>
            <a href="#">YACHTS</a>
            <a href="#">ABOUT THE RITZ-CARLTON</a>
            <a href="#">THE JOURNEY</a>
          </nav>

          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <button className="hidden md:block bg-black text-white px-6 py-3 text-sm font-medium rounded">
            Reserve Now
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-4 text-sm font-medium bg-white shadow-md">
            <a href="#" className="block">
              HOTELS & RESORTS
            </a>
            <a href="#" className="block">
              RITZ-CARLTON RESERVE
            </a>
            <a href="#" className="block">
              RESIDENCES
            </a>
            <a href="#" className="block">
              YACHTS
            </a>
            <a href="#" className="block">
              ABOUT THE RITZ-CARLTON
            </a>
            <a href="#" className="block">
              THE JOURNEY
            </a>
            <button className="w-full bg-black text-white py-2 rounded">
              Reserve Now
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
