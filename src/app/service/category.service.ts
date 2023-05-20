import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) {
    
  }
  saveCategory(data: any){
    this.afs.collection('categories').add(data).then(ref => {
      this.toastr.success("New Category Saved Successfuly")
    });
  }

  loadCategories(){
   return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }

  updateCategory(id: string, updatedData: any){
    this.afs.doc('categories/'+ id).update({category: updatedData}).then(() => {
      this.toastr.success("Category Updated Successfuly")
    })
  }

  deleteCategory(id: string){
    this.afs.doc('categories/'+ id).delete().then(() =>{
      this.toastr.error("Category Deleted Successfuly")
    })
  }
}
