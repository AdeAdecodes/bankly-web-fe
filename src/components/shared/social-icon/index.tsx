import { SvgIconProps } from '@mui/material';
import {
  Facebook,
  Instagram,
  Linkedin,
  MusicNote,
  Twitter,
  Web,
  Whatsapp,
  Youtube,
} from 'mdi-material-ui';
import React from 'react';

export type SocialPlatform =
  | 'x'
  | 'facebook'
  | 'instagram'
  | 'linkedin'
  | 'youtube'
  | 'tiktok'
  | 'whatsapp';

const ICONS: Record<SocialPlatform, React.ComponentType<SvgIconProps>> = {
  x: Twitter,
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: MusicNote,
  whatsapp: Whatsapp,
};

export const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  x: 'X (formerly Twitter)',
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  whatsapp: 'WhatsApp',
};

type SocialIconProps = SvgIconProps & { platform: string };

function SocialIcon({ platform, ...props }: SocialIconProps) {
  const Icon = ICONS[platform as SocialPlatform] ?? Web;
  return <Icon {...props} />;
}

export default SocialIcon;
