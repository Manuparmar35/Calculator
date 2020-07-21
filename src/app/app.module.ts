import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorExpressionPipe } from '../pipes/calculator-expression.pipe';
import { EvaluationPipe } from '../pipes/evaluation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorExpressionPipe,
    EvaluationPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
