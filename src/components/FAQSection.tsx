import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Does the Rollo robot work in snow and freezing temperatures?",
    answer: "Yes, Rollo is specifically tested for Nordic conditions. Thanks to its unique one-wheel gyroscopic stabilization and high torque, the robot can navigate through snow, mud, and ice in temperatures ranging from -20°C to +45°C.",
  },
  {
    question: "How is Rollo more cost-effective than human security guards?",
    answer: "One Rollo robot can replace 1-2 security guard shifts per day. Considering maintenance and energy costs, our clients save up to 60% on security expenses annually. Use our ROI calculator for a detailed estimate.",
  },
  {
    question: "How long does the battery last on a single charge?",
    answer: "Rollo's battery lasts up to 8 hours of continuous patrolling. The robot is equipped with an automatic recharging system – when the battery level is low, it autonomously returns to its charging station and resumes work after charging.",
  },
  {
    question: "Can the robot detect intruders in total darkness?",
    answer: "Yes, Rollo is equipped with a 360-degree AI-powered vision system, including thermal cameras and night vision sensors. This allows it to detect movement and objects in complete darkness from up to 100 meters away.",
  },
  {
    question: "In which industries is Rollo most effective?",
    answer: "Rollo is optimized for large outdoor areas such as logistics centers, solar farms, construction sites, and industrial zones where human guarding is expensive or hazardous.",
  },
  {
    question: "How is the robot controlled and monitored?",
    answer: "The robot operates autonomously but is connected to a cloud-based control center. Security teams can view real-time camera feeds, take manual control if necessary, or respond to alerts sent by the robot.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section bg-black text-white py-24">
      <div className="container-premium max-w-4xl">
        <div className="mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B4FF33] mb-4">
            Knowledge Base
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about Rollo's autonomous patrol robot technology, 
            ROI, and reliability in harsh environments.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-white/10 bg-white/5 px-6 rounded-lg data-[state=open]:bg-white/10 transition-all"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6 text-lg font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 p-8 border border-[#B4FF33]/20 bg-[#B4FF33]/5 rounded-2xl text-center">
          <h3 className="text-xl font-bold mb-2">Didn't find the answer?</h3>
          <p className="text-slate-400 mb-6">
            Our engineers are ready to answer even the most complex technical questions.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[#B4FF33] text-black px-8 py-3 rounded-full font-bold hover:bg-[#a2e62e] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
