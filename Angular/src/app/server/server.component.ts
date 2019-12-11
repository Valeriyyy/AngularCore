import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Server } from '../shared/server';
import { ServerMessage } from '../shared/server-message';
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  constructor() { }
  color: string;
  buttonText: string;
  serverStatus: string;
  isLoading: boolean;

  @Input() serverInput: Server;
  @Output() serverAction: EventEmitter<ServerMessage> = new EventEmitter<ServerMessage>();

  ngOnInit() {
    this.setServerStatus(this.serverInput.isOnline);
  }

  setServerStatus(isOnline: boolean) {
    if(isOnline){
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66bb6a';
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.color = '#ff6b6b';
      this.buttonText = 'Start';
      this.serverStatus = 'Offline';
    }
  }

  /*toggleStatus(onlineStatus: boolean) {
    console.log(this.serverInput.name, ': ', onlineStatus);
    this.setServerStatus(!onlineStatus);
  }*/
  makeLoading() {
    this.color = '#FFCA28';
    this.buttonText = 'Pending..';
    this.isLoading = true;
    this.serverStatus = 'Loading...';
  }
  sendServerAction(isOnline: boolean) {
    console.log('sendServer action called');
    this.makeLoading();
    const payload = this.buildPayload(isOnline);
    this.serverAction.emit(payload);
  }

  buildPayload(isOnline: boolean): ServerMessage {
    if(isOnline) {
      return {
        id: this.serverInput.id,
        payload: 'deactivate'
      };
    } else {
      return {
        id: this.serverInput.id,
        payload: 'activate'
      };
    }
  }
}
