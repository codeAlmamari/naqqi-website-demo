import { useNavigate } from 'react-router-dom';
import { Car, Home, MapPin, Star, Clock } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'car-wash',
      title: 'خدمة غسيل السيارات',
      description: 'خدمات احترافية لغسيل وتنظيف وتلميع السيارات',
      icon: Car,
      image: 'https://images.unsplash.com/photo-1760827797819-4361cd5cd353?w=600',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'home-cleaning',
      title: 'تنظيف المنازل',
      description: 'خدمات تنظيف احترافية للمنازل والمكاتب',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=600',
      color: 'from-teal-500 to-emerald-500',
    },
  ];

  const features = [
    {
      icon: MapPin,
      title: 'أقرب مزوّدي الخدمة إليك',
      description: 'اعثر على أفضل مزوّدي الخدمات في منطقتك',
    },
    {
      icon: Star,
      title: 'تقييمات موثوقة',
      description: 'تقييمات حقيقية من عملاء حقيقيين',
    },
    {
      icon: Clock,
      title: 'حجز سريع وسهل',
      description: 'احجز خدمتك بخطوات بسيطة',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center mb-16">
          <h1 className="mb-4 text-gray-900">
            منصتك الأولى للخدمات الموثوقة
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            تواصل مع مزوّدي خدمات موثوقين لغسيل السيارات وتنظيف المنازل
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => navigate(`/vendors?category=${category.id}`)}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80 group-hover:opacity-90 transition-opacity`}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <Icon className="w-16 h-16 mb-4" />
                  <h2 className="mb-2 text-white">{category.title}</h2>
                  <p className="text-white/90 text-center">{category.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Vendor CTA */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-gray-700 rounded-3xl p-12 text-center shadow-xl">
          <h2 className="mb-4 text-white">هل أنت صاحب خدمة؟</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            سجّل في منصتنا وابدأ بتطوير أعمالك والوصول إلى آلاف العملاء
          </p>
          <button
            onClick={() => navigate('/vendor/dashboard')}
            className="px-8 py-4 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors shadow-lg"
          >
            الذهاب إلى لوحة تحكّم مزوّد الخدمة
          </button>
        </div>
      </div>
    </div>
  );
}
