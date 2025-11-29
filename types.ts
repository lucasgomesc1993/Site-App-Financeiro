import { ReactNode } from 'react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: number;
  name: string;
  handle: string;
  text: string;
  image: string;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  image?: string;
  cols?: number; // To span multiple columns in grid
}

export interface FAQItem {
  question: string;
  answer: string;
}
