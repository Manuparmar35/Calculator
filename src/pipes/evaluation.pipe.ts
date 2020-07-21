import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'evaluation'
})
export class EvaluationPipe implements PipeTransform {

  transform(expression: string): string {
    if(expression == '')
      return '0';
    var result;
    try{
      result = eval(expression);
    } catch {
      result = eval(expression.slice(0,expression.length-1));
    }
    return '= ' + result;
  }

}
