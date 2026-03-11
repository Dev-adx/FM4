const FooterSection = () => (
  <footer className="bg-white">
    {/* Green top border */}
    <div className="h-1 bg-primary" />

    {/* Disclaimer content */}
    <div className="container max-w-5xl py-8 space-y-5 text-muted-foreground text-sm leading-relaxed">
      <p>
        Disclaimer: FM4 Therapy is a lifestyle and movement-based pain management approach. It does not replace professional medical advice, diagnosis, or treatment. Individual results may vary. Always consult your physician before starting any physical program.
      </p>
      <p>
        This site is not a part of the Facebook website or Facebook Inc. Additionally, This site is NOT endorsed by Facebook in any way. FACEBOOK is a trademark of FACEBOOK, Inc.
      </p>
      <p>
        This website is operated and maintained by FM4 Therapy. Use of the website is governed by its Terms Of Service and Privacy Policy. FM4 Therapy is a fitness education and training company. We do not sell "get pain-free overnight" programs. We believe, with education, individuals can be better prepared to make better health & fitness decisions, but we do not guarantee 100% success in our therapy for all conditions. Results vary, are not typical, and rely on individual effort, time, and habits, as well as unknown conditions and other factors. We only track completed therapy sessions and satisfaction of services by voluntary surveys. Results show that most Advanced Training clients who apply the training. Further, many patients do not continue with the program, do not apply what they learn, or do attempt to apply what they learn but nonetheless have difficulty in reversing their pain.
      </p>
      <p>
        All material is intellectual property and protected by copyright. Any duplication, reproduction, or distribution is strictly prohibited. Please see our Full Disclosure for important details.<br />
        We use cookies to help improve, promote and protect our services. By continuing to use this site, you agree to our privacy policy and terms of use.
      </p>
      <div>
        <p>FM4 Therapy</p>
        <p>Address: Plot no. 19, Kanchanganga Society Rd, opposite kalyan bhel, part 2, Bibwewadi, Pune, Maharashtra 411037</p>
      </div>
      <p>
        This website is owned and operated by <strong>Fitness Master.</strong>
      </p>
    </div>

    {/* Bottom copyright bar */}
    <div className="border-t border-gray-200 mb-20">
      <div className="container max-w-5xl py-2 text-center text-sm text-muted-foreground">
        Copyright © 2025 Fitness Master. All rights reserved.&nbsp;
        <a href="/refund-policy" className="underline hover:text-primary">Refund Policy</a>
        {" | "}
        <a href="/privacy-policy" className="underline hover:text-primary">Privacy Policy</a>
        {" | "}
        <a href="/terms-of-use" className="underline hover:text-primary">Terms of Use</a>
      </div>
    </div>
  </footer>
);

export default FooterSection;
