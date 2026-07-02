/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DishItem, DictionaryTerm, EmployeeShift, PayDetail } from './types';

export const initialDishes: DishItem[] = [
  { id: '1', name: 'Premium Kobe Beef Pho', category: 'Main Dish', currentPrice: 280000, originalPrice: 280000 },
  { id: '2', name: 'Huong Que Bun Cha', category: 'Main Dish', currentPrice: 120000, originalPrice: 120000 },
  { id: '3', name: 'Fresh Shrimp & Pork Summer Rolls (3 pcs)', category: 'Appetizer', currentPrice: 65000, originalPrice: 65000 },
  { id: '4', name: 'Special Grilled Pork Banh Mi', category: 'Snack', currentPrice: 75000, originalPrice: 75000 },
  { id: '5', name: 'Specialty Salted Cream Coffee', category: 'Beverage', currentPrice: 55000, originalPrice: 55000 },
  { id: '6', name: 'Lemongrass Lime Tea with Basil Seeds', category: 'Beverage', currentPrice: 45000, originalPrice: 45000 },
  { id: '7', name: 'Lotus Seed & Longan Sweet Soup', category: 'Dessert', currentPrice: 60000, originalPrice: 60000 },
  { id: '8', name: 'Nha Trang Grilled Pork Skewers', category: 'Appetizer', currentPrice: 110000, originalPrice: 110000 },
];

export const initialDictionary: DictionaryTerm[] = [
  { keyword: 'Pho Bo', domain: 'Vietnamese Cuisine', translation: 'Traditional Beef Noodle Soup', culturalNote: 'A aromatic traditional beef soup slow-simmered for 12 hours with star anise, cinnamon, ginger, and charred onions.' },
  { keyword: 'Ca Phe Muoi', domain: 'Specialty Drinks', translation: 'Specialty Salted Cream Coffee', culturalNote: 'Traditional Vietnamese robusta phin dripping coffee layered with a dense, savory salted cream, originating from Hue.' },
  { keyword: 'Nuoc Mam', domain: 'Condiments', translation: 'Premium Fish Sauce', culturalNote: 'The core soul of Vietnamese cooking. Clean first-press Phu Quoc fish sauce offers an umami-rich body and sweet finish.' },
  { keyword: 'Goi Cuon', domain: 'Appetizers', translation: 'Fresh Summer Rolls with Shrimp & Pork', culturalNote: 'Translucent rice paper rolls packed with fresh herbs, shrimp, and boiled pork belly, served with creamy peanut dipping dipping sauce.' },
  { keyword: 'Bun Cha', domain: 'Northern Cuisine', translation: 'Grilled Pork Rice Noodles', culturalNote: 'A Hanoi specialty comprising charcoal-grilled fatty pork strips and patties in a warm dipping broth with green papaya.' },
];

export const initialEmployees: EmployeeShift[] = [
  {
    id: 'emp-1',
    name: 'Tuan Phan',
    role: 'Head Chef',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80',
    shifts: {
      'Mon': '08:00 - 16:00',
      'Tue': '08:00 - 16:00',
      'Wed': '08:00 - 16:00',
      'Thu': 'Empty Shift',
      'Fri': '08:00 - 16:00',
      'Sat': '16:00 - 23:00',
      'Sun': 'Empty Shift',
    },
    availableHours: 'Mon - Fri Mornings, Sat Evening',
  },
  {
    id: 'emp-2',
    name: 'Thao Tran',
    role: 'Cashier',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    shifts: {
      'Mon': '16:00 - 23:00',
      'Tue': 'Empty Shift',
      'Wed': '16:00 - 23:00',
      'Thu': '16:00 - 23:00',
      'Fri': '16:00 - 23:00',
      'Sat': 'Empty Shift',
      'Sun': '16:00 - 23:00',
    },
    availableHours: 'Evenings daily except Tue, Sat',
  },
  {
    id: 'emp-3',
    name: 'Alex Nguyen',
    role: 'Server',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    shifts: {
      'Mon': '11:00 - 19:00',
      'Tue': '11:00 - 19:00',
      'Wed': 'Empty Shift',
      'Thu': '11:00 - 19:00',
      'Fri': 'Empty Shift',
      'Sat': '11:00 - 19:00',
      'Sun': 'Empty Shift',
    },
    availableHours: 'Flexible split shifts Mon - Sat',
  },
  {
    id: 'emp-4',
    name: 'My Le',
    role: 'Lead Bartender',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
    shifts: {
      'Mon': 'Empty Shift',
      'Tue': '16:00 - 23:00',
      'Wed': '16:00 - 23:00',
      'Thu': 'Empty Shift',
      'Fri': '16:00 - 23:00',
      'Sat': '16:00 - 23:00',
      'Sun': '16:00 - 23:00',
    },
    availableHours: 'Evenings preferred, off Mon & Thu',
  },
];

export const initialPayroll: PayDetail[] = [
  { id: 'pay-1', name: 'Tuan Phan', role: 'Head Chef', regularHours: 40, otHours: 6, multiplier: 1.5, tips: 120, adjustment: 0, locked: false },
  { id: 'pay-2', name: 'Thao Tran', role: 'Cashier', regularHours: 35, otHours: 2, multiplier: 1.5, tips: 80, adjustment: -15, locked: false },
  { id: 'pay-3', name: 'Alex Nguyen', role: 'Server', regularHours: 32, otHours: 0, multiplier: 1.5, tips: 154, adjustment: 10, locked: false },
  { id: 'pay-4', name: 'My Le', role: 'Bartender', regularHours: 38, otHours: 4, multiplier: 1.5, tips: 110, adjustment: 0, locked: false },
];
