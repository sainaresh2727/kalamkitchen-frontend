"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import CallUsBtn from '../components/Buttons/CallUsBtn';
import { Swiper, SwiperSlide } from "swiper/react";
import { findRelated } from '../utils/relatedProduct'
import { FaRegHeart } from "react-icons/fa";
import Link from 'next/link'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { IoArrowRedo } from "react-icons/io5";
import api from '../../services/api'
import { AxiosError } from "axios";
import { toast } from "react-toastify";

// ── Types ──────────────────────────────────────────────────────
interface FeatureItem {
  title: string;
  value: string;
}

// ── Emoji map ──────────────────────────────────────────────────


// ── Feature Card — defined OUTSIDE the main component ─────────
function FeatureCard({ item, index }: { item: FeatureItem; index: number }) {
  
  return (
    <div className="group flex items-start gap-3 p-4 rounded-2xl border border-[#27A8A3]/10 bg-[#f8fffe] hover:border-[#27A8A3]/35 hover:bg-[#f0faf9] hover:shadow-[0_4px_20px_rgba(39,168,163,0.1)] hover:-translate-y-0.5 transition-all duration-250 cursor-default">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#27A8A3] to-[#1E8E8A] flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-[0_3px_10px_rgba(39,168,163,0.3)] group-hover:shadow-[0_6px_16px_rgba(39,168,163,0.45)] transition-shadow duration-250 font-mono">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          {/* <span className="text-[14px] leading-none">{emoji}</span> */}
          <h4 className="text-[13px] font-bold text-[#0f1f2e] group-hover:text-[#27A8A3] transition-colors duration-200">
            {item.title}
          </h4>
        </div>
        <p className="text-[12px] text-[#6b7fa3] leading-[1.7]">{item.value}</p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────
function MainpdctPage({ product }: any) {

  const relatedProducts = findRelated(product)
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"features" | "smart">("features")

  const [contactDatas, setContactDatas] = useState({
    name: "",
    email: "",
    phNumber: "",
    description: "",
    productName: product.name || ""
  })

  // ── Handlers 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContactDatas((prev) => ({ ...prev, [name]: value }));
  };

  // ── Form submit — defined OUTSIDE return
  async function addContactDatas(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const res = await api.post('/user/add/contact', contactDatas)
      toast.success(res.data.message);
      setContactDatas({
        name: "",
        email: "",
        phNumber: "",
        description: "",
        productName: ""
      })
      setOpen(false)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Something went wrong");
    }
  }

  // ── Tabs config
  const tabs = [
    {
      id: "features" as const,
      label: "Key Features",
      count: product.keyFeatures.length,
      // icon: (
      //   <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      //     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      //   </svg>
      // ),
      items: product.keyFeatures,
    },
    {
      id: "smart" as const,
      label: "The Smart Choice",
      count: product.smartChoice.length,
      // icon: (
      //   <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      //     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      //   </svg>
      // ),
      items: product.smartChoice,
    },
  ];

  const active = tabs.find((t) => t.id === activeTab)!;

  // ── Return ──────────────────────────────────────────────────
  return (
    <>
      <section className='lg:py-20 py-10 flex flex-col gap-16'>

        {/* ── Main Product Section ── */}
        <div className="container">
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

            {/* Image */}
            <div className='flex items-center justify-center'>
              <Image
                src={product.img}
                alt={`${product.slug}-Image`}
                className='h-[400px] w-auto dynamic-pdct-img'
              />
            </div>

            {/* Info */}
            <div className='flex flex-col gap-4'>

              <div className='trusted-badge'>
                <div className="dot"></div>
                <p>{product.type}</p>
              </div>

              <h2 className='text-2xl lg:text-5xl leading-normal font-semibold text-[#27A8A3]'>
                {product.name}
              </h2>

              <div className='flex justify-between items-center'>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) =>
                    index < product.ratingStar ? (
                      <IoIosStar key={index} className="text-yellow-500 text-[18px]" />
                    ) : (
                      <IoIosStarOutline key={index} className="text-yellow-500 text-[18px]" />
                    )
                  )}
                </div>
                <p className='text-gray-700 text-[13px]'>
                  <span className='tracking-wider font-semibold'>{product.reviewNumber}</span>
                  ({product.reviewCound})
                </p>
                <div className='in-stock'>
                  <div className="dot-stock"></div>
                  <p className='font-semibold tracking-wider'>{product.stock}</p>
                </div>
              </div>

              <p className='text-gray-700 text-[13px] leading-loose relative pl-3 before:content-[""] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#27A8A3] before:rounded-sm'>
                {product.des}
              </p>

              <div className="grid grid-cols-2 gap-5 mt-3">
                <button className='contact-us-btn' onClick={() => setOpen(true)}>
                  CONTACT US
                </button>
                <CallUsBtn />
              </div>

            </div>
          </div>

          {/* ── Key Features / Smart Choice Tabs ── */}
          <div className="w-full mt-10">

            {/* Tab switcher */}
            <div className="relative flex bg-[#f0faf9] border border-[#27A8A3]/20 rounded-2xl p-1.5 mb-5 shadow-[0_2px_12px_rgba(39,168,163,0.08)]">
              <div
                className="absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-[0_4px_16px_rgba(39,168,163,0.18)] border border-[#27A8A3]/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: "calc(50% - 6px)",
                  left: activeTab === "features" ? "6px" : "calc(50%)",
                }}
              />
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[13.5px] font-semibold transition-all duration-300 ${
                    activeTab === tab.id ? "text-[#27A8A3]" : "text-[#6b7fa3] hover:text-[#27A8A3]"
                  }`}
                >
                  {/* <span className={`transition-all duration-300 ${activeTab === tab.id ? "scale-110 opacity-100" : "scale-100 opacity-50"}`}>
                    {tab.icon}
                  </span> */}
                  {tab.label}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all duration-300 ${
                    activeTab === tab.id ? "bg-[#27A8A3]/12 text-[#27A8A3]" : "bg-slate-100 text-slate-400"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Panel */}
            <div className="bg-white rounded-3xl border border-[#27A8A3]/12 shadow-[0_8px_40px_rgba(39,168,163,0.08)] overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-[#27A8A3] via-[#4FD1CC] to-[#1E8E8A]" />

              <div className="flex items-center gap-3 px-7 pt-6 pb-4 border-b border-[#27A8A3]/8">
                {/* <div className="w-9 h-9 rounded-xl bg-[#27A8A3]/10 flex items-center justify-center text-[#27A8A3] flex-shrink-0">
                  {active.icon}
                </div> */}
                <div>
                  <h3 className="font-bold text-[#0f1f2e] text-[15px]">{active.label}</h3>
                  <p className="text-[11.5px] text-[#94a3b8] mt-0.5">{active.count} highlights</p>
                </div>
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                {active.items.map((item: FeatureItem, i: number) => (
                  <FeatureCard key={i} item={item} index={i} />
                ))}
              </div>

              <div className="mx-5 mb-5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#27A8A3]/8 to-[#4FD1CC]/5 border border-[#27A8A3]/12 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-[12.5px] text-[#3a4f6a] font-medium">
                  All products fabricated to your exact specifications.
                </p>
                <button
                  onClick={() => setOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#27A8A3] text-white text-[12.5px] font-semibold hover:bg-[#1E8E8A] transition-colors duration-200 whitespace-nowrap"
                >
                  Get a Quote
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ── Related Products Section ── */}
        <div className="container">
          <h6 className='text-1xl tracking-wider font-bold text-[#27A8A3]'>
            EXPLORE MORE SIMILAR PRODUCTS
          </h6>
          <Swiper
            modules={[Pagination, Autoplay]}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500 }}
            loop
            className="!pb-10 [&_.swiper-pagination-bullet]:w-[6px] [&_.swiper-pagination-bullet]:h-[6px] [&_.swiper-pagination-bullet]:bg-[rgba(39,168,163,0.25)] [&_.swiper-pagination-bullet]:opacity-100 [&_.swiper-pagination-bullet-active]:w-[20px] [&_.swiper-pagination-bullet-active]:rounded-full [&_.swiper-pagination-bullet-active]:bg-[#27A8A3] mt-6"
          >
            {relatedProducts.map((x: any) => (
              <SwiperSlide key={x.slug}>
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-[20px] bg-white border border-[rgba(39,168,163,0.10)] shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_20px_40px_rgba(39,168,163,0.3)] hover:border-[rgba(39,168,163,0.28)]"
                  style={{ marginTop: "20px" }}
                >
                  <div className="absolute top-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#27A8A3] via-[#4FD1CC] to-[#1E8E8A] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10" />

                  <div className="relative overflow-hidden bg-gradient-to-br from-[rgba(39,168,163,0.05)] to-[rgba(79,209,204,0.03)] flex justify-center items-center h-[200px] border-b border-[rgba(39,168,163,0.08)]">
                    <Image
                      src={x.img}
                      alt={x.name}
                      className="h-[160px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-bold tracking-[0.14em] uppercase text-[#27A8A3] bg-white border border-[rgba(39,168,163,0.22)] px-3 py-[3px] rounded-full">
                      {x.type}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="text-[15px] font-bold text-[#0d2222] leading-snug tracking-[0.01em] transition-colors duration-200 group-hover:text-[#27A8A3]">
                      {x.name}
                    </h3>

                    <p className="text-[11.5px] text-gray-400 font-light leading-relaxed relative pl-3 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-sm before:bg-[#27A8A3]">
                      {x.des?.length > 70 ? x.des.slice(0, 70) + '…' : x.des}
                    </p>

                    <div className="h-[1px] bg-gradient-to-r from-[rgba(39,168,163,0.15)] to-transparent" />

                    <div className='flex items-center justify-between'>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) =>
                          index < x.ratingStar ? (
                            <IoIosStar key={index} className="text-yellow-500 text-[14px]" />
                          ) : (
                            <IoIosStarOutline key={index} className="text-yellow-500 text-[14px]" />
                          )
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#edf9f6] border-[1.5px] border-[#c8ede4] transition-all duration-300 group-hover:bg-[#3cba99] group-hover:border-[#3cba99] group-hover:scale-110 group-hover:-rotate-[4deg]">
                        <FaRegHeart className="w-4 h-4 text-[#3cba99] group-hover:text-white transition-colors duration-300" />
                      </div>
                    </div>

                    <Link
                      href={`/product-page/${x.slug}`}
                      className="w-full flex items-center justify-center gap-2 text-[11px] font-bold tracking-[1.2px] uppercase text-white bg-gradient-to-r from-[#27A8A3] to-[#1E8E8A] rounded-full py-[10px] shadow-[0_6px_20px_rgba(39,168,163,0.25)] transition-all duration-300 hover:shadow-[0_10px_28px_rgba(39,168,163,0.4)] hover:-translate-y-[2px]"
                    >
                      View Details
                      <IoArrowRedo className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </section>

      {/* ── Modal Backdrop ── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* ── Modal ── */}
      <div
        className={`fixed top-1/2 left-1/2 z-50 w-[95%] max-w-[850px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="grid lg:grid-cols-2">

          {/* Left panel */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#113B5C] via-[#1b4b72] to-[#27A8A3] text-white p-10 flex flex-col justify-center">
            <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-52 h-52 rounded-full bg-[#5EEAD4]/20 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                <span className="text-sm tracking-wider">Available For New Projects</span>
              </div>

              <h2 className="text-4xl font-bold mt-6 leading-tight">
                Let's Build Something
                <span className="block text-[#5EEAD4]">Extraordinary Together</span>
              </h2>

              <p className="mt-5 text-white/80 leading-relaxed">
                Transform your ideas into powerful digital experiences with our expert team.
              </p>

              <div className="mt-10 grid gap-4">
                {[
                  { icon: "🚀", text: "Fast Project Delivery" },
                  { icon: "💎", text: "Premium Quality Solutions" },
                  { icon: "🤝", text: "Dedicated Support Team" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — form */}
          <div className="p-8 bg-white">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Contact Us</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-3xl text-gray-500 hover:text-red-500 transition-colors"
              >
                ×
              </button>
            </div>

            <form className="space-y-5" onSubmit={addContactDatas}>

              {[
                { label: "Full Name",     name: "name",        type: "text",  placeholder: "Enter your full name",      value: contactDatas.name },
                { label: "Email Address", name: "email",       type: "email", placeholder: "you@example.com",           value: contactDatas.email },
                { label: "Phone Number",  name: "phNumber",    type: "tel",   placeholder: "+91 xxxxxxxxxx",            value: contactDatas.phNumber },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={handleChange}
                    className="w-full h-14 pl-5 rounded-2xl border border-gray-200 bg-[#f8fbfd] focus:bg-white focus:border-[#27A8A3] focus:ring-4 focus:ring-[#27A8A3]/10 transition-all duration-300 outline-none"
                  />
                </div>
              ))}

              {/* Service — read only */}
              <div>
                <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider">
                  Service
                </label>
                <input
                  type="text"
                  readOnly
                  value={contactDatas.productName}
                  className="w-full h-14 pl-5 rounded-2xl border border-gray-200 bg-[#f0f0f0] outline-none cursor-not-allowed text-gray-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-[#113B5C] mb-2 tracking-wider">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  name="description"
                  placeholder="Tell us about your project requirements..."
                  value={contactDatas.description}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 bg-[#f8fbfd] p-5 resize-none focus:bg-white focus:border-[#27A8A3] focus:ring-4 focus:ring-[#27A8A3]/10 transition-all duration-300 outline-none"
                />
              </div>

              {/* Trust badge */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                We typically respond within 24 hours
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative overflow-hidden w-full h-14 rounded-2xl text-white hover:scale-[1.02] transition-all duration-300"
                style={{ background: "var(--gradient-primary)" }}
              >
                <span className="relative z-10">Send Enquiry →</span>
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700" />
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainpdctPage