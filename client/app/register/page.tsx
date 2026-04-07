"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Form Interface
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const formValues = watch();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log("Form Submitted Successfully:", data);
    alert("Redirecting to Razorpay Secure Checkout for ₹499...");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
      {/* LEFT COLUMN: THE FORM */}
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
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                  placeholder="e.g. Virat"
                />
                {errors.firstName && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.firstName.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Middle Name</label>
                <input 
                  {...register("middleName")}
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                  placeholder="Optional"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Last Name *</label>
                <input 
                  {...register("lastName", { required: "Last name is mandatory" })}
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                  placeholder="e.g. Kohli"
                />
                {errors.lastName && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.lastName.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Date of Birth *</label>
                <input 
                  type="date"
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
                  className={`bg-transparent border-b py-3 sm:py-4 focus:outline-none font-medium transition-colors ${errors.dob ? 'border-red-900 text-red-900' : 'border-stone-300 focus:border-stone-900 text-stone-900'}`}
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
                  {...register("phone", { 
                    required: "Contact number is required",
                    pattern: { value: /^[0-9]{10}$/, message: "Must be a valid 10-digit number" }
                  })}
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                  placeholder="10-digit mobile number"
                />
                {errors.phone && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.phone.message}</span>}
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Email Address</label>
                <input 
                  type="email"
                  {...register("email", { 
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                  })}
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors"
                  placeholder="Optional"
                />
                {errors.email && <span className="text-stone-500 text-[10px] font-bold uppercase mt-2">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col sm:col-span-2">
                <label className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-2">Full Address *</label>
                <textarea 
                  rows={2}
                  {...register("address", { required: "Full residential address is required" })}
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors resize-none"
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
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors appearance-none rounded-none"
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
                  className="bg-transparent border-b border-stone-300 py-3 sm:py-4 focus:outline-none focus:border-stone-900 text-stone-900 font-medium transition-colors appearance-none rounded-none"
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
              disabled={!isValid}
              className="w-full py-5 bg-stone-900 text-stone-50 font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
            >
              Proceed to Payment &mdash; ₹499
            </button>
            <Link 
              href="/"
              className="block w-full py-5 border-2 border-stone-900 text-stone-900 text-center font-bold text-sm uppercase tracking-widest hover:bg-stone-900 hover:text-stone-50 transition-colors"
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
              disabled={!isValid}
              className="w-full py-5 bg-stone-900 text-stone-50 font-bold text-sm uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
            >
              Pay via Razorpay
            </button>
            <Link 
              href="/"
              className="block w-full py-4 border-2 border-stone-900 text-stone-900 text-center font-bold text-sm uppercase tracking-widest hover:bg-stone-900 hover:text-stone-50 transition-colors"
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