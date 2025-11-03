import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const CarCard = ({ car, showOffer = false }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group"
      onClick={() => navigate(`/car/${car.id}`)}>
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {car.badge && (
          <Badge className="absolute top-3 right-3 bg-white text-gray-800 border">
            {car.badge}
          </Badge>
        )}
        {car.launchDate && (
          <div className="absolute top-3 left-3 bg-white px-3 py-1 rounded text-xs font-medium text-gray-700">
            EXPECTED LAUNCH: {car.launchDate}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">{car.name}</h3>
        <p className="text-gray-900 font-bold mb-3">
          {car.priceRange}
          {car.estimated && <span className="text-xs text-gray-500 font-normal ml-1">Estimated</span>}
        </p>
        {showOffer ? (
          <Button
            variant="outline"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/car/${car.id}`);
            }}
          >
            View November Offers
          </Button>
        ) : car.launchDate ? (
          <Button
            variant="outline"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Alert Me When Launched
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/car/${car.id}`);
            }}
          >
            View Details
          </Button>
        )}
      </div>
    </div>
  );
};

export default CarCard;
