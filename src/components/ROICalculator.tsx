import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const ROICalculator = () => {
  const [guards, setGuards] = useState(1);
  const [hours, setHours] = useState(24);

  // Assumptions (based on Arno's conversation)
  const guardHourlyRate = 15; // €/h
  const robotMonthlyCost = 2500; // €/month (leasing + maintenance)
  
  const monthlyGuardCost = guards * hours * 30 * guardHourlyRate;
  const monthlyRobotCost = robotMonthlyCost;
  const monthlySavings = monthlyGuardCost - monthlyRobotCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = (monthlySavings / monthlyGuardCost) * 100;

  return (
    <section id="roi" className="section bg-[#050505] py-24">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B4FF33] mb-4">
              Business Intelligence
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-8">
              ROI Calculator
            </h2>
            <p className="text-slate-400 mb-12 leading-relaxed">
              Compare the costs of Rollo's autonomous patrol robot with traditional human guarding. 
              Our clients save an average of 40-60% on security costs in the first year.
            </p>

            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium uppercase tracking-wider">
                    Number of guards replaced: <span className="text-[#B4FF33] ml-2">{guards}</span>
                  </label>
                </div>
                <Slider 
                  value={[guards]} 
                  onValueChange={(val) => setGuards(val[0])} 
                  max={5} 
                  min={1} 
                  step={1}
                  className="py-4"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium uppercase tracking-wider">
                    Patrol period (hours per day): <span className="text-[#B4FF33] ml-2">{hours}h</span>
                  </label>
                </div>
                <Slider 
                  value={[hours]} 
                  onValueChange={(val) => setHours(val[0])} 
                  max={24} 
                  min={8} 
                  step={4}
                  className="py-4"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono uppercase text-slate-500 flex items-center gap-2">
                  <Wallet size={14} /> Guard Cost / Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€{monthlyGuardCost.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono uppercase text-slate-500 flex items-center gap-2">
                  <TrendingDown size={14} className="text-[#B4FF33]" /> Annual Savings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-[#B4FF33]">€{annualSavings.toLocaleString()}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl md:col-span-2 border-l-4 border-l-[#B4FF33]">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-mono uppercase text-slate-500 flex items-center gap-2">
                  <TrendingUp size={14} className="text-[#B4FF33]" /> Efficiency Increase
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-end justify-between">
                <p className="text-5xl font-bold text-[#B4FF33]">{savingsPercentage.toFixed(0)}%</p>
                <p className="text-xs text-slate-500 max-w-[200px] text-right">
                  Reduce costs and increase security with 24/7 autonomous patrolling.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
