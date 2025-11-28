

export interface Plan {
  id: string;
  name: string;
  speed: string;
  price: string;
  features: string[];
  recommendedFor: string[];
  icon: string; // Material symbol name
  highlight?: boolean;
}

export interface QuizState {
  step: number;
  usage: string[];
  devices: number;
  dwellingType: 'house' | 'apartment';
  floors: number;
  streaming: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  tagline: string;
  category: 'connectivity' | 'entertainment' | 'smart' | 'security' | 'mobile' | 'premium';
  icon: string;
  imageGradient: string;
  image?: string; // New image property for background mocks
  size: 'small' | 'medium' | 'large' | 'wide'; // For Bento Grid layout
  link?: string;
  internalSection?: AppSection;
}

export enum AppSection {
  HOME = 'home',
  QUIZ = 'quiz',
  WIFI_SCANNER = 'wifi_scanner',
  MODEM_GUIDE = 'modem_guide',
  DECO_ANDROID = 'deco_android',
  CATALOG = 'catalog',
  BILL_ANALYZER = 'bill_analyzer'
}