import { Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  public result;
  public expression = ' ';
  public literals = [1,2,3,4,5,6,7,8,9,0,'.','1','2','3','4','5','6','7','8','9','0'];
  public operators = ['+', '-', '*', '/', '%'];
  public lastOperatorIndex = -1;
  public solvePressed = false;
  public totalHistory = localStorage.length;
  public row = ['','','',''];
  public localStorageReplica;

  public isOperator(char) {
    if(this.operators.indexOf(char)!=-1)
      return true;
    return false;
  }


  public isLiteral(char) {
    if(this.literals.indexOf(char)!=-1)
      return true;
    return false;
  }


  public stringBuilder(expChar) {
    this.solvePressed = false;
    if(this.expression.length == 0 && (expChar == '%' || expChar == 0))
      return;
    if(expChar == '%') {
      this.expression = this.expression.slice(0,this.lastOperatorIndex+1) + 
      parseFloat(this.expression.slice(this.lastOperatorIndex+1, this.expression.length))/100;
      return;
    }
    if(this.isOperator(expChar)) {
      if(this.expression.length==0) {
        this.expression = "0" + expChar;
      }
      else {
        var lastChar = this.expression[this.expression.length-1];
        if(this.isOperator(lastChar)) {
          this.expression = this.expression.slice(0,this.expression.length-1) + expChar;
        }
        else {
          this.expression += expChar;
        }
      }
      this.lastOperatorIndex = this.expression.length-1;
    }
    else {
      this.expression += expChar;
    }
  }


  public deleteOperation() {
    if(this.expression.length==0)
      return;
    this.expression = this.expression.slice(0,this.expression.length-1);
  }

  
  public solve() {
    this.solvePressed = true;
    var value;
    try {
      value = eval(this.expression);
    } catch {
      value = eval(this.expression.slice(0,this.expression.length-1));
    }
    localStorage.setItem(localStorage.length.toString(10),this.expression+' = '+value);
    this.copyLocalStorage();
    this.autoScroll();
  }


  public clearEverything() {
    localStorage.clear();
    this.totalHistory = 0;
    this.copyLocalStorage();
  }

  public copyLocalStorage() {
    this.localStorageReplica = [];
    for(var i=0;i<localStorage.length;i++) {
      this.localStorageReplica.push(localStorage[i.toString(10)]);
    }
    this.autoScroll();
  }

  public autoScroll() {
    var elem = document.getElementById('element');
    elem.scrollTo(0, elem.scrollHeight);
  }

  
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    var key = event.key;
    if(this.isLiteral(key) || this.isOperator(key))
      this.stringBuilder(key);
    else if(key == 'Enter')
      this.solve();
    else if(key == 'Delete')
      this.deleteOperation();
  }

  public ngOnInit() {
    this.copyLocalStorage();
    this.autoScroll();
  }  
}