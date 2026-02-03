import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Clock, Star, Check } from 'lucide-react';
import { vendors } from '../data/mockData';
import { RatingStars } from '../components/RatingStars';

export function VendorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return <div className="p-8 text-center">مقدم الخدمة غير موجود</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-teal-600 hover:text-teal-700 mb-4"
          >
             الرجوع لمقدمي الخدمة ←
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Vendor Header */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="aspect-[3/1] overflow-hidden">
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="mb-2 text-gray-900">{vendor.name}</h1>
                <p className="text-gray-600 mb-4">{vendor.description}</p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">يبعد {vendor.distance} كم </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={vendor.rating} size={20} showValue />
                    <span className="text-gray-500">({vendor.reviews} تقييم)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="mb-6">الخدمات المتوفرة</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {vendor.services.map((service) => (
              <button
                key={service.id}
                onClick={() => navigate(`/booking/${vendor.id}/service/${service.id}`)}
                className="border border-gray-200 rounded-xl p-6 hover:border-teal-500 hover:shadow-md transition-all text-left group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="group-hover:text-teal-600 transition-colors">
                    {service.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-2xl text-teal-600">{service.price} ر.ع </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration} دقيقة</span>
                  </div>
                </div>
                <div className="mt-4 text-sm text-teal-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                 → أحجز الأن 
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mt-8">
          <h2 className="mb-6">تجارب العملاء</h2>
          <div className="space-y-6">
            {[
              {
                name: 'عبدالرحمن المعمري',
                rating: 5,
                date: '10 ديسمبر، 2026',
                comment: 'صراحة من أفضل المغاسل المتنقلة في المنطقة.',
              },
              {
                name: 'سارة محمد البطاشي',
                rating: 4,
                date: '4 ديسمبر، 2026',
                comment: 'شغل قوووي, أكيد بنخبر الربع عنها.',
              },
              {
                name: 'حمدان سالم الدرعي',
                rating: 3,
                date: '19 ديسمبر، 2026',
                comment: 'شغلهم زين ولكن في أفضل.',
              },
            ].map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div>{review.name}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                  </div>
                  <RatingStars rating={review.rating} size={16} />
                </div>
                <p className="text-gray-600 ml-13">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
