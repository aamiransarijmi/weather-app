import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  imports: [CommonModule, NgxUiLoaderModule],
  declarations: [HeaderComponent, FooterComponent],
  exports: [HeaderComponent, FooterComponent, NgxUiLoaderModule],
})
export class SharedModule {}
