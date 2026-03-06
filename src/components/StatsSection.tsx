import { useEffect, useRef, useState } from "react";
import painBack from "@/assets/back.webp";
import painSurgery from "@/assets/surgery.webp";
import painBill from "@/assets/bill.webp";

const stats = [
  { img: painBack, prefix: "", end: 10000, suffix: "+", label: "Spine, Knee & Neck Pain\nReversed Successfully!" },
  { img: painSurgery, prefix: "", end: 5000, suffix: "+", label: "Surgeries Avoided!" },
  { img: painBill, prefix: "₹", end: 100, suffix: " Crores+", label: "Medical Bills Saved for\nPatients in 10 years!" },
];

function useCountUp(end: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);
  return count;
}

const StatCard = ({
  img, prefix, end, suffix, label,
}: {
  img: string; prefix: string; end: number; suffix: string; label: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(end, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden shadow-xl flex flex-col" style={{ backgroundColor: "#3d5a6e" }}>
      <div className="h-52 overflow-hidden">
        <img src={img} alt={label} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="px-6 py-8 text-center text-white flex flex-col items-center">
        <p className="text-4xl md:text-5xl font-heading font-black">
          {prefix}{count}{suffix}
        </p>
        <div className="w-10 h-0.5 bg-white/60 my-3" />
        <p className="font-heading font-semibold text-sm md:text-base leading-snug whitespace-pre-line">
          {label}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => (
  <section className="bg-section-green py-14">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
