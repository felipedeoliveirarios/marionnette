import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from './components/header/header.component';
import {ChatComponent} from './components/chat/chat.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MarkdownComponent, provideMarkdown} from "ngx-markdown";
import {KeyModalComponent} from './components/key-modal/key-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatComponent,
    SidebarComponent,
    KeyModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownComponent
  ],
  providers: [
    provideMarkdown()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
