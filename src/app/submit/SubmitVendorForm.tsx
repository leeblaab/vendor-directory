'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { submitVendor, Category } from '@/lib/directus';

// UAE Emirates & Major Areas
const UAE_AREAS = [
  // Dubai
  'Dubai - Deira', 'Dubai - Bur Dubai', 'Dubai - Downtown', 'Dubai - Marina',
  'Dubai - JLT', 'Dubai - JBR', 'Dubai - Business Bay', 'Dubai - Al Barsha',
  'Dubai - Jumeirah', 'Dubai - Al Quoz', 'Dubai - Silicon Oasis', 'Dubai - International City',
  // Abu Dhabi
  'Abu Dhabi - City Center', 'Abu Dhabi - Al Reem', 'Abu Dhabi - Yas Island',
  'Abu Dhabi - Saadiyat', 'Abu Dhabi - Khalifa City', 'Abu Dhabi - Al Ain',
  // Sharjah
  'Sharjah - City Center', 'Sharjah - Al Majaz', 'Sharjah - Al Nahda',
  // Other Emirates
  'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah',
];

type Step = 1 | 2 | 3 | 4;

type FormData = {
  name: string;
  category: string;
  description: string;
  phone: string;
  whatsapp_link: string;
  website: string;
  email: string;
  service_areas: string[];
  notes: string;
};

const initialFormData: FormData = {
  name: '',
  category: '',
  description: '',
  phone: '',
  whatsapp_link: '',
  website: '',
  email: '',
  service_areas: [],
  notes: '',
};

