import { useState } from "react";
import { z } from "zod";
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

const BACKUP_KEY = "rollo_contact_form_backup_v1";

// Client-side validation schema — mirrors server schema for early feedback.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required (min 2 characters)").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email is too long"),
  company: z.string().trim().max(150, "Company name is too long").optional(),
  country: z.string().trim().max(80, "Country name is too long").optional(),
  numberOfRobots: z
    .string()
    .trim()
    .regex(/^\d*$/, "Only digits are allowed")
    .max(6, "Number is too large")
    .optional(),
  estimatedDemand: z.string().trim().max(200, "Estimated demand is too long").optional(),
  additionalInfo: z.string().trim().max(2000, "Additional information is too long").optional(),
});

export type ContactFieldErrors = Partial<Record<keyof ContactFormData, string>>;

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
    defaultTopicFallback = false,
  } = options;

  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ContactFormData];
        return next;
      });
    }
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
    const newErrors: ContactFieldErrors = {};

    // Schema validation (formats + length limits)
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactFormData;
        if (key && !newErrors[key]) newErrors[key] = err.message;
      });
    }

    // Additional required fields (not part of base schema)
    for (const field of requiredFields) {
      const value = formData[field];
      const empty = Array.isArray(value) ? value.length === 0 : !String(value ?? "").trim();
      if (empty && !newErrors[field]) {
        newErrors[field] = "This field is required";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast({ title: "Please correct the highlighted fields", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setIsSuccess(false);

    // Backup snapshot — survives crashes/network failures so the user can retry.
    try {
      localStorage.setItem(
        BACKUP_KEY,
        JSON.stringify({ data: formData, savedAt: new Date().toISOString() }),
      );
    } catch {
      // Storage may be unavailable (private mode, quota); ignore.
    }

    try {
      const topics =
        formData.deploymentAreas.length > 0
          ? formData.deploymentAreas
          : defaultTopicFallback
            ? ["Other"]
            : formData.deploymentAreas;

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        region: formData.country.trim(),
        topics,
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
        toast({
          title: msg ?? "Something went wrong. Your message is saved locally — please try again.",
          variant: "destructive",
        });
        return;
      }

      // Success — clear backup and reset form.
      try {
        localStorage.removeItem(BACKUP_KEY);
      } catch {
        /* ignore */
      }
      setIsSuccess(true);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
    } catch {
      toast({
        title: "Network error. Your message is saved locally — please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleInputChange,
    handleDeploymentAreaToggle,
    handleSubmit,
  };
}
