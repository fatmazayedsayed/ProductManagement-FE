import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
 import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [MessageService],
})
export class SearchComponent implements OnInit {
 
  constructor(
     private messageService: MessageService
  ) {}
  ngOnInit() {
  
  }

  
}
