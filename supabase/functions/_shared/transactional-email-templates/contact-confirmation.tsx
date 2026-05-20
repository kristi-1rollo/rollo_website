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

const main = { backgroundColor: '#050505', fontFamily: 'Inter, Arial, sans-serif', color: '#ffffff' }
const container = { margin: '0 auto', padding: '40px 24px', maxWidth: '600px' }
const heading = { color: '#BEFF4B', fontSize: '24px', fontWeight: 700, margin: '0 0 20px' }
const text = { color: '#e5e7eb', fontSize: '15px', lineHeight: '24px' }
const footer = { color: '#6b7280', fontSize: '12px', marginTop: '32px' }

export const ContactConfirmation = () => (
  <Html>
    <Head />
    <Preview>Thank you for contacting Rollo Robotics</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Thank you for contacting Rollo Robotics.</Heading>
        <Text style={text}>
          Your message has been received. We’ll be in touch shortly.
        </Text>
        <Text style={text}>
          — The Rollo Robotics team
        </Text>
        <Text style={footer}>
          Rollo Robotics · https://1rollo.com
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmation,
  subject: 'Thank you for contacting Rollo Robotics',
  displayName: 'Contact confirmation (to client)',
  previewData: {},
} satisfies TemplateEntry
