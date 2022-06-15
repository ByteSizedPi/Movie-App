import { PipesModule } from "./shared/pipes/pipes.module";
import { MoviesModule } from "./modules/movies/movies.module";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { YouTubePlayerModule } from "@angular/youtube-player";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./views/home/home.component";
import { MovieModalComponent } from "./shared/components/movie-modal/movie-modal.component";
import { NavbarComponent } from "./shared/components/navbar/navbar.component";
import { UserComponent } from "./views/user/user.component";
import { YtPlayerComponent } from "./shared/components/yt-player/yt-player.component";
import { MoviePlayerComponent } from "./views/movie-player/movie-player.component";
import { SearchComponent } from "./shared/components/search/search.component";
import { LoginComponent } from "./views/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "./shared/directives/directives.module";
import { TestComponent } from "./test/test.component";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		MovieModalComponent,
		NavbarComponent,
		UserComponent,
		YtPlayerComponent,
		MoviePlayerComponent,
		SearchComponent,
		LoginComponent,
		TestComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		YouTubePlayerModule,
		FormsModule,
		ReactiveFormsModule,
		MoviesModule,
		DirectivesModule,
		PipesModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
