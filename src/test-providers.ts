import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { providePlanCatalog, provideSeo } from '@c-code/c-code-fw/ui';

/** Providers que necesitan los componentes del sitio en los tests. */
export const TEST_PROVIDERS = [
  provideHttpClient(),
  provideHttpClientTesting(),
  provideRouter([]),
  providePlanCatalog(),
  provideSeo({ siteUrl: 'https://test.local' }),
];
