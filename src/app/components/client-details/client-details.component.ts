import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/Client';
import {ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {
  }

  ngOnInit() {
    // Get id from url
    this.id = this.activatedRoute.snapshot.params.id;
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client !== null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }

  /**
   * Update client balance.
   */
  updateBalance() {
    this.clientService.updateClient(this.client);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success',
      timeOut: 4000
    });
  }
}
