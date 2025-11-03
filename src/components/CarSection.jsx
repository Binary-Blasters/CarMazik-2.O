import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import CarCard from './CarCard';
import { Button } from './ui/button';

const CarSection = ({ title, cars, showOffer = false, viewAllLink }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-3">
          {viewAllLink && (
            <Button
              variant="ghost"
              className="text-orange-500 hover:text-orange-600 flex items-center gap-1"
              onClick={() => window.location.href = viewAllLink}
            >
              View All {title} <ArrowRight className="w-4 h-4" />
            </Button>
          )}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cars.map((car) => (
          <div key={car.id} className="flex-shrink-0 w-72">
            <CarCard car={car} showOffer={showOffer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarSection;
