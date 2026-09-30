import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, InMemoryScrollingFeature, InMemoryScrollingOptions } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePlanCatalog, provideSeo } from '@c-code/c-code-fw/ui';
import { DEFAULT_SEO_IMAGE, SITE_URL } from './site.config';
const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

const inMemoryScrollingFeature: InMemoryScrollingFeature =
  withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, inMemoryScrollingFeature),
     provideClientHydration(withEventReplay()), provideHttpClient(withFetch()),
     providePlanCatalog(), provideSeo({ siteUrl: SITE_URL, defaultImage: DEFAULT_SEO_IMAGE })]
};
