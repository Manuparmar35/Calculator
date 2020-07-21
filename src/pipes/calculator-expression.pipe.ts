import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Pipe({
  name: 'calculatorExpression'
})
export class CalculatorExpressionPipe implements PipeTransform {

  transform(expression: string): string {
    var calcExp = "";
    for(var i = 0; i < expression.length; i++) {
      if(expression[i]=='/')
        calcExp += '\u00f7';
      else if(expression[i]=='*')
        calcExp += '\u00d7';
      else calcExp += expression[i];
    }
    return calcExp;
  }

}
