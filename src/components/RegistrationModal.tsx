import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  region: z.string().min(1, "Please select a region"),
  topics: z.array(z.string()).min(1, "Please select at least one topic"),
  message: z.string().optional(),
});

const regions = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"];

const topicsOfInterest = [
  "Public safety in the city",
  "Airport security",
  "Hospitals and Medical Facilities Security",
  "Hotels security",
  "Mining and construction equipment parking lots",
  "Industrial plants and manufacturing factories",
  "Critical infrastructure protection",
  "Oil and gas facilities, refineries, chemical plants",
  "Corporate and university campuses",
  "Gated communities, resorts, golf clubs",
  "Smart home, villa, luxury estate",
  "Water supply area stations and reservoirs",
  "Data centers",
  "Enhancing the work of the police force and military",
  "Investing in a business",
  "Other",
];

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RegistrationModal = ({ open, onOpenChange }: RegistrationModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    region: "",
    topics: [] as string[],
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTopicToggle = (topic: string) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.includes(topic) ? prev.topics.filter((t) => t !== topic) : [...prev.topics, topic],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Prevent crash in environments where Supabase env is not configured (e.g., preview)
    if (!supabase) {
      toast.error("Form submission is temporarily unavailable in this preview.");
      return;
    }

    // Client-side validation
    const clientValidation = formSchema.safeParse(formData);
    if (!clientValidation.success) {
      const newErrors: Record<string, string> = {};
      clientValidation.error.errors.forEach((err) => {
        const field = err.path[0];
        if (field) newErrors[String(field)] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-registration", { body: formData });

      if (error) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      if (data?.error) {
        const msg = Array.isArray(data.details) ? data.details.join(", ") : data.error;
        toast.error(msg);
        return;
      }

      toast.success("Thank you for your interest! We'll be in touch soon.");
      onOpenChange(false);
      setFormData({
        name: "",
        email: "",
        region: "",
        topics: [],
        message: "",
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get Early Access</DialogTitle>
          <DialogDescription>Join our waitlist to be among the first to experience ROLLO</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
              className="bg-secondary border-border"
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="your@email.com"
              className="bg-secondary border-border"
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>

          {/* Region */}
          <div className="space-y-2">
            <Label>Region *</Label>
            <Select
              value={formData.region}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, region: value }))}
            >
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select your region" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.region && <p className="text-sm text-destructive">{errors.region}</p>}
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <Label>Topics of Interest *</Label>
            <div className="grid grid-cols-2 gap-3">
              {topicsOfInterest.map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <Checkbox
                    id={topic}
                    checked={formData.topics.includes(topic)}
                    onCheckedChange={() => handleTopicToggle(topic)}
                    className="border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor={topic} className="text-sm font-normal cursor-pointer">
                    {topic}
                  </Label>
                </div>
              ))}
            </div>
            {errors.topics && <p className="text-sm text-destructive">{errors.topics}</p>}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us more about your needs..."
              className="bg-secondary border-border min-h-[100px]"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
