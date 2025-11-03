import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { usedCars, brands } from '../mockData';
import { Filter, MapPin, Calendar, Gauge, Fuel, Settings, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';

const UsedCarsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedTransmission, setSelectedTransmission] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [sortBy, setSortBy] = useState('relevance');

  const filteredCars = useMemo(() => {
    let filtered = [...usedCars];

    // Search filter
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      filtered = filtered.filter(car =>
        car.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(car => car.name.includes(selectedBrand));
    }

    // Fuel type filter
    if (selectedFuelType) {
      filtered = filtered.filter(car => car.fuelType === selectedFuelType);
    }

    // Transmission filter
    if (selectedTransmission) {
      filtered = filtered.filter(car => car.transmission === selectedTransmission);
    }

    // Price range filter
    filtered = filtered.filter(
      car => car.priceValue >= priceRange[0] && car.priceValue <= priceRange[1]
    );

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.priceValue - b.priceValue);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'year-new') {
      filtered.sort((a, b) => b.year - a.year);
    }

    return filtered;
  }, [searchParams, selectedBrand, selectedFuelType, selectedTransmission, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / <span className="text-gray-900">Used Cars</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </h3>
                <button
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedFuelType('');
                    setSelectedTransmission('');
                    setPriceRange([0, 2000000]);
                  }}
                  className="text-sm text-orange-500 hover:text-orange-600"
                >
                  Clear All
                </button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand
                </label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {brands.map((brand, index) => (
                      <SelectItem key={index} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuel Type
                </label>
                <div className="space-y-2">
                  {['Petrol', 'Diesel', 'Electric'].map((fuel) => (
                    <label key={fuel} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="fuelType"
                        value={fuel}
                        checked={selectedFuelType === fuel}
                        onChange={(e) => setSelectedFuelType(e.target.value)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-sm text-gray-700">{fuel}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Transmission Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transmission
                </label>
                <div className="space-y-2">
                  {['Manual', 'Automatic'].map((trans) => (
                    <label key={trans} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="transmission"
                        value={trans}
                        checked={selectedTransmission === trans}
                        onChange={(e) => setSelectedTransmission(e.target.value)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="text-sm text-gray-700">{trans}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600">
                    Up to ₹{(priceRange[1] / 100000).toFixed(1)} Lakh
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Car Listings */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4 flex items-center justify-between">
              <p className="text-gray-700">
                <span className="font-semibold">{filteredCars.length}</span> Used Cars Available
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="year-new">Year: Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Car Cards */}
            <div className="space-y-4">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/car/${car.id}`)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover min-h-[200px]"
                      />
                      {car.certified && (
                        <Badge className="absolute top-3 left-3 bg-green-500 text-white">
                          Certified
                        </Badge>
                      )}
                    </div>
                    <div className="md:col-span-2 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {car.name} {car.variant}
                          </h3>
                          <p className="text-sm text-gray-500">{car.year}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">{car.price}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Gauge className="w-4 h-4" />
                          {car.km}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Fuel className="w-4 h-4" />
                          {car.fuelType}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Settings className="w-4 h-4" />
                          {car.transmission}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {car.location}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 border-orange-500 text-orange-500 hover:bg-orange-50"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          Get Best Price
                        </Button>
                        <Button
                          className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/car/${car.id}`);
                          }}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCars.length === 0 && (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-gray-500 text-lg">No cars found matching your criteria</p>
                <Button
                  onClick={() => {
                    setSelectedBrand('');
                    setSelectedFuelType('');
                    setSelectedTransmission('');
                    setPriceRange([0, 2000000]);
                  }}
                  className="mt-4 bg-orange-500 hover:bg-orange-600"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedCarsPage;
