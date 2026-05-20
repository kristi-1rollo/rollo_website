import * as React from 'npm:react@18.3.1'
import { template as contactNotification } from './contact-notification.tsx'
import { template as contactConfirmation } from './contact-confirmation.tsx'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, any>
  /** Fixed recipient — overrides caller-provided recipientEmail. */
  to?: string
}

export const TEMPLATES: Record<string, TemplateEntry> = {
  contact_notification: contactNotification,
  contact_confirmation: contactConfirmation,
}