export default function SubmitVendorForm() {
  const router = useRouter();
  const { getToken, user } = useAuth();

  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

// Fetch categories on mount (through proxy to avoid CORS)
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/directus/items/categories?fields=id,name,slug,icon&sort=name');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error('Failed to load categories:', err);
    } finally {
      setIsLoadingCategories(false);
    }
  };
  fetchCategories();
}, []);
// Fetch vendor data on mount


  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const toggleArea = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      service_areas: prev.service_areas.includes(area)
        ? prev.service_areas.filter((a) => a !== area)
        : [...prev.service_areas, area],
    }));
    setError('');
  };

  // Validation per step
  const validateStep = (step: Step): string | null => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) return 'Business name is required';
        if (formData.name.trim().length < 3) return 'Business name must be at least 3 characters';
        if (!formData.category) return 'Please select a category';
        if (!formData.description.trim()) return 'Description is required';
        if (formData.description.trim().length < 20) return 'Description must be at least 20 characters';
        return null;

      case 2:
        if (!formData.phone.trim()) return 'Phone number is required';
        const phoneClean = formData.phone.replace(/\D/g, '');
        if (phoneClean.length < 8) return 'Please enter a valid phone number';
        if (formData.email && !formData.email.includes('@')) return 'Please enter a valid email';
        if (formData.website) {
          try {
            new URL(formData.website.startsWith('http') ? formData.website : `https://${formData.website}`);
          } catch {
            return 'Please enter a valid website URL';
          }
        }
        return null;

      case 3:
        if (formData.service_areas.length === 0) return 'Please select at least one service area';
        return null;

      default:
        return null;
    }
  };

  const handleNext = () => {
    const validationError = validateStep(currentStep);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setCurrentStep((prev) => Math.min(prev + 1, 4) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const token = getToken();
    if (!token) {
      setError('You must be logged in to submit a vendor');
      setIsSubmitting(false);
      return;
    }

    try {
      // Prepare data
      const vendorData = {
        name: formData.name.trim(),
        category: parseInt(formData.category, 10),
        phone: formData.phone.trim(),
        whatsapp_link: formData.whatsapp_link.trim() || undefined,
        website: formData.website.trim() || undefined,
        email: formData.email.trim() || undefined,
        description: formData.description.trim(),
        service_areas: formData.service_areas,
        notes: formData.notes.trim() || undefined,
      };

      const result = await submitVendor(token, vendorData);

      if (result.success) {
        setIsSuccess(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============ SUCCESS STATE ============
  if (isSuccess) {
    return (
      <div className="bg-white dark:bg-gray-900 border border-[#B4D4FF] dark:border-gray-800 rounded-2xl p-8 sm:p-12 shadow-sm text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">
            check_circle
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Submission Received! 🎉
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-md mx-auto">
          Thank you, <strong>{user?.first_name}</strong>! Your vendor <strong>{formData.name}</strong> has been submitted for review.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-8 max-w-md mx-auto">
          Our team will review the submission and publish it within 24-48 hours. You'll be able to see it on the site once approved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setFormData(initialFormData);
              setCurrentStep(1);
              setIsSuccess(false);
            }}
            className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Submit Another Vendor
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#176B87] hover:bg-[#86B6F6] text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">home</span>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ============ PROGRESS BAR ============
  const steps = [
    { num: 1, label: 'Business Info', icon: 'business' },
    { num: 2, label: 'Contact', icon: 'contact_phone' },
    { num: 3, label: 'Service Areas', icon: 'map' },
    { num: 4, label: 'Review', icon: 'fact_check' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Submit a Vendor
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Help grow our directory by adding a trusted service provider
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-900 border border-[#B4D4FF] dark:border-gray-800 rounded-xl p-4 sm:p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          {steps.map((step, idx) => (
            <div key={step.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                    currentStep === step.num
                      ? 'bg-[#176B87] text-white shadow-lg scale-110'
                      : currentStep > step.num
                      ? 'bg-[#86B6F6] text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {currentStep > step.num ? (
                    <span className="material-symbols-outlined text-xl">check</span>
                  ) : (
                    <span className="material-symbols-outlined text-xl">{step.icon}</span>
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm mt-2 font-medium hidden sm:block ${
                    currentStep >= step.num
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-colors ${
                    currentStep > step.num
                      ? 'bg-[#86B6F6]'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-900 border border-[#B4D4FF] dark:border-gray-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3 mb-6">
              <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-xl flex-shrink-0">
                error
              </span>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* ============ STEP 1: BUSINESS INFO ============ */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#176B87]">business</span>
                  Business Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tell us about the service provider
                </p>
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g., Ahmed Plumbing Services"
                  className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#86B6F6] focus:border-transparent transition"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formData.name.length}/100 characters
                </p>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                {isLoadingCategories ? (
                  <div className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-500">
                    Loading categories...
                  </div>
                ) : (
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => updateField('category', e.target.value)}
                    className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#86B6F6] focus:border-transparent transition"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Describe the services offered, experience, specialties..."
                  rows={5}
                  className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#86B6F6] focus:border-transparent transition resize-none"
                  maxLength={1000}
                />
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {formData.description.length}/1000 characters (minimum 20)
                </p>
              </div>
            </div>
          )}

          {/* ============ STEP 2: CONTACT ============ */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#176B87]">contact_phone</span>
                  Contact Information
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  How can customers reach this business?
                </p>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+971 50 123 4567"
                  className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#86B6F6] focus:border-transparent transition"
                />
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="whatsapp_link" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  WhatsApp Link <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="whatsapp_link"
                  type="url"
                  value={formData.whatsapp_link}
                  onChange={(e) => updateField('whatsapp_link', e.target.value)}
                  placeholder="https://wa.me/971501234567"
                  className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#86B6F6] focus:border-transparent transition"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="business@example.com"
                  className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#86B6F6] focus:border-transparent transition"
                />
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://www.business.com"
                  className="w-full px-4 py-3 border border-[#B4D4FF] dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#86B6F6] focus:border-transparent transition"
                />
              </div>
            </div>
          )}

          {/* ============ STEP 3: SERVICE AREAS ============ */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#176B87]">map</span>
                  Service Areas
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Where does this business operate? Select all that apply.
                </p>
              </div>

              {/* Selected Count */}
              <div className="flex items-center justify-between bg-[#EEF5FF] dark:bg-blue-900/20 border border-[#B4D4FF] dark:border-blue-800 rounded-lg px-4 py-3">
                <span className="text-sm font-medium text-[#176B87] dark:text-blue-300">
                  {formData.service_areas.length} area{formData.service_areas.length !== 1 ? 's' : ''} selected
                </span>
                {formData.service_areas.length > 0 && (
                  <button
                    type="button"
                    onClick={() => updateField('service_areas', [])}
                    className="text-sm text-[#176B87] dark:text-blue-400 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Areas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto pr-2">
                {UAE_AREAS.map((area) => {
                  const isSelected = formData.service_areas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleArea(area)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'bg-[#EEF5FF] dark:bg-blue-900/30 border-[#86B6F6] dark:border-blue-700 text-[#176B87] dark:text-blue-300'
                          : 'bg-white dark:bg-gray-800 border-[#B4D4FF] dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-[#86B6F6] dark:hover:border-blue-800'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                          isSelected
                            ? 'bg-[#176B87] border-[#176B87]'
                            : 'border-[#B4D4FF] dark:border-gray-600'
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-white text-sm">check</span>
                        )}
                      </span>
                      <span className="text-sm font-medium">{area}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============ STEP 4: REVIEW ============ */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#176B87]">fact_check</span>
                  Review Your Submission
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please review the information before submitting
                </p>
              </div>

              {/* Business Info */}
              <div className="border border-[#B4D4FF] dark:border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">business</span>
                    Business Info
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-sm text-[#176B87] dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                    Edit
                  </button>
                </div>
                <dl className="space-y-2">
                  <div className="flex gap-2">
                    <dt className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">Name:</dt>
                    <dd className="text-gray-900 dark:text-white">{formData.name}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">Category:</dt>
                    <dd className="text-gray-900 dark:text-white">
                      {categories.find(c => c.id.toString() === formData.category)?.name || 'Loading...'}
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">Desc:</dt>
                    <dd className="text-gray-900 dark:text-white line-clamp-2">{formData.description}</dd>
                  </div>
                </dl>
              </div>

              {/* Contact Info */}
              <div className="border border-[#B4D4FF] dark:border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">contact_phone</span>
                    Contact Info
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-sm text-[#176B87] dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                    Edit
                  </button>
                </div>
                <dl className="space-y-2">
                  <div className="flex gap-2">
                    <dt className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">Phone:</dt>
                    <dd className="text-gray-900 dark:text-white">{formData.phone}</dd>
                  </div>
                  {formData.whatsapp_link && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">WhatsApp:</dt>
                      <dd className="text-gray-900 dark:text-white">{formData.whatsapp_link}</dd>
                    </div>
                  )}
                  {formData.email && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">Email:</dt>
                      <dd className="text-gray-900 dark:text-white">{formData.email}</dd>
                    </div>
                  )}
                  {formData.website && (
                    <div className="flex gap-2">
                      <dt className="font-medium text-gray-700 dark:text-gray-300 min-w-[100px]">Website:</dt>
                      <dd className="text-gray-900 dark:text-white">{formData.website}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Service Areas */}
              <div className="border border-[#B4D4FF] dark:border-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">map</span>
                    Service Areas
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-sm text-[#176B87] dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-base">edit</span>
                    Edit
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.service_areas.map(area => (
                    <span key={area} className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#EEF5FF] dark:bg-gray-800 text-xs font-medium text-[#176B87] dark:text-gray-300">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ============ FORM ACTIONS ============ */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-between">
            <div>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back
                </button>
              )}
            </div>

            <div className="flex gap-3 ml-auto">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-[#176B87] hover:bg-[#86B6F6] text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  Next
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#176B87] hover:bg-[#86B6F6] disabled:opacity-70 text-white font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Vendor
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}