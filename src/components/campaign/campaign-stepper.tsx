export function CampaignStepper({ currentStep }: { currentStep: number }) {
  const steps = ["Targeting", "Outreach Settings", "Review & Create Campaign"];
  return (
    <div className="mb-8 flex items-center gap-2">
      {steps.map((label, index) => {
        const step = index + 1;
        const active = step <= currentStep;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${active ? "bg-primary text-white" : "bg-slate-200 text-slate-600"}`}>
              {step}
            </div>
            <span className={`text-sm ${active ? "text-slate-900" : "text-slate-500"}`}>{label}</span>
            {step < steps.length && <div className="mx-1 h-px w-8 bg-slate-300" />}
          </div>
        );
      })}
    </div>
  );
}
