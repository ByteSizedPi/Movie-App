import { SearchService } from "../../services/search.service";
import { Component, OnInit } from "@angular/core";
import { query } from "../../services/Utils";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  private curValue: string | undefined;
  constructor(public searchService: SearchService) {}

  ngOnInit(): void {}

  input = ({ target: { value } }: any) => {
    if (value != this.curValue) this.searchService.search(value);
    this.curValue = value;
  };

  close() {
    this.curValue = undefined;
    (<HTMLInputElement>query("input")).value = "";
    this.searchService.closeModal();
  }
}
