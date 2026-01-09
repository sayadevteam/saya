import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqItems = [
  {
    id: "01",
    q: "What is a UI component?",
    a: "A UI (User Interface) component is a modular, reusable element that serves a specific function within a graphical user interface. Examples include buttons, input fields, dropdown menus, sliders, and checkboxes.",
  },
  {
    id: "02",
    q: "Why are UI components important?",
    a: "UI components promote consistency, efficiency, and scalability in software development. They allow developers to reuse code and maintain a consistent look and feel across an application.",
  },
  {
    id: "03",
    q: "Key characteristics of UI components?",
    a: "Well-designed UI components should be modular, customizable, and accessible. They should have clear functionality and be easily styled to match the overall design language.",
  },
];

export default function FAQSection() {
  return (
    <section className="relative w-full p-4 bg-white z-[70]">
      <div className="relative min-h-screen w-full rounded-t-[3rem] bg-white border-t border-orange-100 overflow-hidden shadow-sm flex flex-col items-center py-24 px-6">
        
        {/* Header Section */}
        <div className="relative z-10 text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-orange-50 border border-orange-100">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider text-orange-700 uppercase">
              Common Questions
            </span>
          </div>

          <h2 className="text-6xl md:text-8xl font-extrabold text-black tracking-tighter leading-[0.85]">
            Got <span className="text-orange-500">questions?</span> <br />
            We have answers.
          </h2>
        </div>

        {/* Accordion Container */}
        <div className="w-full max-w-4xl relative z-10">
          <Accordion type="single" collapsible defaultValue="01" className="w-full space-y-2">
            {faqItems.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id} 
                className="border-none transition-all duration-300"
              >
                <AccordionTrigger 
                  className={cn(
                    "text-left py-4 md:py-8 overflow-hidden transition-all duration-500 hover:no-underline cursor-pointer",
                    "text-black/20 data-[state=open]:text-orange-500 [&>svg]:hidden group"
                  )}
                >
                  <div className="flex flex-1 items-start gap-4 md:gap-8">
                    {/* Numbering */}
                    <span className="text-xs md:text-sm font-bold pt-2 md:pt-4 text-orange-400 opacity-50 group-data-[state=open]:opacity-100">
                      {item.id}
                    </span>
                    
                    {/* Title with the overlapping text effect from Accordion05 */}
                    <h3 className="uppercase text-3xl md:text-6xl font-black tracking-tighter leading-none transition-all duration-500 group-data-[state=closed]:-space-y-4 md:group-data-[state=closed]:-space-y-8 group-data-[state=open]:space-y-0">
                      {item.q}
                    </h3>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-8 pl-10 md:pl-20 text-gray-600 text-lg md:text-xl leading-relaxed font-medium max-w-2xl">
                  {item.a}
                </AccordionContent>
                
                {/* Decorative separator matching your orange theme */}
                <div className="h-[1px] w-full bg-gradient-to-r from-orange-100 via-orange-50 to-transparent" />
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}