import { Component } from '@angular/core';

import { ListComponent } from '../../ui/list/list.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {}
