import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server!: { id: number; name: string; status: string; };

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    const id = +this.route.snapshot.params['id'];
    // @ts-ignore
    this.server = this.serversService.getServer(id);
    this.route.params
      .subscribe(
        (params: Params) => {
          // @ts-ignore
          this.server = this.serversService.getServer(+params['id']);
        }
      );
  }

  onEdit() {
    // Relative Path
    // this.router.navigate(['/servers', this.server.id, 'edit']).then( r => {});

    // Absolute Path
    this.router.navigate(['edit'], {relativeTo: this.route}).then( r => {});;
  }

}
