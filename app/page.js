"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import LeadFormModal from "../components/LeadFormModal";
import TrainFormModal from "../components/TrainFormModal";

export default function Home() {
  const [openTiffinForm, setOpenTiffinForm] = useState(false);
  const [openTrainForm, setOpenTrainForm] = useState(false);

  // section refs for scroll
  const plansRef = useRef(null);
  const menuRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div className="pb-10">
      <Navbar
        onPlans={() => plansRef.current?.scrollIntoView({ behavior: "smooth" })}
        onMenu={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
        onAbout={() => aboutRef.current?.scrollIntoView({ behavior: "smooth" })}
        onContact={() =>
          contactRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          {/* Text side */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold leading-snug">
              Daily Home-made Tiffin
              <span className="text-orange-600"> Fresh & Gharghuti</span>
            </h1>

            <p className="text-gray-700 text-sm max-w-md">
              Pre-order 1 day prior. Lunch & Dinner available daily. Office,
              Students & Home friendly.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setOpenTiffinForm(true)}
                className="px-4 py-2 text-white bg-green-600 rounded text-sm"
              >
                Get Tiffin
              </button>

              <button
                className="px-4 py-2 border rounded text-sm"
                onClick={() =>
                  window.open("https://wa.me/919967639919", "_blank")
                }
              >
                WhatsApp
              </button>
            </div>
          </div>

          {/* Image side */}
          <div className="flex justify-center sm:justify-end">
            <Image
              src="/tiffin.png"
              width={420}
              height={280}
              alt="Tiffin Placeholder"
              priority
              loading="eager"
              className="rounded-xl object-cover shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* TRAIN DELIVERY USP */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-xl font-semibold mb-3">
          Train Delivery (रेल्वेवर टिफिन सेवा)
        </h2>

        <p className="text-gray-700 text-sm leading-relaxed mb-4 max-w-3xl">
          Travelling by train? Pre-order 1 day prior आणि आम्ही तुमचा{" "}
          <span className="font-semibold">घरगुती डबा</span> थेट स्टेशनवर
          ट्रेनच्या वेळेतच पोहोचवतो. Office-travellers, students आणि long
          journey करणाऱ्यांसाठी perfect.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
          <div className="border rounded-md p-3 shadow-sm">
            <p className="font-medium">How it Works (कसे काम करते?)</p>
            <ul className="text-xs text-gray-600 mt-2 space-y-1 list-disc list-inside">
              <li>Pre-order 1 day prior</li>
              <li>Share train number + expected arrival</li>
              <li>Pickup at platform on exact timing</li>
            </ul>
          </div>

          <div className="border rounded-md p-3 shadow-sm">
            <p className="font-medium">Delivery Stations (स्टेशन्स)</p>
            <p className="text-xs text-gray-600 mt-2">
              Mumbai, Dadar, CSMT, Pune, Nashik, Solapur
              <span className="block text-[10px] mt-1">*More on request</span>
            </p>
          </div>
        </div>

        <button
          onClick={() => setOpenTrainForm(true)}
          className="px-4 py-2 text-white bg-green-600 rounded text-sm"
        >
          Order for Train Delivery
        </button>
      </section>

      {/* BENEFITS */}
      <section className="max-w-5xl mx-auto px-4 py-8" ref={plansRef}>
        <h2 className="text-xl font-semibold mb-3">
          Why Bhavsar Tiffin? (का निवडावे?)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border rounded-md p-3 shadow-sm">
            <p className="font-medium text-sm">घरगुती & स्वच्छ</p>
            <p className="text-xs text-gray-600 mt-1">
              घरच्या चवीत ताजं जेवण — बिना over masala, बिना ओंगळ तेल.
            </p>
          </div>

          <div className="border rounded-md p-3 shadow-sm">
            <p className="font-medium text-sm">साधे पण चवदार</p>
            <p className="text-xs text-gray-600 mt-1">
              रोजचं जेवण boring नसतं — हलकं + चवदार + manpasand flavors.
            </p>
          </div>

          <div className="border rounded-md p-3 shadow-sm">
            <p className="font-medium text-sm">Less Oil, Easy Digestion</p>
            <p className="text-xs text-gray-600 mt-1">
              ऑफिस / स्टुडंट्स / hostelers साठी perfect – भारी नाही, जड नाही.
            </p>
          </div>

          <div className="border rounded-md p-3 shadow-sm">
            <p className="font-medium text-sm">Pre-Order System</p>
            <p className="text-xs text-gray-600 mt-1">
              एक दिवस आधी order — Lunch, Dinner किंवा Both मिळेल.
            </p>
          </div>
        </div>

        {/* <p className="text-[11px] text-gray-500 mt-3">
          नोट: मसाले, तेल & चव मनासारखा balanced — ना फार तिखट ना फार गोड.
        </p> */}
      </section>

      {/* PLANS */}
      <section className="max-w-5xl mx-auto px-4 py-8" ref={plansRef}>
        <h2 className="text-xl font-semibold mb-4">Plans (डबे योजना)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* DAILY */}
          <div className="border rounded-md p-4 shadow-sm bg-orange-50/40">
            <p className="font-medium text-sm">Daily Tiffin (दररोजचा डबा)</p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1">
              <li>Lunch / Dinner / Both</li>
              <li>Pre-order 1 day prior (एक दिवस आधी)</li>
              <li>Flexible for office & students</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2">Pricing on inquiry</p>
          </div>

          {/* WEEKLY */}
          <div className="border rounded-md p-4 shadow-sm bg-orange-50/40">
            <p className="font-medium text-sm">Weekly Plan (साप्ताहिक)</p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1">
              <li>Mon–Fri / Mon–Sat</li>
              <li>Lunch / Dinner / Both</li>
              <li>Weekend optional (वीकेंड ऑप्शनल)</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2">Pricing on inquiry</p>
          </div>

          {/* MONTHLY */}
          <div className="border rounded-md p-4 shadow-sm bg-orange-50/40">
            <p className="font-medium text-sm">Monthly Plan (मासिक)</p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1">
              <li>Ideal for office + students + hostel</li>
              <li>Lunch / Dinner / Both</li>
              <li>Weekend optional</li>
            </ul>
            <p className="text-xs text-gray-600 mt-2">Pricing on inquiry</p>
          </div>
        </div>
      </section>

      {/* SAMPLE MENU */}
      <section className="max-w-5xl mx-auto px-4 py-8" ref={menuRef}>
        <h2 className="text-xl font-semibold mb-3">Menu (खाद्यसूची)</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["/menu5.jpg", "/menu7.jpg", "/menu6.jpg"].map((src, i) => (
            <div
              key={i}
              className="border rounded-md shadow-sm overflow-hidden"
            >
              <Image
                src={src}
                width={300}
                height={220}
                alt={`Menu sample ${i + 1}`}
                className="w-full h-[220px] object-cover"
              />
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-600 mt-2">
          Menu may vary daily based on seasonal vegetables.
        </p>
      </section>

      {/* ABOUT */}
      <section className="max-w-5xl mx-auto px-4 py-12" ref={aboutRef}>
        <h2 className="text-xl font-semibold mb-6">About (आपल्याबद्दल)</h2>

        <div className="flex flex-col md:flex-row md:items-start md:gap-8 lg:gap-12">
          {/* IMAGE */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/owner1.jpeg"
              alt="Founder of Bhavsar Tiffin"
              width={400}
              height={400}
              priority
              className="rounded-md object-cover object-center shadow-md w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]"
            />
          </div>

          {/* TEXT */}
          <div className="text-gray-700 text-sm leading-relaxed mt-6 md:mt-0 md:flex-1 space-y-3">
            <p>
              <span className="font-semibold">Bhavsar Tiffin</span> हा घरगुती व
              साधेपणावर आधारित
              <span className="font-semibold"> tiffin service</span> आहे स्वच्छ,
              कमी तेलात आणि पचनास हलके.
            </p>

            <p>
              Started by a <span className="font-semibold">homemaker</span> with
              the intention of serving
              <span className="font-semibold"> healthy gharghuti food</span> to
              office goers, students आणि travelling लोकांसाठी.
            </p>

            <p className="italic text-gray-600">
              “जेवण साधं, मनापासून. घरासारखं जेवण कुठेच मिळत नाही म्हणून Bhavsar
              Tiffin.”
            </p>

            <p>
              <span className="font-semibold">Daily Lunch</span> आणि{" "}
              <span className="font-semibold">Dinner</span> दोन्ही उपलब्ध.
              <span className="font-semibold"> Pre-order 1 day prior</span>.
              Weekend optional as per requirement.
            </p>

            <p className="text-xs text-gray-500 pt-2">
              Serving since <span className="font-semibold">2021</span> — for
              students, professionals & families.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="max-w-5xl mx-auto px-4 py-10" ref={contactRef}>
        <h2 className="text-xl font-semibold mb-3">Contact (संपर्क)</h2>

        <div className="border rounded-md p-4 shadow-sm space-y-3 text-sm">
          <div>
            <p className="font-medium">Owner Contact:</p>
            <p className="text-gray-700 mt-1 space-y-1">
              <span>
                Call:&nbsp;
                <a
                  href="tel:+919820174460"
                  className="font-semibold text-black underline"
                >
                  +91 98201 74460
                </a>
              </span>
              <br />
              <span>
                WhatsApp:&nbsp;
                <a
                  href="https://wa.me/919967639919"
                  target="_blank"
                  className="font-semibold text-black underline"
                >
                  +91 99676 39919
                </a>
              </span>
            </p>
          </div>

          <div>
            <p className="font-medium">Base Kitchen:</p>
            <p className="text-gray-700 text-xs">Prabhadevi, Mumbai</p>
          </div>

          <div>
            <p className="font-medium">Delivery Areas:</p>
            <p className="text-xs text-gray-600">
              Dadar, Kalyan, CSMT, Pune, Nashik, Solapur (More on request)
            </p>
          </div>

          <div>
            <p className="font-medium">Ordering:</p>
            <p className="text-xs text-gray-600">
              1 day prior pre-order required (Lunch / Dinner / Both)
            </p>
          </div>

          <div>
            <p className="font-medium">Pricing:</p>
            <p className="text-xs text-gray-600">
              Shared after inquiry (depends on plan + location)
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setOpenTiffinForm(true)}
              className="px-4 py-2 text-white bg-green-600 rounded text-sm"
            >
              Get Tiffin
            </button>

            <button
              onClick={() =>
                window.open("https://wa.me/919967639919", "_blank")
              }
              className="px-4 py-2 border rounded text-sm"
            >
              WhatsApp
            </button>

            <button
              onClick={() => window.open("tel:+919820174460")}
              className="px-4 py-2 border rounded text-sm"
            >
              Call
            </button>
          </div>
        </div>
      </section>

      <LeadFormModal
        open={openTiffinForm}
        onClose={() => setOpenTiffinForm(false)}
      />
      <TrainFormModal
        open={openTrainForm}
        onClose={() => setOpenTrainForm(false)}
      />
    </div>
  );
}
