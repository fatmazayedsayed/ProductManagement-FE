import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GuidDefault {
  getDefaultGUID(): string {
    return '00000000-0000-0000-0000-000000000000';
  }
}
