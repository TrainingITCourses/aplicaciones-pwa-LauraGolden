import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shell-container',
  templateUrl: './shell-container.component.html',
  styleUrls: ['./shell-container.component.css']
})
export class ShellContainerComponent implements OnInit {
  @Input() public titulo: string;
  @Input() public version: string;
  constructor() { }

  ngOnInit() {
    console.log('Shell_ngOnInit');
  }

}
