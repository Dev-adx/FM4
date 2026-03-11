import bonusImg from "@/assets/Bonus.webp";

const BonusSection = () => {
  return (
    <section className="bg-section-white pt-8 pb-8">
      <div className="container max-w-4xl">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center mb-8">
          Exclusive <span className="text-primary">Bonus</span>
        </h2>
        <div className="flex justify-center">
          <img
            src={bonusImg}
            alt="Bonus"
            className="w-full max-w-2xl rounded-xl shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
