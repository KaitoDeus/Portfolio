import { IPortfolioData, ImageSource } from '@/core/models/PortfolioModels';
import jsonData from './portfolioData.json';

import avatar from '@/assets/img/avt/avatar.webp';
import geminiEducator from '@/assets/img/cert/gemini-educator.webp';
import intermediateDiploma from '@/assets/img/cert/intermediate-diploma.webp';
import aiFluencyFramework from '@/assets/img/cert/Al-Fluency-Framework-Foundations.webp';
import logoUTH from '@/assets/logo/logo-UTH.webp';
import logoCDN from '@/assets/logo/Logo-CĐN.webp';

import {
  projectCaro,
  projectPhotoPalette,
  projectNeoShop,
  projectMedicare,
  projectUthwm,
  projectTeliViettel,
  projectFirst2DGame,
} from '@/assets/img/proj';

const staticAssetMap: Record<string, ImageSource> = {
  // Legacy /src/assets/
  '/src/assets/img/avt/avatar.webp': avatar,
  '/src/assets/img/cert/gemini-educator.webp': geminiEducator,
  '/src/assets/img/cert/intermediate-diploma.webp': intermediateDiploma,
  '/src/assets/img/cert/Al-Fluency-Framework-Foundations.webp': aiFluencyFramework,
  '/src/assets/logo/logo-UTH.webp': logoUTH,
  '/src/assets/logo/Logo-CĐN.webp': logoCDN,
  '/src/assets/img/proj/project_caro.webp': projectCaro,
  '/src/assets/img/proj/project_photopalette.webp': projectPhotoPalette,
  '/src/assets/img/proj/project_neoshop.webp': projectNeoShop,
  '/src/assets/img/proj/project_medicare.webp': projectMedicare,
  '/src/assets/img/proj/project_uthwm.webp': projectUthwm,
  '/src/assets/img/proj/project_teli-viettel.webp': projectTeliViettel,
  '/src/assets/img/proj/project_first2dgame.webp': projectFirst2DGame,

  // Public /assets/
  '/assets/img/avt/avatar.webp': avatar,
  '/assets/img/cert/gemini-educator.webp': geminiEducator,
  '/assets/img/cert/intermediate-diploma.webp': intermediateDiploma,
  '/assets/img/cert/Al-Fluency-Framework-Foundations.webp': aiFluencyFramework,
  '/assets/logo/logo-UTH.webp': logoUTH,
  '/assets/logo/Logo-CĐN.webp': logoCDN,
  '/assets/img/proj/project_caro.webp': projectCaro,
  '/assets/img/proj/project_photopalette.webp': projectPhotoPalette,
  '/assets/img/proj/project_neoshop.webp': projectNeoShop,
  '/assets/img/proj/project_medicare.webp': projectMedicare,
  '/assets/img/proj/project_uthwm.webp': projectUthwm,
  '/assets/img/proj/project_teli-viettel.webp': projectTeliViettel,
  '/assets/img/proj/project_first2dgame.webp': projectFirst2DGame,
};

const resolveAsset = (pathOrUrl: ImageSource | string): ImageSource => {
  if (typeof pathOrUrl === 'string' && staticAssetMap[pathOrUrl]) {
    return staticAssetMap[pathOrUrl];
  }
  return pathOrUrl;
};

export const portfolioData: IPortfolioData = {
  ...(jsonData as unknown as IPortfolioData),
  avatars: {
    hero: resolveAsset(jsonData.avatars.hero),
    about: resolveAsset(jsonData.avatars.about),
    skills: resolveAsset(jsonData.avatars.skills),
    contact: resolveAsset(jsonData.avatars.contact),
  },
  education: jsonData.education.map((item) => ({
    ...item,
    logo: item.logo ? resolveAsset(item.logo) : undefined,
  })),
  career: jsonData.career.map((item) => ({
    ...item,
    logo: item.logo ? resolveAsset(item.logo) : undefined,
  })),
  certificates: jsonData.certificates.map((cert) => ({
    ...cert,
    image: resolveAsset(cert.image),
  })),
  projects: jsonData.projects.map((proj) => ({
    ...proj,
    status: proj.status as 'completed' | 'in-progress',
    image: resolveAsset(proj.image),
  })),
};
