import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  color: Array<any> = ['#79E0EE', '#E8AA42', '#F8F6F4', '#B799FF', '#F5F0BB', '#F266AB', 
  '#2CD3E1', '#1B9C85', '#E76161', '#8B1874', '#AAC8A7', '#FF6969'];

  categories: Array<any> = [];

  categoryName!: string;

  dataStatus: string = 'Add'

  categoryId!: string;

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {

    this.categoryService.loadCategories().subscribe(val => {
      this.categories = val;
    })
  }

  onSubmit(f:NgForm){

    if(this.dataStatus == 'Add'){
      let randomNumber = Math.floor(Math.random() * this.color.length)

      let todoCategory = {
        category: f.value.CategoryName,
        colorCode: this.color[randomNumber],
        todoCount: 0
      }
      this.categoryService.saveCategory(todoCategory);
      f.resetForm();
    }
    else if(this.dataStatus == 'Edit'){
      this.categoryService.updateCategory(this.categoryId, f.value.CategoryName)
      f.resetForm();
      this.dataStatus = 'Add'
    }
  }

  onEdit(category: string, id: string){
    this.categoryName = category;
    this.dataStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id: string){
    this.categoryService.deleteCategory(id);
  }
}
