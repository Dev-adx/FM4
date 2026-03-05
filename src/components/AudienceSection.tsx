import { Briefcase, Monitor, Heart, Users } from "lucide-react";

const audiences = [
  { icon: Briefcase, title: "Busy Business Owners", desc: "Those struggling to manage business due to frustrating back, neck or knee pain" },
  { icon: Monitor, title: "Desk Job Employees", desc: "Anyone who spends long hours sitting and wants to improve their posture or eliminate pain" },
  { icon: Users, title: "Older Adults (55+)", desc: "Those seeking gentle yet effective techniques to relieve pain and improve posture for better mobility" },
  { icon: Heart, title: "Busy or Working Moms", desc: "Women facing difficulties in managing day-to-day home or work activities due to body pain" },
];

const AudienceSection = () => (
  <section className="bg-section-white py-14">
    <div className="container max-w-5xl">
      <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-10">
        Who is this Workshop for?
      </h2>
      <div className="grid sm:grid-cols-2 gap-6">
        {audiences.map((a, i) => (
          <div key={i} className="bg-card rounded-2xl p-6 shadow-sm border text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <a.icon className="text-primary" size={28} />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">{a.title}</h3>
            <p className="text-muted-foreground">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceSection;
