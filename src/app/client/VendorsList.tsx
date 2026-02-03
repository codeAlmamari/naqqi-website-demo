import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, Star } from 'lucide-react';
import { vendors } from '../data/mockData';
import { RatingStars } from '../components/RatingStars';

export function VendorsList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance');
  const [maxDistance, setMaxDistance] = useState(10);

  const categoryTitle = category === 'car-wash' ? 'غسيل السيارات' : 'تنطيف المنازل';

  const filteredVendors = vendors
    .filter((v) => {
      const matchesCategory = category
        ? (category === 'car-wash' && v.category === 'Car Wash Bus') ||
          (category === 'home-cleaning' && v.category === 'Home Cleaning')
        : true;
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDistance = v.distance <= maxDistance;
      return matchesCategory && matchesSearch && matchesDistance;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distance - b.distance;
      return b.rating - a.rating;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-gray-900">{categoryTitle}</h1>
            <button
              onClick={() => navigate('/')}
              className="text-teal-600 hover:text-teal-700"
            >
              العودة إلى الصفحة الرئيسية
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="البحث عن مزودي الخدمة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            <h3>فلترة</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm mb-2 text-gray-700">الترتيب حسب</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'distance' | 'rating')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="distance">الأقرب أولًا 📍</option>
                <option value="rating">الأعلى تقييمًا ⭐</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2 text-gray-700">
                الحد الأقصى للمسافة: {maxDistance} كم
              </label>
              <input
                type="range"
                min="1"
                max="20"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                تم العثور على {filteredVendors.length} مزوّد خدمة
              </div>
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              onClick={() => navigate(`/vendor/${vendor.id}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span className="text-sm">{vendor.distance} كم</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 group-hover:text-teal-600 transition-colors">
                  {vendor.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{vendor.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RatingStars rating={vendor.rating} size={16} showValue />
                    <span className="text-sm text-gray-500">({vendor.reviews})</span>
                  </div>
                  <div className="text-sm text-teal-600">
                    {vendor.services.length} خدمات متوفرة
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">لم نعثر على مزوّدي خدمة يناسبون اختياراتك</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setMaxDistance(20);
              }}
              className="mt-4 text-teal-600 hover:text-teal-700"
            >
              تصفية الفلتر
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
