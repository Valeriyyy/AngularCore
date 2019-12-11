import { Component, OnInit,  OnDestroy} from '@angular/core';
import { Server } from '../../shared/server';
import { ServerService } from '../../services/server.service';
import { Observable } from 'rxjs-compat';
import { AnonymousSubscription } from 'rxjs-compat/Subscription';
import { timer } from 'rxjs';
import { ServerMessage } from '../../shared/server-message';

/*const SAMPLE_SERVERS = [
  {id: 1, name: 'dev-web', isOnline: true},
  {id: 2, name: 'scat-web', isOnline: false},
  {id: 3, name: 'maga-web', isOnline: true},
  {id: 4, name: 'online-web', isOnline: true},
];*/
@Component({
  selector: 'app-section-health',
  templateUrl: './section-health.component.html',
  styleUrls: ['./section-health.component.css']
})
export class SectionHealthComponent implements OnInit {

  constructor(private _serverService: ServerService) { }

  servers: Server[]; //= SAMPLE_SERVERS;
  timerSubscription: AnonymousSubscription;

  ngOnInit() {
    this.refreshData();
  }

  ngOnDestroy() {
    if(this.timerSubscription){
      this.timerSubscription.unsubscribe();
    }
  }
  refreshData() {
    this._serverService.getServers().subscribe(res => {
      this.servers = res;
    });
    this.subscribeToData();
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => this.refreshData());
  }

  sendMessage(msg: ServerMessage) {
    this._serverService.handleServerMessage(msg)
    .subscribe(res => console.log('Message sento to server: ', msg),
    err => console.log(err));
  }
}
