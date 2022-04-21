import { Pipe, PipeTransform } from "@angular/core";
import { Todo } from "./todo.service";

@Pipe({
    name: 'todofilter'
})
export class TodoFilterPipe implements PipeTransform {
    transform(todos: Todo[] | null, filterText: string): any {
        if (todos) {
            return todos.filter(todo => todo.task.includes(filterText));
        }
        else {
            return todos;
        }        
    }
}