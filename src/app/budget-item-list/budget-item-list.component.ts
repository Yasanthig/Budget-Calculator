import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/budget-item.model';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})



export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems:BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>(); 
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();

  constructor(public dialog:MatDialog) { }

  ngOnInit() {
  }

  onDeleteButtonClicked(item:BudgetItem){
    this.delete.emit(item);
  }

  onCardCliked(item:BudgetItem){
    //show the edit module
    const dialogRef = this.dialog.open(EditItemModalComponent,{
      width:'580px',
      data:item
    });
    dialogRef.afterClosed().subscribe(result =>{
      //check if result has value
      if(result){
        //result is the updated budget item
        //replace the item with the updated/submitted item from the form
        //this.budgetItems[this.budgetItems.indexOf(item)]= result;
        this.update.emit({
          old:item,
          new: result

        })
      }

    })
  }

}
export interface UpdateEvent{
  old:BudgetItem;
  new:BudgetItem;
}
