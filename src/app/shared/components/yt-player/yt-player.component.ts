import { Component, Input, OnInit, ViewChild, NgModule } from "@angular/core";
import { YouTubePlayerModule } from "@angular/youtube-player";

@NgModule({
  imports: [YouTubePlayerModule],
})
export class YTPlayerModule {}

@Component({
  templateUrl: "./yt-player.component.html",
  selector: "app-yt-player",
})
export class YtPlayerComponent implements OnInit {
  @ViewChild("player") player: any;
  videoId: string;

  @Input()
  set url(id: string) {
    this.videoId = `${id}?controls=0&modestbranding=1&autoplay=1&muted=1`;
  }

  ngOnInit() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
}
