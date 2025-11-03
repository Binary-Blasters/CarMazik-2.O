import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CarSection from '../components/CarSection';
import { Button } from '../components/ui/button';
import { suvCars, electricCars, upcomingCars, latestCars, budgetRanges, vehicleTypes } from '../mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const HomePage = () => {
  const navigate = useNavigate();
  const [carType, setCarType] = useState('new');
  const [searchBy, setSearchBy] = useState('budget');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');

  const handleSearch = () => {
    navigate('/used-cars');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Search Widget */}
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Find your right car</h2>

              {/* Tabs */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setCarType('new')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                    carType === 'new'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  New Car
                </button>
                <button
                  onClick={() => setCarType('used')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                    carType === 'used'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Used Car
                </button>
              </div>

              {/* Search By Options */}
              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="searchBy"
                    value="budget"
                    checked={searchBy === 'budget'}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">By Budget</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="searchBy"
                    value="brand"
                    checked={searchBy === 'brand'}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">By Brand</span>
                </label>
              </div>

              {/* Dropdowns */}
              <div className="space-y-4 mb-6">
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Budget" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range, index) => (
                      <SelectItem key={index} value={range.label}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedVehicleType} onValueChange={setSelectedVehicleType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Vehicle Types" />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map((type, index) => (
                      <SelectItem key={index} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-semibold rounded-lg"
              >
                Search
              </Button>

              <button className="w-full text-center text-sm text-gray-600 mt-4 hover:text-orange-500 transition-colors">
                Advanced Search →
              </button>
            </div>

            {/* Hero Image/Text */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                India's #1 Car Platform
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Buy & Sell cars with confidence
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-500">30K+</p>
                  <p className="text-sm text-gray-600 mt-1">Used Cars</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-500">274</p>
                  <p className="text-sm text-gray-600 mt-1">New Models</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-500">41</p>
                  <p className="text-sm text-gray-600 mt-1">Brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car Sections */}
      <div className="max-w-7xl mx-auto px-4">
        <CarSection
          title="SUV cars"
          cars={suvCars}
          showOffer={true}
          viewAllLink="/used-cars"
        />

        <CarSection
          title="Electric cars"
          cars={electricCars}
          showOffer={true}
          viewAllLink="/used-cars"
        />

        <CarSection
          title="Upcoming cars"
          cars={upcomingCars}
          viewAllLink="/used-cars"
        />

        <CarSection
          title="Latest cars"
          cars={latestCars}
          showOffer={true}
          viewAllLink="/used-cars"
        />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About CarDekho</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">About Us</li>
                <li className="hover:text-white cursor-pointer">Careers</li>
                <li className="hover:text-white cursor-pointer">Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Facebook</li>
                <li className="hover:text-white cursor-pointer">Twitter</li>
                <li className="hover:text-white cursor-pointer">Instagram</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Others</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer">Sitemap</li>
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Download App</h3>
              <p className="text-sm text-gray-400">Get the CarDekho app on iOS and Android</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 CarDekho.com. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
