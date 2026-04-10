"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import api from "@/lib/api";

interface IFormInput {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  role: string;
}

// Age Calculation Helper
const calculateAge = (dobString: string): number => {
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

function RegistrationForm() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category"); 
  const router = useRouter();

  // New states for Loading and the custom Banner
  const [isLoading, setIsLoading] = useState(false);
  const [banner, setBanner] = useState<{ show: boolean; type: "success" | "error"; message: string } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const formValues = watch();

  // Banner Auto-Timeout & Redirect Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (banner?.show) {
      timer = setTimeout(() => {
        handleCloseBanner();
      }, 5000); // 5 second timeout
    }
    return () => clearTimeout(timer);
  }, [banner]);

  const handleCloseBanner = () => {
    const wasSuccess = banner?.type === "success";
    setBanner(null);
    if (wasSuccess) {
      router.push("/");
    }
  };

  const loadScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!scriptLoaded) throw new Error("Secure gateway failed to initialize.");

      // create order
      const { data: res } = await api.post("/api/payment/create-order", {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        dob: data.dob,
        email: data.email,
        phone: data.phone,
        address: data.address,
        trialDistrict: data.district,
        role: data.role,
      });

      const options = {
        key: "rzp_test_SaslEWPaDx419S",
        amount: res.order.amount,
        currency: "INR",
        order_id: res.order.id,

        handler: async function (response: any) {
          try {
            await api.post("/api/payment/verify", {
              registrationId: res.registrationId,
              ...response,
            });
            
            // Empty all fields on success
            reset(); 
            setBanner({ show: true, type: "success", message: "Transaction verified. Your trial slot is secured." });
          } catch (verifyErr) {
            setBanner({ show: true, type: "error", message: "Payment verification failed. Please contact support." });
          }
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      // Handle payment failure event from Razorpay
      rzp.on('payment.failed', function (response: any) {
        setBanner({ show: true, type: "error", message: response.error.description || "Transaction declined." });
      });
      
      rzp.open();

    } catch (err: any) {
      setBanner({ show: true, type: "error", message: err.response?.data?.message || err.message || "An unexpected error occurred." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ===== CUSTOM CENTERED BANNER ===== */}
      {banner?.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm px-4 transition-all duration-300">
          <div className="bg-stone-50 border border-stone-300 p-8 max-w-sm w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-300">
            <button
              onClick={handleCloseBanner}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition-colors text-[10px] font-black uppercase tracking-widest"
            >
              [ X ]
            </button>
            <div className="mb-5">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-2 py-1 ${banner.type === 'success' ? 'bg-stone-200 text-stone-900' : 'bg-red-900/10 text-red-900'}`}>
                {banner.type === 'success' ? 'System Confirmed' : 'System Error'}
              </span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-stone-900 mb-3 leading-tight">
              {banner.type === 'success' ? 'Registration Complete' : 'Action Failed'}
            </h3>
            <p className="text-sm font-medium text-stone-600 leading-relaxed">
              {banner.message}
            </p>
            {banner.type === 'success' && (
               <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mt-6 animate-pulse">
                 Redirecting to home...
               </p>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="col-span-1 lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
            
            {/* 1. Personal Details */}
            <div className="space-y-6 sm:space-y-8">
              <div className="border-b border-stone-900 pb-4">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Section 01</p>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-stone-900">Personal Details</h2>
                {category && (
                  <p className="text-xs font-bold text-stone-500 uppercase mt-2">
                    Applying for: <span className="text-stone-900">{category === 'u19' ? 'Under-19 Division' : 'Senior Division'}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">First Name *</label>
                  <input 
                    {...register("firstName", { required: "First name is mandatory" })}
                    disabled={isLoading}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors disabled:opacity-50"
                    placeholder="e.g. Virat"
                  />
                  {errors.firstName && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.firstName.message}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Middle Name</label>
                  <input 
                    {...register("middleName")}
                    disabled={isLoading}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors disabled:opacity-50"
                    placeholder="Optional"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Last Name *</label>
                  <input 
                    {...register("lastName", { required: "Last name is mandatory" })}
                    disabled={isLoading}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors disabled:opacity-50"
                    placeholder="e.g. Kohli"
                  />
                  {errors.lastName && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.lastName.message}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Date of Birth *</label>
                  <input 
                    type="date"
                    disabled={isLoading}
                    {...register("dob", { 
                      required: "Date of Birth is required",
                      validate: (value) => {
                        const age = calculateAge(value);
                        if (category === "u19" && age >= 19) return `Eligibility failed: Age ${age}. U19 requires under 19.`;
                        if (category === "senior" && age < 19) return `Eligibility failed: Age ${age}. Senior requires 19+.`;
                        if (category === "senior" && age > 39) return `Eligibility failed: Age ${age}. Senior max age is 39.`;
                        return true;
                      }
                    })}
                    className={`bg-transparent border-b py-3 sm:py-4 focus:outline-none font-medium transition-colors disabled:opacity-50 ${errors.dob ? 'border-red-900 text-red-900' : 'border-stone-300 focus:border-stone-900 text-stone-900'}`}
                  />
                  {errors.dob && <span className="text-red-900 text-[10px] font-bold uppercase mt-2">{errors.dob.message}</span>}
                </div>
              </div>
            </div>

            {/* 2. Contact Details */}
            <div className="space-y-6 sm:space-y-8">
              <div className="border-b border-stone-900 pb-4">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Section 02</p>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-stone-900">Contact Intelligence</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Phone Number *</label>
                  <input 
                    type="tel"
                    disabled={isLoading}
                    {...register("phone", { 
                      required: "Contact number is required",
                      pattern: { value: /^[0-9]{10}$/, message: "Must be a valid 10-digit number" }
                    })}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors disabled:opacity-50"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.phone.message}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input 
                    type="email"
                    disabled={isLoading}
                    {...register("email", { 
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                    })}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors disabled:opacity-50"
                    placeholder="Optional"
                  />
                  {errors.email && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.email.message}</span>}
                </div>

                <div className="flex flex-col sm:col-span-2">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Full Address *</label>
                  <textarea 
                    rows={2}
                    disabled={isLoading}
                    {...register("address", { required: "Full residential address is required" })}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors resize-none disabled:opacity-50"
                    placeholder="House No., Street, City, State, PIN"
                  />
                  {errors.address && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.address.message}</span>}
                </div>
              </div>
            </div>

            {/* 3. Trial Details */}
            <div className="space-y-6 sm:space-y-8">
              <div className="border-b border-stone-900 pb-4">
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Section 03</p>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-stone-900">Trial Configuration</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Trial District (GT Road) *</label>
                  <select 
                    {...register("district", { required: "Please select a scouting district" })}
                    disabled={isLoading}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors appearance-none rounded-none disabled:opacity-50"
                  >
                    <option value="">-- Select Venue --</option>
                    <option value="Sonipat">Sonipat</option>
                    <option value="Panipat">Panipat</option>
                    <option value="Karnal">Karnal</option>
                    <option value="Kurukshetra">Kurukshetra</option>
                    <option value="Ambala">Ambala</option>
                  </select>
                  {errors.district && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.district.message}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Primary Role *</label>
                  <select 
                    {...register("role", { required: "Please define your playing role" })}
                    disabled={isLoading}
                    className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors appearance-none rounded-none disabled:opacity-50"
                  >
                    <option value="">-- Select Discipline --</option>
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="Batsman & Wicket Keeper">Batsman & Wicket Keeper</option>
                    <option value="All-rounder">All-rounder</option>
                  </select>
                  {errors.role && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.role.message}</span>}
                </div>
              </div>
            </div>

            {/* Mobile Submit & Cancel (Hidden on large desktop screens) */}
            <div className="block lg:hidden pt-8 space-y-4">
              <button 
                type="submit"
                disabled={!isValid || isLoading}
                className="w-full py-5 bg-stone-900 text-stone-50 font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-block animate-pulse">Processing...</span>
                ) : (
                  "Proceed to Payment \u2014 \u20B9499"
                )}
              </button>
              <Link 
                href="/"
                className="block w-full py-5 border-2 border-stone-900 text-stone-900 text-center font-bold text-sm uppercase tracking-widest hover:bg-stone-900 hover:text-stone-50 transition-colors disabled:opacity-50"
              >
                Cancel Application
              </Link>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: LIVE RECEIPT / PAYMENT */}
        <div className="col-span-1 lg:col-span-5 lg:sticky lg:top-12">
          <div className="bg-stone-100 border border-stone-300 p-6 sm:p-8 lg:p-10 flex flex-col h-full shadow-lg rounded-xl">
            <div className="border-b border-stone-300 pb-6 mb-8">
              <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em] mb-2">Live Summary</p>
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-stone-900">Application Draft</h3>
            </div>

            <div className="space-y-6 flex-1 mb-12">
              <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Athlete Name</p>
                <p className="text-sm sm:text-base font-bold text-stone-900 uppercase truncate">
                  {formValues.firstName || formValues.lastName 
                    ? `${formValues.firstName || ''} ${formValues.middleName || ''} ${formValues.lastName || ''}`
                    : "—"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Calculated Age</p>
                  <p className="text-xs sm:text-sm font-bold text-stone-900 uppercase">
                    {formValues.dob && !errors.dob ? `${calculateAge(formValues.dob)} Years` : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Phone</p>
                  <p className="text-xs sm:text-sm font-bold text-stone-900 uppercase truncate">{formValues.phone || "—"}</p>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Scouting District</p>
                <p className="text-xs sm:text-sm font-bold text-stone-900 uppercase">{formValues.district || "—"}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] mb-1">Specialization</p>
                <p className="text-xs sm:text-sm font-bold text-stone-900 uppercase">{formValues.role || "—"}</p>
              </div>
            </div>

            {/* Desktop Submit & Cancel */}
            <div className="pt-8 border-t border-stone-300 hidden lg:block space-y-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Entry Fee</span>
                <span className="text-3xl font-black text-stone-900 tracking-tighter">₹499</span>
              </div>
              
              <button 
                onClick={handleSubmit(onSubmit)}
                disabled={!isValid || isLoading}
                className="w-full py-5 bg-stone-900 text-stone-50 font-bold text-sm uppercase tracking-widest transition-colors hover:bg-stone-800 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-block animate-pulse">
                    Initializing Gateway...
                  </span>
                ) : (
                  "Pay via Razorpay"
                )}
              </button>
              <Link 
                href="/"
                className={`block w-full py-4 border-2 border-stone-900 text-stone-900 text-center font-bold text-sm uppercase tracking-widest transition-colors ${isLoading ? "opacity-50 pointer-events-none" : "hover:bg-stone-900 hover:text-stone-50"}`}
              >
                Cancel Application
              </Link>
              <p className="text-center text-[10px] text-stone-500 font-bold uppercase tracking-widest mt-4">
                Secured & Encrypted Checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Register() {
  return (
    <>
      <main className="flex-1 bg-stone-50 selection:bg-stone-900 selection:text-stone-50 pb-16 sm:pb-24">
        {/* Header */}
        <section className="pt-16 sm:pt-24 pb-8 sm:pb-12 border-b border-stone-200 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Link 
              href="/" 
              className="text-[10px] font-bold text-stone-500 uppercase tracking-[0.3em] hover:text-stone-900 transition-colors inline-block mb-4 sm:mb-6"
            >
              &larr; Return to Overview
            </Link>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-stone-900 uppercase tracking-tighter">
              Application <br className="hidden sm:block" />
              <span className="text-stone-400">Portal</span>
            </h1>
          </div>
        </section>

        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="h-96 flex items-center justify-center font-bold text-stone-500 uppercase tracking-widest">Loading Portal Data...</div>}>
              <RegistrationForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}