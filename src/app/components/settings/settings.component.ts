import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SettingsService} from '../../services/settings.service';
import {Settings} from '../../models/Settings';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

}
