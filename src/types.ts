/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabId = 
  | 'dashboard'
  // HR & Operations Tools
  | 'shift-planner'
  | 'staff-roles'
  | 'checkin'
  | 'leave-calculator'
  // Application and Plug In Tools
  | 'book-table'
  | 'chatbot'
  // Smart Menu Solutions Tools
  | 'menu-translator'
  | 'ai-food-images'
  | 'price-update'
  | 'qr-menu'
  | 'allergen-tool'
  // Marketing & Brand Growth Tools
  | 'social-post'
  | 'seo-opt'
  | 'reviews'
  | 'marketing-setting'
  // Setting submenus
  | 'settings'
  | 'social-account'
  | 'role-permission'
  // Coming Soon Tools
  | 'catering-inquiries'
  | 'payroll'
  // SaaS Super Admin tabs
  | 'saas-overview'
  | 'saas-brands'
  | 'saas-plans'
  | 'saas-billing'
  | 'saas-roles';

export interface DishItem {
  id: string;
  name: string;
  category: string;
  currentPrice: number;
  originalPrice: number;
}

export interface DictionaryTerm {
  keyword: string;
  domain: string;
  translation: string;
  culturalNote: string;
}

export interface EmployeeShift {
  id: string;
  name: string;
  role: string;
  avatar: string;
  shifts: { [day: string]: string | null }; // e.g. 'Monday': '08:00 - 16:00'
  availableHours: string;
}

export interface PayDetail {
  id: string;
  name: string;
  role: string;
  regularHours: number;
  otHours: number;
  multiplier: number;
  tips: number;
  adjustment: number;
  locked: boolean;
}
