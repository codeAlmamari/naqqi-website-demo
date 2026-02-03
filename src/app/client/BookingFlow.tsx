import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, CreditCard, Check } from 'lucide-react';
import { vendors } from '../data/mockData';
import { RatingStars } from '../components/RatingStars';

export function BookingFlow() {
  const { vendorId, serviceId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'timeslot' | 'checkout' | 'success'>('timeslot');
  const [selectedDate, setSelectedDate] = useState('2024-12-15');
  const [selectedTime, setSelectedTime] = useState('');
  const [ratings, setRatings] = useState({ timing: 0, quality: 0, treatment: 0 });
  const [comment, setComment] = useState('');

  const vendor = vendors.find((v) => v.id === vendorId);
  const service = vendor?.services.find((s) => s.id === serviceId);

  if (!vendor || !service) {
    return <div className="p-8">غير موجود</div>;
  }

  const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-12 max-w-2xl w-full text-center shadow-xl">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="mb-4 text-gray-900">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your {service.name} with {vendor.name} is scheduled for<br />
            <span className="text-teal-600">{selectedDate} at {selectedTime}</span>
          </p>

          {/* Status Timeline */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="mb-4 text-left">Booking Status</h3>
            <div className="space-y-3">
              {[
                { label: 'Booking Confirmed', status: 'completed' },
                { label: 'Vendor Notified', status: 'completed' },
                { label: 'Service Pending', status: 'current' },
                { label: 'Completed', status: 'pending' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      item.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : item.status === 'current'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {item.status === 'completed' ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span className={item.status === 'pending' ? 'text-gray-400' : ''}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Section */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="mb-4">Rate Your Experience</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Timing</label>
                <RatingStars
                  rating={ratings.timing}
                  interactive
                  onChange={(val) => setRatings({ ...ratings, timing: val })}
                  size={24}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Service Quality</label>
                <RatingStars
                  rating={ratings.quality}
                  interactive
                  onChange={(val) => setRatings({ ...ratings, quality: val })}
                  size={24}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Treatment</label>
                <RatingStars
                  rating={ratings.treatment}
                  interactive
                  onChange={(val) => setRatings({ ...ratings, treatment: val })}
                  size={24}
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Comments (Optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
            <button
              onClick={() => alert('Rating submitted!')}
              className="flex-1 px-6 py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors"
            >
              Submit Rating
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'checkout') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={() => setStep('timeslot')} className="text-teal-600 mb-6">
            ← Back
          </button>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-6">
                <h2 className="mb-6">Payment Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
                <h3 className="mb-4">Booking Summary</h3>
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service</span>
                    <span>{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span>{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span>{selectedTime}</span>
                  </div>
                </div>
                <div className="flex justify-between text-xl mb-6">
                  <span>Total</span>
                  <span className="text-teal-600">${service.price}</span>
                </div>
                <button
                  onClick={() => setStep('success')}
                  className="w-full py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors"
                >
                  Confirm & Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="text-teal-600 mb-6">
          رجوع ←
        </button>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="mb-6">أختيار اليوم و الوقت</h2>
              <div className="mb-6">
                <label className="block text-sm mb-3">اليوم</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm mb-3">أوقات الحجز المتاحة</label>
                <div className="grid grid-cols-3 gap-3">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-3 rounded-lg border-2 transition-all ${
                        selectedTime === time
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-gray-200 hover:border-teal-300'
                      }`}
                    >
                      <Clock className="w-4 h-4 mx-auto mb-1" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
              <h3 className="mb-4">تفاصيل الخدمة</h3>
              <div className="space-y-3 mb-6">
                <div>
                  <div className="text-sm text-gray-600">مقدم الخدمة</div>
                  <div>{vendor.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">الخدمة</div>
                  <div>{service.name}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">الوقت</div>
                  <div>{service.duration} دقيقة</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">السعر</div>
                  <div className="text-2xl text-teal-600">{service.price} ر.ع</div>
                </div>
              </div>
              <button
                onClick={() => selectedTime && setStep('checkout')}
                disabled={!selectedTime}
                className="w-full py-3 bg-teal-500 text-white rounded-xl hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                المتابعة إلى الدفع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
