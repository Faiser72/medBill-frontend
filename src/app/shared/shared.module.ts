import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent, AboutUser } from "./components/header/header.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialImportModuleModule } from "./material-import-module/material-import-module.module";

@NgModule({
  declarations: [FooterComponent, HeaderComponent, SidebarComponent, AboutUser],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialImportModuleModule
  ],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
  entryComponents: [AboutUser]
})
export class SharedModule { }
