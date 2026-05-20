import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
}

const main = { backgroundColor: '#050505', fontFamily: 'Inter, Arial, sans-serif', color: '#ffffff' }
const container = { margin: '0 auto', padding: '40px 24px', maxWidth: '600px' }
const heading = { color: '#BEFF4B', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }
const text = { color: '#e5e7eb', fontSize: '15px', lineHeight: '24px' }
const footer = { color: '#6b7280', fontSize: '12px', marginTop: '32px' }

export const ContactConfirmation = ({ name = 'there' }: Props) => (
  <Html>
    <Head />
    <Preview>Thanks for contacting 1ROLLO</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thanks for reaching out, {name}.</Heading>
        <Text style={text}>
          We've received your message and our team will be in touch shortly.
        </Text>
        <Text style={text}>
          — The 1ROLLO team
        </Text>
        <Text style={footer}>
          1ROLLO · https://1rollo.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmation,
  subject: 'Thanks for contacting 1ROLLO',
  displayName: 'Contact confirmation (to client)',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry
