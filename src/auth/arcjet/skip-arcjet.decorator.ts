import { SetMetadata } from '@nestjs/common';
export const SKIP_ARCJET = 'skipArcjet';
export const SkipArcjet = () => SetMetadata(SKIP_ARCJET, true);