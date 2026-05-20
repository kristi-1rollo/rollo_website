import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  region?: string
  topics?: string[]
  message?: string
}

const main = { backgroundColor: '#050505', fontFamily: 'Inter, Arial, sans-serif', color: '#ffffff' }
const container = { margin: '0 auto', padding: '32px 24px', maxWidth: '600px' }
const heading = { color: '#BEFF4B', fontSize: '22px', fontWeight: 700, margin: '0 0 16px' }
const label = { color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase' as const, letterSpacing: '1px', margin: '16px 0 4px' }
const value = { color: '#ffffff', fontSize: '15px', margin: '0', whiteSpace: 'pre-wrap' as const }
const hr = { borderColor: '#1f2937', margin: '24px 0' }

export const ContactNotification = ({
  name = '—',
  email = '—',
  region = '—',
  topics = [],
  message = '',
}: Props) => (
  <Html>
    <Head />
    <Preview>New contact from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New contact form submission</Heading>
        <Text style={label}>Name</Text>
        <Text style={value}>{name}</Text>
        <Text style={label}>Email</Text>
        <Text style={value}>{email}</Text>
        <Text style={label}>Region / Country</Text>
        <Text style={value}>{region}</Text>
        <Text style={label}>Topics of interest</Text>
        <Text style={value}>{topics.length ? topics.join(', ') : '—'}</Text>
        {message && (
          <>
            <Text style={label}>Message</Text>
            <Text style={value}>{message}</Text>
          </>
        )}
        <Hr style={hr} />
        <Text style={{ color: '#6b7280', fontSize: '12px' }}>
          Reply directly to this email to respond to {name}.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactNotification,
  subject: (d: Props) => `New contact: ${d?.name ?? 'Unknown'}`,
  displayName: 'Contact form notification',
  to: 'info@1rollo.com',
  previewData: {
    name: 'Jane Doe',
    email: 'jane@example.com',
    region: 'Europe',
    topics: ['Airport security', 'Data centers'],
    message: 'Interested in a pilot deployment.',
  },
} satisfies TemplateEntry
