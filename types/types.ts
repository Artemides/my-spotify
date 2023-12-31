import { IconType } from "react-icons";
import Stripe from "stripe";

export type SidebarRoute = {
  label: string;
  icon: IconType;
  href: string;
  active: boolean;
};

export type UserDetails = {
  id: string;
  firstname: string;
  lastname: string;
  fullname?: string;
  avatar_url?: string;
  billings_address?: Stripe.Address;
  paymentMethod?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
};

export type Product = {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
};

export type Price = {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
};

export type Subscription = {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
};

export type Song = {
  id: string;
  user_id: string;
  title: string;
  author: string;
  song_path: string;
  image_path: string;
};
