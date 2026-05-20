import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const DEPLOYMENT_AREA_OPTIONS = [
  "Public safety in urban environments",
  "Airport security",
  "Hospitals and medical facilities",
  "Hotels and hospitality sector",
  "Mining and construction equipment yards",
  "Industrial plants and manufacturing facilities",
  "Critical infrastructure protection",
  "Oil and gas facilities, refineries, and chemical plants",
  "Corporate and university campuses",
  "Gated communities, resorts, and golf clubs",
  "Smart homes, villas, and luxury estates",
  "Water supply stations and reservoirs",
  "Data centers",
  "Law enforcement and military support",
  "Other",
] as const;

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  country: string;
  numberOfRobots: string;
  estimatedDemand: string;
  deploymentAreas: string[];
  additionalInfo: string;
  /** Honeypot field — must remain empty for legitimate submissions */
  website: string;
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  company: "",
  country: "",
  numberOfRobots: "",
  estimatedDemand: "",
  deploymentAreas: [],
  additionalInfo: "",
  website: "",
};

interface UseContactFormOptions {
  /** Fields that are required beyond name + email */
  requiredFields?: (keyof ContactFormData)[];
  /** Toast message on success */
  successMessage?: string;
  /** Whether deploymentAreas defaults to ["Other"] when empty */
  defaultTopicFallback?: boolean;
}

export function useContactForm(options: UseContactFormOptions = {}) {
  const {
    requiredFields = [],
    successMessage = "Thank you! We'll be in touch soon.",
    defaultTopicFallback = false,
  } = options;

  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeploymentAreaToggle = (area: string) => {
    setFormData((prev) => ({
      ...prev,
      deploymentAreas: prev.deploymentAreas.includes(area)
        ? prev.deploymentAreas.filter((a) => a !== area)
        : [...prev.deploymentAreas, area],
    }));
  };

  const validate = (): boolean => {
    if (!formData.name || !formData.email) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return false;
    }
    for (const field of requiredFields) {
      const value = formData[field];
      if (Array.isArray(value) ? value.length === 0 : !value) {
        toast({ title: "Please fill in all required fields", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const topics =
        formData.deploymentAreas.length > 0
          ? formData.deploymentAreas
          : defaultTopicFallback
            ? ["Other"]
            : formData.deploymentAreas;

      const payload = {
        name: formData.name,
        email: formData.email,
        region: formData.country,
        topics,
        // Honeypot — bots tend to fill every field; humans never see this
        website: formData.website,
        message: [
          formData.company && `Company: ${formData.company}`,
          formData.numberOfRobots && `Number of Robots: ${formData.numberOfRobots}`,
          formData.estimatedDemand && `Estimated Demand: ${formData.estimatedDemand}`,
          formData.additionalInfo && `Additional Info: ${formData.additionalInfo}`,
        ]
          .filter(Boolean)
          .join("\n"),
      };

      const { data, error } = await supabase.functions.invoke("submit-registration", {
        body: payload,
      });

      const responseData = (data ?? {}) as {
        error?: string;
        details?: string[];
      };

      if (error || responseData?.error) {
        const msg = Array.isArray(responseData?.details)
          ? responseData.details.join(", ")
          : responseData?.error || error?.message;
        toast({ title: msg ?? "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      setIsSuccess(true);
      setFormData(INITIAL_FORM_DATA);
    } catch {
      toast({ title: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handleDeploymentAreaToggle,
    handleSubmit,
  };
}
