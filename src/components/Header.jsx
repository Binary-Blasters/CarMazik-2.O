import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Heart, User, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/used-cars?search=${searchQuery}`);
    }
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      {/* Top Header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CarDekho</h1>
              <p className="text-[10px] text-gray-500 -mt-1">GAADI MERI HAI DHAKKAN</p>
            </div>
          </Link>

          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 bg-transparent border-0 outline-none">
                  All <ChevronDown className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>New Cars</DropdownMenuItem>
                  <DropdownMenuItem>Used Cars</DropdownMenuItem>
                  <DropdownMenuItem>Electric Cars</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <input
                type="text"
                placeholder="Search or Ask a Question"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-12 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
              English <ChevronDown className="w-4 h-4" />
            </button>
            <button className="hover:text-orange-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors">
              <User className="w-5 h-5" />
              <span className="text-sm">Login / Register</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="py-4 text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center gap-1 bg-transparent border-0 outline-none">
                NEW CARS <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate('/')}>Find New Cars</DropdownMenuItem>
                <DropdownMenuItem>Latest Cars</DropdownMenuItem>
                <DropdownMenuItem>Upcoming Cars</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="py-4 text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center gap-1 bg-transparent border-0 outline-none">
                USED CARS <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => navigate('/used-cars')}>Buy Used Cars</DropdownMenuItem>
                <DropdownMenuItem>Sell Car</DropdownMenuItem>
                <DropdownMenuItem>Certified Cars</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="py-4 text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center gap-1 bg-transparent border-0 outline-none">
                NEWS & REVIEWS <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Car News</DropdownMenuItem>
                <DropdownMenuItem>Expert Reviews</DropdownMenuItem>
                <DropdownMenuItem>User Reviews</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="py-4 text-sm font-medium text-gray-700 hover:text-orange-500 flex items-center gap-1 bg-transparent border-0 outline-none">
                VIDEOS <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Latest Videos</DropdownMenuItem>
                <DropdownMenuItem>Car Reviews</DropdownMenuItem>
                <DropdownMenuItem>Comparisons</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 py-4">
            <MapPin className="w-4 h-4" />
            Select City <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
