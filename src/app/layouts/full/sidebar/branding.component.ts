import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <div href="/">
        <img  src="../../../../assets/images/logos/logo_loader.svg" alt="" />
      </div>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
