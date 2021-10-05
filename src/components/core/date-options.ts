import {frenchDateIntl, MsDateIntl} from './date-intl';
import {InjectionToken} from '@angular/core';

export interface MsDateDefaultOptions {
  intl: MsDateIntl;
}

export const MS_DATE_DEFAULT_OPTIONS =
  new InjectionToken<MsDateDefaultOptions>('ms-date-default-options', {
    providedIn: 'root',
    factory: MS_DATE_DEFAULT_OPTIONS_FACTORY
  });

export function MS_DATE_DEFAULT_OPTIONS_FACTORY(): MsDateDefaultOptions {
  return {
    intl: frenchDateIntl
  };
}
