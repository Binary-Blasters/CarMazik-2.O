import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { allCars, usedCars } from '../mockData';
import { Button } from '../components/ui/button';
import { ArrowLeft, Fuel, Settings, Users, Calendar, Gauge, MapPin, Shield, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const CarDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Try to find the car in both new cars and used cars
  const car = [...allCars, ...usedCars].find(c => c.id === parseInt(id));

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h1>
          <Button onClick={() => navigate('/')} className="bg-orange-500 hover:bg-orange-600">
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const isUsedCar = usedCars.some(c => c.id === car.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Car Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Car Title */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {car.name} {car.variant || ''}
                  </h1>
                  <div className="flex items-center gap-3">
                    {car.year && (
                      <Badge variant="outline" className="text-gray-600">
                        {car.year}
                      </Badge>
                    )}
                    {car.certified && (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Certified
                      </Badge>
                    )}
                    {car.badge && (
                      <Badge className="bg-blue-500 text-white">
                        {car.badge}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-orange-500">
                    {car.price || car.priceRange}
                  </p>
                  {car.estimated && (
                    <p className="text-sm text-gray-500">Estimated Price</p>
                  )}
                </div>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                {car.fuelType && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Fuel className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Fuel Type</p>
                      <p className="font-medium">{car.fuelType}</p>
                    </div>
                  </div>
                )}
                {car.transmission && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Settings className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Transmission</p>
                      <p className="font-medium">{car.transmission}</p>
                    </div>
                  </div>
                )}
                {car.seating && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Seating</p>
                      <p className="font-medium">{car.seating} Seater</p>
                    </div>
                  </div>
                )}
                {car.km && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Gauge className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Kilometers</p>
                      <p className="font-medium">{car.km}</p>
                    </div>
                  </div>
                )}
                {car.range && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Gauge className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Range</p>
                      <p className="font-medium">{car.range}</p>
                    </div>
                  </div>
                )}
                {car.location && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium">{car.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent">
                  <TabsTrigger 
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="specifications"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="features"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent"
                  >
                    Features
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="p-6">
                  <h3 className="font-bold text-xl mb-4">About {car.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The {car.name} is a popular {car.type || 'vehicle'} known for its reliability, 
                    performance, and comfort. It offers great value for money with its {car.fuelType?.toLowerCase()} 
                    engine and {car.transmission?.toLowerCase()} transmission.
                  </p>
                  {isUsedCar && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-green-900">CarDekho Assured</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-green-800">
                        <li>• 217-point quality check</li>
                        <li>• 6-month warranty</li>
                        <li>• 7-day money back guarantee</li>
                        <li>• Free RC transfer</li>
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="specifications" className="p-6">
                  <h3 className="font-bold text-xl mb-4">Specifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Fuel Type</span>
                      <span className="font-medium">{car.fuelType || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Transmission</span>
                      <span className="font-medium">{car.transmission || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Seating Capacity</span>
                      <span className="font-medium">{car.seating || 5} Seater</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Engine</span>
                      <span className="font-medium">1.5L Petrol</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Mileage</span>
                      <span className="font-medium">18 kmpl</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="p-6">
                  <h3 className="font-bold text-xl mb-4">Key Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['ABS with EBD', 'Airbags (Dual Front)', 'Air Conditioner', 'Power Windows', 
                      'Central Locking', 'Touchscreen Infotainment', 'Parking Sensors', 'Alloy Wheels'].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">Interested in this car?</h3>
              
              <div className="space-y-3 mb-6">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6">
                  Get Best Price
                </Button>
                <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 py-6">
                  Schedule Test Drive
                </Button>
                <Button variant="outline" className="w-full py-6">
                  Get EMI Options
                </Button>
              </div>

              {isUsedCar && (
                <>
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-semibold mb-3">Seller Details</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{car.location}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Listed:</span>
                        <span className="font-medium">2 days ago</span>
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Call Seller
                  </Button>
                </>
              )}

              {car.launchDate && (
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-gray-900">Expected Launch</span>
                  </div>
                  <p className="text-sm text-gray-700">{car.launchDate}</p>
                  <Button className="w-full mt-3 bg-orange-500 hover:bg-orange-600">
                    Alert Me
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;
