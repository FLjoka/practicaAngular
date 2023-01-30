import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-you-page',
  template: `
    <div class="container">
      <h1 class="title">Gracias por tu compra!</h1>

      <p class="content">Tu pedido esta siendo procesado</p>

      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo qui porro
        consequuntur perferendis labore. In, amet aspernatur! Exercitationem
        maiores praesentium, porro necessitatibus, consequatur accusamus nostrum
        voluptatibus animi nobis deserunt magnam?
      </p>
    </div>
  `,
  styleUrls: ['./thank-you-page.component.css'],
})
export class ThankYouPageComponent {}
