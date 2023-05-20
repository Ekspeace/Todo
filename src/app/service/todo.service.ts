import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { increment } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveTodo(id: any, data: any){
    this.afs.collection('categories').doc(id).collection('todos').add(data).then(ref => {
      this.afs.doc('categories/'+ id).update({todoCount: increment(1)})
      this.toastr.success("New Todo Saved Successfuly")
    });
  }

  loadTodos(catId: string){
    return this.afs.collection('categories').doc(catId).collection('todos').snapshotChanges().pipe(
       map(actions =>{
         return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
           return {id, data}
         })
       })
     )
   }

   updateTodo(catId: string, todoId: string, updatedData: any){
    this.afs.doc('categories/'+ catId + '/todos/' + todoId).update({todo: updatedData}).then(() => {
      this.toastr.success("Todo Updated Successfuly")
    })
  }

  deleteTodo(catId: string, todoId: string){
    this.afs.doc('categories/'+ catId + '/todos/' + todoId).delete().then(() =>{
      this.afs.doc('categories/'+ catId).update({todoCount: increment(-1)})
      this.toastr.error("Todo Deleted Successfuly")
    })
  }

  markCompleted(catId: string, todoId: string){
    this.afs.doc('categories/'+ catId + '/todos/' + todoId).update({isCompleted: true}).then(() => {
      this.toastr.info("Todo Completed")
    })
  }
  markUnCompleted(catId: string, todoId: string){
    this.afs.doc('categories/'+ catId + '/todos/' + todoId).update({isCompleted: false}).then(() => {
      this.toastr.warning("Todo UnCompleted")
    })
  }
}
