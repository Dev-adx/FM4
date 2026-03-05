import { Briefcase, Monitor, Heart, Users } from "lucide-react";

const audiences = [
  { icon: Briefcase, title: "Busy Business Owners", desc: "Those struggling to manage business due to frustrating back, neck or knee pain" },
  { icon: Monitor, title: "Desk Job Employees", desc: "Anyone who spends long hours sitting and wants to improve their posture or eliminate back-induced pain" },
  { icon: Users, title: "Older Adults (55+)", desc: "Those seeking gentle yet effective techniques to relieve pain and improve posture for better mobility and comfort" },
  { icon: Heart, title: "Busy or Working Moms", desc: "Women facing difficulties in managing day-to-day home or work activities due to body pain" },
];

const AudienceSection = () => (
  <section className="py-14" style={{ backgroundColor: "#3d5a6e" }}>
    <div className="container max-w-4xl">
      <h2 className="text-2xl md:text-4xl font-heading font-bold text-center text-white mb-10">
        Who is this Workshop for?
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {audiences.map((a, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <a.icon className="text-white" size={24} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg mb-1">{a.title}</h3>
              <p className="text-muted-foreground text-sm">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceSection;
