import {Component} from "@angular/core";
import {MenuService} from "../../service/menu/menu.service";

/**
 * Created by Guilherme on 03/04/2017.
 */

@Component({
  moduleId: module.id,
  selector: 'notFound',
  styleUrls: ["./not.found.component.css"],
  templateUrl: `./not.found.component.html`,
})
export class NotFoundComponent {

  constructor(private menuService: MenuService) {
    this.menuService.resetMenuOptionSelected();
  }
}
